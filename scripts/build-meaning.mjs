/**
 * Builds public/scripture/meaning/<book>.json from Matthew Henry's
 * Concise Commentary on the Whole Bible.
 *
 * The source text is public domain. CCEL states "Rights: Public Domain"
 * on https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt
 * CrossWire distributes the same text as the MHCC module,
 * DistributionLicense=Public Domain.
 *
 * Book introductions, chapter outlines, and the index are left out.
 * CCEL markers written as #(12) are restored to the verse number.
 * Notes stay in English. A note written for a verse range is stored once
 * and shown for each verse inside that range.
 *
 * Usage: node scripts/build-meaning.mjs [path-to-mhcc.txt]
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { get } from 'node:https'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SOURCE_URL = 'https://ccel.org/ccel/h/henry/mhcc/cache/mhcc.txt'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/scripture/meaning')

const BOOKS = [
  ['Genesis', 'gen'],
  ['Exodus', 'exo'],
  ['Leviticus', 'lev'],
  ['Numbers', 'num'],
  ['Deuteronomy', 'deu'],
  ['Joshua', 'jos'],
  ['Judges', 'jdg'],
  ['Ruth', 'rut'],
  ['1 Samuel', '1sa'],
  ['2 Samuel', '2sa'],
  ['1 Kings', '1ki'],
  ['2 Kings', '2ki'],
  ['1 Chronicles', '1ch'],
  ['2 Chronicles', '2ch'],
  ['Ezra', 'ezr'],
  ['Nehemiah', 'neh'],
  ['Esther', 'est'],
  ['Job', 'job'],
  ['Psalms', 'psa'],
  ['Proverbs', 'pro'],
  ['Ecclesiastes', 'ecc'],
  ['Song of Solomon', 'sng'],
  ['Isaiah', 'isa'],
  ['Jeremiah', 'jer'],
  ['Lamentations', 'lam'],
  ['Ezekiel', 'ezk'],
  ['Daniel', 'dan'],
  ['Hosea', 'hos'],
  ['Joel', 'jol'],
  ['Amos', 'amo'],
  ['Obadiah', 'oba'],
  ['Jonah', 'jon'],
  ['Micah', 'mic'],
  ['Nahum', 'nah'],
  ['Habakkuk', 'hab'],
  ['Zephaniah', 'zep'],
  ['Haggai', 'hag'],
  ['Zechariah', 'zec'],
  ['Malachi', 'mal'],
  ['Matthew', 'mat'],
  ['Mark', 'mrk'],
  ['Luke', 'luk'],
  ['John', 'jhn'],
  ['Acts', 'act'],
  ['Romans', 'rom'],
  ['1 Corinthians', '1co'],
  ['2 Corinthians', '2co'],
  ['Galatians', 'gal'],
  ['Ephesians', 'eph'],
  ['Philippians', 'php'],
  ['Colossians', 'col'],
  ['1 Thessalonians', '1th'],
  ['2 Thessalonians', '2th'],
  ['1 Timothy', '1ti'],
  ['2 Timothy', '2ti'],
  ['Titus', 'tit'],
  ['Philemon', 'phm'],
  ['Hebrews', 'heb'],
  ['James', 'jas'],
  ['1 Peter', '1pe'],
  ['2 Peter', '2pe'],
  ['1 John', '1jn'],
  ['2 John', '2jn'],
  ['3 John', '3jn'],
  ['Jude', 'jud'],
  ['Revelation', 'rev'],
]

function download(url) {
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        download(response.headers.location).then(resolve, reject)
        return
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`))
        response.resume()
        return
      }
      const chunks = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    }).on('error', reject)
  })
}

function unwrap(raw) {
  const text = raw.replace(/#\(([^)]*)\)/g, '$1')
  const paragraphs = []
  let buffer = []
  const flush = () => {
    if (buffer.length === 0) return
    const paragraph = buffer.join(' ').replace(/[ \t]{2,}/g, ' ').trim().replace(/^--+[ \t]*/, '')
    if (paragraph) paragraphs.push(paragraph)
    buffer = []
  }
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || /^_+$/.test(trimmed)) {
      flush()
      continue
    }
    buffer.push(trimmed)
  }
  flush()
  return paragraphs.join('\n\n')
}

