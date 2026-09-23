/**
 * Builds the Today fallback: Charles H. Spurgeon, Morning and Evening.
 *
 * The source text is public domain. CCEL states "Rights: Public Domain"
 * on https://ccel.org/ccel/s/spurgeon/morneve/cache/morneve.txt
 *
 * A reading is stored only on the verse named under that day's text.
 * The date, the "go to" line, and the repeated quotation are left out.
 * The comment is not rewritten. A verse this book does not name has no
 * fallback note. Faith's Checkbook, when it has a note, is still the one
 * shown. This file is only the other reading.
 *
 * Usage: node scripts/build-morning.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/scripture/study/morning')
const SOURCE = 'https://ccel.org/ccel/s/spurgeon/morneve/cache/morneve.txt'

const BOOK_ALIASES = [
  ['song of solomon', 'sng'],
  ['song of songs', 'sng'],
  ['1 chronicles', '1ch'],
  ['2 chronicles', '2ch'],
  ['1 corinthians', '1co'],
  ['2 corinthians', '2co'],
  ['1 thessalonians', '1th'],
  ['2 thessalonians', '2th'],
  ['1 timothy', '1ti'],
  ['2 timothy', '2ti'],
  ['1 samuel', '1sa'],
  ['2 samuel', '2sa'],
  ['1 kings', '1ki'],
  ['2 kings', '2ki'],
  ['1 peter', '1pe'],
  ['2 peter', '2pe'],
  ['1 john', '1jn'],
  ['2 john', '2jn'],
  ['3 john', '3jn'],
  ['revelation', 'rev'],
  ['deuteronomy', 'deu'],
  ['lamentations', 'lam'],
  ['ecclesiastes', 'ecc'],
  ['philippians', 'php'],
  ['colossians', 'col'],
  ['zechariah', 'zec'],
  ['zephaniah', 'zep'],
  ['nehemiah', 'neh'],
  ['proverbs', 'pro'],
  ['habakkuk', 'hab'],
  ['ezekiel', 'ezk'],
  ['genesis', 'gen'],
  ['exodus', 'exo'],
  ['leviticus', 'lev'],
  ['numbers', 'num'],
  ['joshua', 'jos'],
  ['judges', 'jdg'],
  ['matthew', 'mat'],
  ['malachi', 'mal'],
  ['hosea', 'hos'],
  ['isaiah', 'isa'],
  ['jeremiah', 'jer'],
  ['daniel', 'dan'],
  ['obadiah', 'oba'],
  ['micah', 'mic'],
  ['nahum', 'nah'],
  ['haggai', 'hag'],
  ['amos', 'amo'],
  ['joel', 'jol'],
  ['jonah', 'jon'],
  ['ruth', 'rut'],
  ['ezra', 'ezr'],
  ['esther', 'est'],
  ['psalms', 'psa'],
  ['psalm', 'psa'],
  ['job', 'job'],
  ['mark', 'mrk'],
  ['luke', 'luk'],
  ['john', 'jhn'],
  ['acts', 'act'],
  ['romans', 'rom'],
  ['galatians', 'gal'],
  ['ephesians', 'eph'],
  ['titus', 'tit'],
  ['philemon', 'phm'],
  ['hebrews', 'heb'],
  ['james', 'jas'],
  ['jude', 'jud'],
]

const SINGLE_CHAPTER = new Set(['oba', 'phm', '2jn', '3jn', 'jud'])

function bookIdFor(name) {
  const key = name.toLowerCase().replace(/\s+/g, ' ').trim()
  return BOOK_ALIASES.find(([label]) => label === key)?.[1] ?? null
}

function versesIn(spec) {
  const verses = []
  for (const part of spec.split(',')) {
    const bits = part
      .trim()
      .split(/[-–]/)
      .map((bit) => Number(bit.trim()))
      .filter((bit) => Number.isInteger(bit) && bit >= 1 && bit <= 176)
    if (bits.length === 1) verses.push(bits[0])
    else if (bits.length === 2 && bits[1] >= bits[0] && bits[1] - bits[0] <= 15) {
      for (let verse = bits[0]; verse <= bits[1]; verse += 1) verses.push(verse)
    }
  }
  return verses
}

function parseCitation(line) {
  const cleaned = line.trim().replace(/\s+/g, ' ')
  const ranged = /^(.+?)\s+(\d+):(\d+(?:\s*[-–]\s*\d+)?(?:\s*,\s*\d+(?:\s*[-–]\s*\d+)?)*)$/.exec(cleaned)
  if (ranged) {
    const bookId = bookIdFor(ranged[1])
    const verses = versesIn(ranged[3])
    if (!bookId || verses.length === 0) return null
    return { bookId, chapter: Number(ranged[2]), verses }
  }
  const single = /^(.+?)\s+(\d+)$/.exec(cleaned)
  if (!single) return null
  const bookId = bookIdFor(single[1])
  const verse = Number(single[2])
  if (!bookId || !SINGLE_CHAPTER.has(bookId) || verse < 1) return null
  return { bookId, chapter: 1, verses: [verse] }
}

function readingBody(chunk) {
  const lines = chunk.split('\n')
  let refAt = -1
  let passage = null
  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index].trim()
    if (!trimmed || trimmed.startsWith('[') || trimmed.startsWith('"') || /^_+$/.test(trimmed)) continue
    const parsed = parseCitation(trimmed)
    if (!parsed) continue
    passage = parsed
    refAt = index
    break
  }
  if (!passage) return null
  const text = lines
    .slice(refAt + 1)
    .join('\n')
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .replace(/\[\d+\]/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter((paragraph) => paragraph.length > 40 && !/^_+$/.test(paragraph))
    .join('\n\n')
  if (!text) return null
  return { passage, text }
}

const response = await fetch(SOURCE)
if (!response.ok) throw new Error(`${response.status} ${SOURCE}`)
const raw = await response.text()
if (!raw.includes('Rights: Public Domain')) throw new Error('Morning and Evening is not marked public domain')

const heads = [...raw.matchAll(/^(Morning|Evening), [A-Za-z]+ \d+\s*$/gm)]
if (heads.length < 730) throw new Error(`Expected a morning and an evening for the year, found ${heads.length}`)

const byBook = new Map()
const missed = []
heads.forEach((head, index) => {
  const start = head.index + head[0].length
  const end = index + 1 < heads.length ? heads[index + 1].index : raw.length
  const reading = readingBody(raw.slice(start, end))
  if (!reading) {
    missed.push(head[0])
    return
  }
  let book = byBook.get(reading.passage.bookId)
  if (!book) {
    book = {}
    byBook.set(reading.passage.bookId, book)
  }
  const chapter = String(reading.passage.chapter)
  book[chapter] ??= {}
  for (const verse of reading.passage.verses) {
    const key = String(verse)
    book[chapter][key] = book[chapter][key] ? `${book[chapter][key]}\n\n${reading.text}` : reading.text
  }
})

if (missed.length > 0) {
  throw new Error(`Unparsed Morning and Evening readings: ${missed.slice(0, 8).join(' | ')}`)
}

mkdirSync(outDir, { recursive: true })
let notes = 0
for (const [bookId, chapters] of byBook) {
  writeFileSync(join(outDir, `${bookId}.json`), JSON.stringify(chapters))
  for (const verses of Object.values(chapters)) notes += Object.keys(verses).length
}

const joshua = byBook.get('jos')?.['5']?.['12'] ?? ''
if (!/promised rest/.test(joshua)) throw new Error('Joshua 5:12 did not keep the January 1 morning reading')
const john = byBook.get('jhn')
if (john?.['1']?.['1']) throw new Error('John 1:1 was given a reading it was not named for')
console.log('morning readings', heads.length, 'verse notes', notes, 'books', byBook.size)
