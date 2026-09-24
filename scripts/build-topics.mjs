/**
 * Builds public/scripture/topics.json from the Open Bible topical vote file.
 *
 * Source: https://a.openbible.info/data/topic-votes.txt
 * License: Creative Commons Attribution 4.0 International.
 * The file header says: CC-BY License: www.openbible.info/topics
 * About: https://www.openbible.info/topics/
 *
 * Adaptations (this file is adapted material, still CC BY 4.0):
 * - Verse text is not copied. Only the topic name and verse references are kept.
 *   The app shows those verses from the translation the reader already selected.
 * - For each topic, at most twelve references are kept, highest vote first,
 *   and only when that reference has at least ten votes.
 * - A second citation of the same starting verse is left out.
 * - A range that stays in one chapter and runs five verses or fewer past the
 *   first keeps its ending verse. A longer range, or one that crosses a
 *   chapter, keeps the starting verse.
 * - A reference is left out when that verse is not in the bundled King James
 *   text (traditional Protestant numbering).
 * - Vote counts are not stored.
 *
 * Usage: node scripts/build-topics.mjs
 * Reads /tmp/topic-votes.txt when present, otherwise downloads it.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const votesPath = process.env.TOPIC_VOTES || join(tmpdir(), 'topic-votes.txt')
const votesUrl = 'https://a.openbible.info/data/topic-votes.txt'
const outPath = join(root, 'public/scripture/topics.json')
const licensePath = join(root, 'public/scripture/topics-license.txt')

const MAX_REFS = 12
const MIN_VOTES = 10
const MAX_EXTRA_VERSES = 5

function bookTable() {
  const source = readFileSync(join(root, 'src/scripture/books.ts'), 'utf8')
  const ids = [...source.matchAll(/id: '([^']+)'/g)].map((match) => match[1])
  const chapters = [...source.matchAll(/chapters: (\d+)/g)].map((match) => Number(match[1]))
  if (ids.length !== 66 || chapters.length !== 66) {
    throw new Error(`expected 66 books, found ${ids.length} ids and ${chapters.length} chapter counts`)
  }
  return { ids, chapters }
}

function loadKjv(ids) {
  return ids.map((id) => JSON.parse(readFileSync(join(root, 'public/scripture/en', `${id}.json`), 'utf8')))
}

function verseExists(kjv, bookIndex, chapter, verse) {
  const text = kjv[bookIndex]?.[chapter - 1]?.[verse - 1]
  return typeof text === 'string' && text.length > 0
}

function parseVerseId(value) {
  if (!/^\d{8}$/.test(value)) return null
  const id = Number(value)
  const book = Math.floor(id / 1_000_000)
  const chapter = Math.floor(id / 1000) % 1000
  const verse = id % 1000
  if (book < 1 || book > 66 || chapter < 1 || verse < 1) return null
  return { bookIndex: book - 1, chapter, verse }
}

function downloadVotes() {
  execFileSync('curl', ['-fsSL', '-o', votesPath, votesUrl], { stdio: 'inherit' })
}

function readVotes() {
  try {
    return readFileSync(votesPath, 'utf8')
  } catch {
    downloadVotes()
    return readFileSync(votesPath, 'utf8')
  }
}

const { ids, chapters } = bookTable()
const kjv = loadKjv(ids)
const text = readVotes()
const lines = text.split(/\n/)
const header = lines[0] ?? ''
if (!/CC-BY/i.test(header) || !/openbible\.info\/topics/i.test(header)) {
  throw new Error('topic vote file is missing the CC-BY Open Bible header')
}

/** @type {Map<string, { votes: number, start: { bookIndex: number, chapter: number, verse: number }, end: { bookIndex: number, chapter: number, verse: number } | null }[]>} */
const buckets = new Map()
let skipped = 0