function parseSpec(spec) {
  const parts = spec.split(',').map((part) => part.trim()).filter(Boolean)
  let start = Infinity
  let end = -Infinity
  const spans = []
  for (const part of parts) {
    const bits = part.split(/[–—-]/).map((bit) => Number(bit.trim()))
    if (bits.some((bit) => !Number.isInteger(bit) || bit < 1) || bits.length > 2) {
      throw new Error(`Bad verse heading: ${spec}`)
    }
    const from = bits[0]
    const to = bits.length === 1 ? bits[0] : bits[1]
    if (to < from) throw new Error(`Bad verse heading: ${spec}`)
    spans.push([from, to])
    start = Math.min(start, from)
    end = Math.max(end, to)
  }
  if (!Number.isFinite(start)) throw new Error(`Bad verse heading: ${spec}`)
  let cursor = start
  for (const [from, to] of spans) {
    if (from !== cursor) throw new Error(`Verse heading has a gap: ${spec}`)
    cursor = to + 1
  }
  if (cursor !== end + 1) throw new Error(`Verse heading has a gap: ${spec}`)
  return [start, end]
}

// Some books head each note with "Verses 1-3". Others, mostly the prophets,
// head it with the book abbreviation on its own line: "Is. 53:1-3 ...".
const ABBREV = {
  ecc: 'Eccl.',
  sng: 'Song',
  isa: 'Is.',
  jer: 'Jer.',
  lam: 'Lam.',
  ezk: 'Ezek.',
  dan: 'Dan.',
  hos: 'Hos.',
  jol: 'Joel',
}

function blankBefore(slice, index) {
  const lineStart = slice.lastIndexOf('\n', index - 1)
  if (lineStart <= 0) return true
  const prevLineStart = slice.lastIndexOf('\n', lineStart - 1) + 1
  return slice.slice(prevLineStart, lineStart).trim() === ''
}

function findHeadings(slice, abbrev, chapterNumber) {
  const headings = []
  const verseHeader = /^[ \t]*Verses? ([0-9][0-9, \t\-–—]*)[ \t]*$/gm
  for (const match of slice.matchAll(verseHeader)) {
    if (!blankBefore(slice, match.index)) continue
    headings.push({ spec: match[1].trim(), index: match.index, length: match[0].length, inline: '' })
  }
  if (abbrev) {
    const escaped = abbrev.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const abbrevHeader = new RegExp(
      `^[ \\t]*${escaped}[ \\t]+${chapterNumber}:([0-9][0-9, \\t\\-–—]*)(.*)$`,
      'gm',
    )
    for (const match of slice.matchAll(abbrevHeader)) {
      if (!blankBefore(slice, match.index)) continue
      headings.push({
        spec: match[1].trim(),
        index: match.index,
        length: match[0].length,
        inline: match[2].trim(),
      })
    }
  }
  headings.sort((a, b) => a.index - b.index)
  return headings
}

function parseChapter(slice, abbrev, chapterNumber, verseCount) {
  const headings = findHeadings(slice, abbrev, chapterNumber)
  if (headings.length === 0) {
    if (!verseCount) return []
    const text = unwrap(slice)
    return text ? [[1, verseCount, text]] : []
  }
  const notes = []
  for (let index = 0; index < headings.length; index += 1) {
    const bodyStart = headings[index].index + headings[index].length
    const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : slice.length
    const rest = slice.slice(bodyStart, bodyEnd).replace(/^\n/, '')
    const raw = headings[index].inline ? `${headings[index].inline} ${rest}` : rest
    const text = unwrap(raw)
    if (!text) throw new Error(`Empty note for chapter ${chapterNumber} ${headings[index].spec}`)
    const [start, end] = parseSpec(headings[index].spec)
    notes.push([start, end, text])
  }
  return notes
}

function parseBook(bookText, abbrev, counts) {
  const chapter = /^[ \t]*Chapter (\d+)[ \t]*$/gm
  const chapters = []
  for (const match of bookText.matchAll(chapter)) {
    chapters.push({ number: Number(match[1]), index: match.index, length: match[0].length })
  }
  // 2 Kings and 2 Chronicles comment on chapter 1 without a "Chapter 1" line.
  if (chapters.length === 0 || chapters[0].number !== 1) {
    const titleEnd = bookText.indexOf('\n')
    chapters.unshift({ number: 1, index: titleEnd + 1, length: 0 })
  }
  const notes = {}
  for (let index = 0; index < chapters.length; index += 1) {
    const start = chapters[index].index + chapters[index].length
    const end = index + 1 < chapters.length ? chapters[index + 1].index : bookText.length
    const number = chapters[index].number
    const rows = parseChapter(bookText.slice(start, end), abbrev, number, counts[number - 1] ?? 0)
    if (rows.length > 0) notes[String(number)] = rows
  }
  return notes
}

