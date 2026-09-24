/**
 * Builds the In context fallback: Matthew Henry's Complete Commentary
 * on the Whole Bible, public domain, for verses the Concise commentary
 * does not cover.
 *
 * Source text, CCEL, "Rights: Public domain. May be copied and distributed
 * freely."
 * https://ccel.org/ccel/henry/mhc1
 * https://ccel.org/ccel/henry/mhc3
 * https://ccel.org/ccel/henry/mhc5
 *
 * A section is the passage Henry printed and then explained. The note kept
 * here is his explanation, not the Bible verses printed above it. When he
 * marks a paragraph with a verse (v. 16, ver. 19-20), that paragraph is
 * the note for those verses. The words are not rewritten.
 *
 * Only a verse the Concise commentary leaves empty is written out, and
 * only the book that has such a verse. The phone loads that book when the
 * concise note is missing.
 *
 * Usage: node scripts/build-context.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { get } from 'node:https'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/scripture/context')
const cacheDir = join(root, 'scripts/.cache')

const VOLUMES = [
  ['mhc1', 'https://ccel.org/ccel/h/henry/mhc1/cache/mhc1.txt', ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy']],
  ['mhc3', 'https://ccel.org/ccel/h/henry/mhc3/cache/mhc3.txt', ['Job', 'Psalms', 'Proverbs', 'Ecclesiastes']],
  ['mhc5', 'https://ccel.org/ccel/h/henry/mhc5/cache/mhc5.txt', ['Matthew', 'Mark', 'Luke', 'John']],
]

const BOOK_ID = {
  Genesis: 'gen',
  Exodus: 'exo',
  Leviticus: 'lev',
  Numbers: 'num',
  Deuteronomy: 'deu',
  Job: 'job',
  Psalms: 'psa',
  Proverbs: 'pro',
  Ecclesiastes: 'ecc',
  Matthew: 'mat',
  Mark: 'mrk',
  Luke: 'luk',
  John: 'jhn',
}

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

async function volumeText(id, url) {
  const cached = join(cacheDir, `${id}.txt`)
  if (existsSync(cached)) return readFileSync(cached, 'utf8')
  const text = await download(url)
  if (!/Public domain/i.test(text.slice(0, 800))) throw new Error(`${id} is not marked public domain`)
  mkdirSync(cacheDir, { recursive: true })
  writeFileSync(cached, text)
  return text
}

function roman(value) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let total = 0
  for (let index = 0; index < value.length; index += 1) {
    const current = map[value[index]]
    const next = map[value[index + 1]] ?? 0
    if (!current) return null
    total += current < next ? -current : current
  }
  return total
}

function conciseGaps(bookId) {
  const chapters = JSON.parse(readFileSync(join(root, 'public/scripture/en', `${bookId}.json`), 'utf8'))
  const meaning = JSON.parse(readFileSync(join(root, 'public/scripture/meaning', `${bookId}.json`), 'utf8'))
  const gaps = new Set()
  chapters.forEach((verses, chapterIndex) => {
    const notes = meaning[String(chapterIndex + 1)] ?? []
    for (let verse = 1; verse <= verses.length; verse += 1) {
      const covered = notes.some(([start, end, text]) => text && verse >= start && verse <= end)
      if (!covered) gaps.add(`${chapterIndex + 1}:${verse}`)
    }
  })
  return gaps
}

function sliceBooks(text, names) {
  const lines = text.split('\n')
  const marks = []
  for (let index = 0; index < lines.length; index += 1) {
    if (!names.includes(lines[index])) continue
    if (!(lines[index + 1] ?? '').includes('___')) continue
    marks.push({ name: lines[index], index })
  }
  return marks.map((mark, index) => {
    const end = index + 1 < marks.length ? marks[index + 1].index : lines.length
    return { name: mark.name, lines: lines.slice(mark.index, end) }
  })
}

function bookEnd(lines) {
  const stop = lines.findIndex((line, index) => index > 20 && /^\s*Indexes\s*$/.test(line))
  return stop === -1 ? lines : lines.slice(0, stop)
}

function verseNumbers(block) {
  const found = []
  for (const match of block.matchAll(/(?:^|\s)(\d{1,3})(?=\s+[A-Z"'“‘])/g)) {
    const verse = Number(match[1])
    if (verse >= 1 && verse <= 176) found.push(verse)
  }
  return found
}

function labelsIn(lead) {
  const labels = new Set()
  const pattern = /\b(?:verses|verse|ver|v)\.?\s*(\d{1,3}(?:\s*[-–]\s*\d{1,3})?(?:\s*,\s*\d{1,3}(?:\s*[-–]\s*\d{1,3})?)*)/gi
  for (const match of lead.matchAll(pattern)) {
    for (const part of match[1].split(',')) {
      const bits = part
        .trim()
        .split(/[-–]/)
        .map((bit) => Number(bit.trim()))
        .filter((bit) => Number.isInteger(bit) && bit >= 1 && bit <= 176)
      if (bits.length === 1) labels.add(bits[0])
      if (bits.length === 2 && bits[1] >= bits[0] && bits[1] - bits[0] <= 40) {
        for (let verse = bits[0]; verse <= bits[1]; verse += 1) labels.add(verse)
      }
    }
  }
  return labels
}

function plainParagraph(value) {
  return value
    .replace(/\[\d+\]/g, '')
    .replace(/_+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isScriptureStart(line) {
  return /^\s+\d{1,3}\s+[A-Z"'“‘]/.test(line)
}

function sectionsInChapter(lines) {
  const sections = []
  let index = 0
  while (index < lines.length) {
    const line = lines[index]
    const precededByBlank = index === 0 || lines[index - 1].trim() === ''
    if (!isScriptureStart(line) || !precededByBlank) {
      index += 1
      continue
    }
    const scripture = []
    while (index < lines.length && lines[index].trim() !== '') {
      scripture.push(lines[index])
      index += 1
    }
    const numbers = verseNumbers(scripture.join('\n'))
    if (numbers.length === 0) continue
    const commentary = []
    while (index < lines.length) {
      const next = lines[index]
      const blankBefore = index === 0 || lines[index - 1].trim() === ''
      if (isScriptureStart(next) && blankBefore && commentary.some((item) => item.trim())) break
      if (/^\s*CHAP\. [IVXLCDM]+\.\s*$/.test(next)) break
      if (next.trim() && !next.startsWith(' ') && !next.includes('___')) break
      commentary.push(next)
      index += 1
    }
    const paragraphs = commentary
      .join('\n')
      .split(/\n\s*\n/)
      .map(plainParagraph)
      .filter((paragraph) => paragraph.length > 40)
    if (paragraphs.length === 0) continue
    sections.push({
      start: Math.min(...numbers),
      end: Math.max(...numbers),
      paragraphs,
    })
  }
  return sections
}

function noteForVerse(sections, verse) {
  const section = sections.find((item) => verse >= item.start && verse <= item.end)
  if (!section) return null
  const groups = []
  let current = null
  for (const paragraph of section.paragraphs) {
    const labels = labelsIn(paragraph.slice(0, 360))
    if (labels.size > 0) {
      current = { labels, paragraphs: [paragraph] }
      groups.push(current)
    } else if (current) current.paragraphs.push(paragraph)
    else {
      current = { labels: null, paragraphs: [paragraph] }
      groups.push(current)
    }
  }
  const fitting = groups.filter((group) => group.labels?.has(verse))
  fitting.sort((a, b) => a.labels.size - b.labels.size || a.paragraphs.length - b.paragraphs.length)
  const chosen = fitting[0]
  if (!chosen) {
    return {
      start: section.start,
      end: section.end,
      text: section.paragraphs.join('\n\n'),
    }
  }
  const listed = [...chosen.labels].sort((a, b) => a - b)
  const contiguous = listed.every((item, index) => index === 0 || item === listed[index - 1] + 1)
  return {
    start: contiguous ? listed[0] : verse,
    end: contiguous ? listed[listed.length - 1] : verse,
    text: chosen.paragraphs.join('\n\n'),
  }
}

function chaptersOf(lines) {
  const body = bookEnd(lines)
  const marks = []
  body.forEach((line, index) => {
    const match = /^\s*CHAP\. ([IVXLCDM]+)\.\s*$/.exec(line)
    if (!match) return
    const number = roman(match[1])
    if (number) marks.push({ number, index })
  })
  const chapters = new Map()
  marks.forEach((mark, index) => {
    const end = index + 1 < marks.length ? marks[index + 1].index : body.length
    chapters.set(mark.number, sectionsInChapter(body.slice(mark.index, end)))
  })
  return chapters
}

const gapsByBook = new Map()
for (const id of Object.values(BOOK_ID)) {
  const gaps = conciseGaps(id)
  if (gaps.size > 0) gapsByBook.set(id, gaps)
}

mkdirSync(outDir, { recursive: true })
const written = new Map()

for (const [id, url, names] of VOLUMES) {
  const needed = names.some((name) => gapsByBook.has(BOOK_ID[name]))
  if (!needed) continue
  const text = await volumeText(id, url)
  for (const book of sliceBooks(text, names)) {
    const bookId = BOOK_ID[book.name]
    const gaps = gapsByBook.get(bookId)
    if (!gaps || gaps.size === 0) continue
    const chapters = chaptersOf(book.lines)
    const notes = {}
    for (const key of gaps) {
      const [chapter, verse] = key.split(':').map(Number)
      const note = noteForVerse(chapters.get(chapter) ?? [], verse)
      if (!note?.text) throw new Error(`No complete-commentary note for ${bookId} ${key}`)
      if (note.text.length < 180) throw new Error(`Note for ${bookId} ${key} is too short to be Henry’s comment`)
      notes[chapter] ??= []
      notes[chapter].push([note.start, note.end, note.text])
    }
    for (const chapter of Object.keys(notes)) {
      const rows = notes[chapter]
      rows.sort((a, b) => a[0] - b[0] || a[1] - b[1])
      const unique = []
      for (const row of rows) {
        const previous = unique[unique.length - 1]
        if (previous && previous[0] === row[0] && previous[1] === row[1] && previous[2] === row[2]) continue
        unique.push(row)
      }
      notes[chapter] = unique
    }
    writeFileSync(join(outDir, `${bookId}.json`), JSON.stringify(notes))
    written.set(bookId, gaps.size)
    console.log('context', bookId, 'gap verses', gaps.size)
  }
}

for (const [bookId, gaps] of gapsByBook) {
  if (!written.has(bookId)) throw new Error(`No volume covered the gaps in ${bookId}`)
  if (written.get(bookId) !== gaps.size) {
    throw new Error(`${bookId} wrote ${written.get(bookId)} of ${gaps.size} gaps`)
  }
}

const john = JSON.parse(readFileSync(join(outDir, 'jhn.json'), 'utf8'))
const johnNote = john['3']?.find(([start, end]) => start <= 16 && end >= 16)
if (!johnNote || !/so loved the world/i.test(johnNote[2])) {
  throw new Error('John 3:16 did not keep Henry’s comment on the verse')
}
console.log('context ready', [...written.keys()].join(', '))