for (let index = 1; index < lines.length; index += 1) {
  const line = lines[index]
  if (!line) continue
  const parts = line.split('\t')
  if (parts.length < 4) {
    skipped += 1
    continue
  }
  const [name, startId, endId, votesRaw] = parts
  const votes = Number(votesRaw)
  const start = parseVerseId(startId)
  if (!name || !start || !Number.isFinite(votes)) {
    skipped += 1
    continue
  }
  const end = endId ? parseVerseId(endId) : null
  const rows = buckets.get(name) ?? []
  rows.push({ votes, start, end })
  buckets.set(name, rows)
}

/** @type {[string, number[][]][]} */
const topics = []
let keptRefs = 0
let droppedMissing = 0

for (const [name, rows] of buckets) {
  rows.sort((a, b) => b.votes - a.votes || a.start.bookIndex - b.start.bookIndex || a.start.chapter - b.start.chapter || a.start.verse - b.start.verse)
  const seen = new Set()
  /** @type {number[][]} */
  const refs = []
  for (const row of rows) {
    if (row.votes < MIN_VOTES) break
    const { bookIndex, chapter, verse } = row.start
    if (chapter > chapters[bookIndex]) {
      droppedMissing += 1
      continue
    }
    if (!verseExists(kjv, bookIndex, chapter, verse)) {
      droppedMissing += 1
      continue
    }
    const key = `${bookIndex}:${chapter}:${verse}`
    if (seen.has(key)) continue
    seen.add(key)
    let endVerse = 0
    const end = row.end
    if (
      end &&
      end.bookIndex === bookIndex &&
      end.chapter === chapter &&
      end.verse > verse &&
      end.verse - verse <= MAX_EXTRA_VERSES &&
      verseExists(kjv, bookIndex, chapter, end.verse)
    ) {
      endVerse = end.verse
    }
    refs.push(endVerse > verse ? [bookIndex, chapter, verse, endVerse] : [bookIndex, chapter, verse])
    if (refs.length >= MAX_REFS) break
  }
  if (refs.length === 0) continue
  const topVotes = rows.find((row) => row.votes >= MIN_VOTES)?.votes ?? 0
  topics.push([name, refs, topVotes])
  keptRefs += refs.length
}

topics.sort((a, b) => b[2] - a[2] || a[0].localeCompare(b[0]))
const payload = topics.map(([name, refs]) => [name, refs])
writeFileSync(outPath, JSON.stringify(payload))

const fear = payload.find((row) => row[0] === 'fear')
const fearRefs = fear?.[1] ?? []
const hasJoshua = fearRefs.some((ref) => ref[0] === 5 && ref[1] === 1 && ref[2] === 9)
if (!hasJoshua) throw new Error('fear topic is missing Joshua 1:9')

writeFileSync(
  licensePath,
  [
    'Open Bible topical index',
    'https://www.openbible.info/topics/',
    '',
    'Topic names and the votes that ranked their verses are from Open Bible.',
    'Creative Commons Attribution 4.0 International.',
    'https://creativecommons.org/licenses/by/4.0/',
    '',
    'Source file: https://a.openbible.info/data/topic-votes.txt',
    'The file header states: CC-BY License: www.openbible.info/topics',
    'Verse ID = bbcccvvv (01 = Genesis, 66 = Revelation).',
    '',
    'public/scripture/topics.json is adapted material, still CC BY 4.0.',
    'This copy keeps topic names and verse references only.',
    'It does not include the Bible text. Verses shown in the app are the translation the reader selected.',
    'For each topic, the twelve references with the most votes are kept, when a reference has at least ten votes.',
    'A second citation of the same starting verse is left out.',
    'A short range in one chapter (five verses or fewer after the first) keeps its ending verse.',
    'A longer range, or a range that crosses a chapter, keeps the starting verse.',
    'A reference is left out when that verse is not in the bundled King James text.',
    'Vote counts are not stored.',
    'See scripts/build-topics.mjs.',
    '',
  ].join('\n'),
)

const bytes = Buffer.byteLength(JSON.stringify(payload))
console.log(
  `topics ${payload.length}, refs ${keptRefs}, skipped lines ${skipped}, missing verses ${droppedMissing}, bytes ${bytes}`,
)