function locateBooks(body) {
  let cursor = 0
  const found = []
  for (const [title, id] of BOOKS) {
    const pattern = new RegExp(`^[ \\t]*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[ \\t]*$`, 'm')
    pattern.lastIndex = cursor
    const match = pattern.exec(body.slice(cursor))
    if (!match) throw new Error(`Missing book heading: ${title}`)
    const start = cursor + match.index
    found.push({ title, id, start })
    cursor = start + match[0].length
  }
  return found
}

function kjvCounts(id) {
  const chapters = JSON.parse(readFileSync(join(root, 'public/scripture/en', `${id}.json`), 'utf8'))
  return chapters.map((verses) => verses.length)
}

const sourcePath = process.argv[2]
const raw = sourcePath ? readFileSync(sourcePath, 'utf8') : await download(SOURCE_URL)
if (!raw.includes('Rights: Public Domain') && !raw.includes('Matthew Henry')) {
  throw new Error('Source does not look like Matthew Henry’s Concise Commentary')
}
const indexAt = raw.search(/\n[ \t]*Indexes[ \t]*\n/)
if (indexAt < 0) throw new Error('Could not find the index, so the commentary bounds are unclear')
const body = raw.slice(0, indexAt)
const located = locateBooks(body)

mkdirSync(outDir, { recursive: true })

let noteCount = 0
let covered = 0
let total = 0
const gaps = []
const warnings = []

for (let index = 0; index < located.length; index += 1) {
  const book = located[index]
  const end = index + 1 < located.length ? located[index + 1].start : body.length
  const counts = kjvCounts(book.id)
  const notes = parseBook(body.slice(book.start, end), ABBREV[book.id], counts)
  const kept = {}
  for (const [chapterKey, rows] of Object.entries(notes)) {
    const chapter = Number(chapterKey)
    const verseCount = counts[chapter - 1]
    if (!verseCount) {
      warnings.push(`${book.id} ${chapter} is not in the King James chapter list`)
      continue
    }
    const fitted = []
    for (const [start, endVerse, text] of rows) {
      if (start > verseCount) {
        warnings.push(`${book.id} ${chapter}:${start} starts past verse ${verseCount}`)
        continue
      }
      const fittedEnd = Math.min(endVerse, verseCount)
      if (fittedEnd !== endVerse) {
        warnings.push(`${book.id} ${chapter}:${start}-${endVerse} clamped to ${fittedEnd}`)
      }
      fitted.push([start, fittedEnd, text])
      noteCount += 1
    }
    if (fitted.length > 0) kept[chapterKey] = fitted
  }
  for (let chapter = 1; chapter <= counts.length; chapter += 1) {
    const rows = kept[String(chapter)] ?? []
    for (let verse = 1; verse <= counts[chapter - 1]; verse += 1) {
      total += 1
      const hit = rows.some(([start, endVerse]) => verse >= start && verse <= endVerse)
      if (hit) covered += 1
      else if (gaps.length < 12) gaps.push(`${book.id} ${chapter}:${verse}`)
    }
  }
  writeFileSync(join(outDir, `${book.id}.json`), `${JSON.stringify(kept)}\n`)
}

const genesis = JSON.parse(readFileSync(join(outDir, 'gen.json'), 'utf8'))
const first = genesis['1']?.[0]
if (!first || first[0] !== 1 || first[1] !== 2 || !first[2].startsWith('The first verse of the Bible')) {
  throw new Error('Genesis 1:1-2 did not parse to the expected public-domain note')
}

console.log(`notes ${noteCount}`)
console.log(`covered ${covered}/${total}`)
console.log(`gaps sample ${gaps.join(', ') || 'none'}`)
if (warnings.length > 0) {
  console.log(`warnings ${warnings.length}`)
  for (const warning of warnings.slice(0, 20)) console.log(`  ${warning}`)
}
if (covered < total * 0.9) throw new Error('Coverage dropped below 90%')
