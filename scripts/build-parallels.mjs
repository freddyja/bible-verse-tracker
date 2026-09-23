/**
 * Builds public/scripture/parallels.json from the UBS Parallel Passage Database.
 *
 * Source: https://github.com/ubsicap/ubs-open-license/tree/main/parallel%20passages
 * License: Creative Commons Attribution-ShareAlike 4.0 International.
 * Copyright: UBS Parallel Passage Database, © 2023 United Bible Societies.
 *
 * Adaptations (this file is Adapted Material, still CC BY-SA 4.0):
 * - Word-match numbers on each reference are omitted.
 * - Hebrew verse numbers are converted to traditional Protestant numbering
 *   (the numbering of the bundled texts). The correspondence is the public
 *   chapter/verse difference list from The Jewish Study Bible, pp. 218–9,
 *   as published at http://bartimaeus.us/pub_dom/hebrew-chapter-verse-differences-list.txt
 *   Psalm superscriptions that are a whole Hebrew verse have no English verse
 *   number; those references are left out rather than attached to verse 1.
 * - A passage is kept when it is a real parallel a reader would follow:
 *   two or more of Matthew, Mark, Luke, and John; or at most eight references
 *   in two or more books; or at most five references in one book (a retelling
 *   or a repeated saying). Longer formula lists — offerings, letter openings,
 *   “the word of the LORD came” — are left out.
 *
 * Usage: node scripts/build-parallels.mjs
 * Reads /tmp/ParallelPassages.xml when present, otherwise downloads it.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const xmlPath = process.env.PARALLELS_XML || join(tmpdir(), 'ParallelPassages.xml')
const xmlUrl =
  'https://raw.githubusercontent.com/ubsicap/ubs-open-license/main/parallel%20passages/ParallelPassages.xml'
const outPath = join(root, 'public/scripture/parallels.json')
const licensePath = join(root, 'public/scripture/parallels-license.txt')

const GOSPELS = new Set(['mat', 'mrk', 'luk', 'jhn'])

/** Leading Hebrew verses that are a superscription with no English verse number. */
const PSALM_TITLE_VERSES = {
  3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 12: 1, 13: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1,
  30: 1, 31: 1, 34: 1, 36: 1, 38: 1, 39: 1, 40: 1, 41: 1, 42: 1, 44: 1, 45: 1, 46: 1, 47: 1,
  48: 1, 49: 1, 51: 2, 52: 2, 53: 1, 54: 2, 55: 1, 56: 1, 57: 1, 58: 1, 59: 1, 60: 2, 61: 1,
  62: 1, 63: 1, 64: 1, 65: 1, 67: 1, 68: 1, 69: 1, 70: 1, 75: 1, 76: 1, 77: 1, 80: 1, 81: 1,
  83: 1, 84: 1, 85: 1, 88: 1, 89: 1, 92: 1, 102: 1, 108: 1, 140: 1, 142: 1,
}

/**
 * English start/end — Hebrew start/end, same length, one chapter on each side.
 * Half-verse splits that do not change the whole verse number are omitted.
 */
const VERSE_RULES = [
  ['gen', 31, 55, 55, 32, 1, 1],
  ['gen', 32, 1, 32, 32, 2, 33],
  ['exo', 8, 1, 4, 7, 26, 29],
  ['exo', 8, 5, 32, 8, 1, 28],
  ['exo', 22, 1, 1, 21, 37, 37],
  ['exo', 22, 2, 31, 22, 1, 30],
  ['lev', 6, 1, 7, 5, 20, 26],
  ['lev', 6, 8, 30, 6, 1, 23],
  ['num', 16, 36, 50, 17, 1, 15],
  ['num', 17, 1, 13, 17, 16, 28],
  ['num', 26, 1, 1, 25, 19, 19],
  ['num', 29, 40, 40, 30, 1, 1],
  ['num', 30, 1, 16, 30, 2, 17],
  ['deu', 12, 32, 32, 13, 1, 1],
  ['deu', 13, 1, 18, 13, 2, 19],
  ['deu', 22, 30, 30, 23, 1, 1],
  ['deu', 23, 1, 25, 23, 2, 26],
  ['deu', 29, 1, 1, 28, 69, 69],
  ['deu', 29, 2, 29, 29, 1, 28],
  ['1sa', 20, 42, 42, 21, 1, 1],
  ['1sa', 21, 1, 15, 21, 2, 16],
  ['1sa', 23, 29, 29, 24, 1, 1],
  ['1sa', 24, 1, 22, 24, 2, 23],
  ['2sa', 18, 33, 33, 19, 1, 1],
  ['2sa', 19, 1, 43, 19, 2, 44],
  ['1ki', 4, 21, 34, 5, 1, 14],
  ['1ki', 5, 1, 18, 5, 15, 32],
  ['1ki', 22, 43, 43, 22, 44, 44],
  ['1ki', 22, 44, 53, 22, 45, 54],
  ['2ki', 11, 21, 21, 12, 1, 1],
  ['2ki', 12, 1, 21, 12, 2, 22],
  ['isa', 9, 1, 1, 8, 23, 23],
  ['isa', 9, 2, 21, 9, 1, 20],
  ['isa', 63, 19, 19, 63, 19, 19],
  ['isa', 64, 1, 1, 63, 19, 19],
  ['isa', 64, 2, 12, 64, 1, 11],
  ['jer', 9, 1, 1, 8, 23, 23],
  ['jer', 9, 2, 26, 9, 1, 25],
  ['ezk', 20, 45, 49, 21, 1, 5],
  ['ezk', 21, 1, 32, 21, 6, 37],
  ['hos', 1, 10, 11, 2, 1, 2],
  ['hos', 2, 1, 23, 2, 3, 25],
  ['hos', 11, 12, 12, 12, 1, 1],
  ['hos', 12, 1, 14, 12, 2, 15],
  ['hos', 13, 16, 16, 14, 1, 1],
  ['hos', 14, 1, 9, 14, 2, 10],
  ['jol', 2, 28, 32, 3, 1, 5],
  ['jol', 3, 1, 21, 4, 1, 21],
  ['jon', 1, 17, 17, 2, 1, 1],
  ['jon', 2, 1, 10, 2, 2, 11],
  ['mic', 5, 1, 1, 4, 14, 14],
  ['mic', 5, 2, 15, 5, 1, 14],
  ['nah', 1, 15, 15, 2, 1, 1],
  ['nah', 2, 1, 13, 2, 2, 14],
  ['zec', 1, 18, 21, 2, 1, 4],
  ['zec', 2, 1, 13, 2, 5, 17],
  ['mal', 4, 1, 6, 3, 19, 24],
  ['sng', 6, 13, 13, 7, 1, 1],
  ['sng', 7, 1, 13, 7, 2, 14],
  ['ecc', 5, 1, 1, 4, 17, 17],
  ['ecc', 5, 2, 20, 5, 1, 19],
  ['dan', 4, 1, 3, 3, 31, 33],
  ['dan', 4, 4, 37, 4, 1, 34],
  ['dan', 5, 31, 31, 6, 1, 1],
  ['dan', 6, 1, 28, 6, 2, 29],
  ['neh', 4, 1, 6, 3, 33, 38],
  ['neh', 4, 7, 23, 4, 1, 17],
  ['neh', 9, 38, 38, 10, 1, 1],
  ['neh', 10, 1, 39, 10, 2, 40],
  ['1ch', 6, 1, 15, 5, 27, 41],
  ['1ch', 6, 16, 81, 6, 1, 66],
  ['1ch', 12, 4, 4, 12, 4, 5],
  ['1ch', 12, 5, 40, 12, 6, 41],
  ['2ch', 2, 1, 1, 1, 18, 18],
  ['2ch', 2, 2, 18, 2, 1, 17],
  ['2ch', 14, 1, 1, 13, 23, 23],
  ['2ch', 14, 2, 15, 14, 1, 14],
]

const hebrewToEnglish = new Map()

function addDestination(table, hebrewChapter, hebrewVerse, englishChapter, englishVerse) {
  const key = `${hebrewChapter}:${hebrewVerse}`
  const dest = { ch: englishChapter, v: englishVerse }
  const list = table.get(key) ?? []
  if (!list.some((item) => item.ch === dest.ch && item.v === dest.v)) list.push(dest)
  table.set(key, list)
}

function addRule(book, englishChapter, englishStart, englishEnd, hebrewChapter, hebrewStart, hebrewEnd) {
  const englishCount = englishEnd - englishStart + 1
  const hebrewCount = hebrewEnd - hebrewStart + 1
  if (englishCount < 1 || hebrewCount < 1) throw new Error(`rule length ${book} ${englishChapter}:${englishStart}`)
  let table = hebrewToEnglish.get(book)
  if (!table) {
    table = new Map()
    hebrewToEnglish.set(book, table)
  }
  if (englishCount === hebrewCount) {
    for (let offset = 0; offset < englishCount; offset += 1) {
      addDestination(table, hebrewChapter, hebrewStart + offset, englishChapter, englishStart + offset)
    }
    return
  }
  if (englishCount === 1) {
    for (let verse = hebrewStart; verse <= hebrewEnd; verse += 1) {
      addDestination(table, hebrewChapter, verse, englishChapter, englishStart)
    }
    return
  }
  if (hebrewCount === 1) {
    for (let verse = englishStart; verse <= englishEnd; verse += 1) {
      addDestination(table, hebrewChapter, hebrewStart, englishChapter, verse)
    }
    return
  }
  throw new Error(`rule length ${book} ${englishChapter}:${englishStart}`)
}

for (const rule of VERSE_RULES) addRule(...rule)

function toEnglish(book, chapter, verse) {
  const titleVerses = book === 'psa' ? PSALM_TITLE_VERSES[chapter] : undefined
  if (titleVerses) {
    if (verse <= titleVerses) return []
    if (chapter === 13 && verse === 6) return [{ ch: 13, v: 5 }, { ch: 13, v: 6 }]
    return [{ ch: chapter, v: verse - titleVerses }]
  }
  return hebrewToEnglish.get(book)?.get(`${chapter}:${verse}`) ?? [{ ch: chapter, v: verse }]
}

function bookIds() {
  const source = readFileSync(join(root, 'src/scripture/books.ts'), 'utf8')
  return [...source.matchAll(/id: '([^']+)'/g)].map((match) => match[1])
}

function loadWeb() {
  const web = new Map()
  for (const id of bookIds()) {
    web.set(id, JSON.parse(readFileSync(join(root, 'public/scripture/web', `${id}.json`), 'utf8')))
  }
  return web
}

function verseText(web, book, chapter, verse) {
  const text = web.get(book)?.[chapter - 1]?.[verse - 1]
  return typeof text === 'string' ? text.trim() : ''
}

function parsePieces(reference) {
  const match = /^([1-3A-Z]{3}) (\d+):(\d+(?:-\d+)?(?:,\d+(?:-\d+)?)*)$/.exec(reference)
  if (!match) throw new Error(`reference ${reference}`)
  const book = match[1].toLowerCase()
  const chapter = Number(match[2])
  return match[3].split(',').map((part) => {
    const [start, end] = part.split('-').map(Number)
    return { book, chapter, start, end: end ?? start }
  })
}

function coalesce(points) {
  const sorted = [...points].sort((a, b) => a.ch - b.ch || a.v - b.v)
  const ranges = []
  for (const point of sorted) {
    const last = ranges[ranges.length - 1]
    if (last && last.ch === point.ch && last.end + 1 === point.v) last.end = point.v
    else ranges.push({ book: point.book, ch: point.ch, start: point.v, end: point.v })
  }
  return ranges
}

function clipRange(web, range) {
  const present = []
  for (let verse = range.start; verse <= range.end; verse += 1) {
    if (verseText(web, range.book, range.ch, verse)) present.push(verse)
  }
  const segments = []
  for (const verse of present) {
    const last = segments[segments.length - 1]
    if (last && last.end + 1 === verse) last.end = verse
    else segments.push({ book: range.book, ch: range.ch, start: verse, end: verse })
  }
  return segments
}

function keepPassage(references) {
  const books = new Set(references.map((reference) => reference.slice(0, 3).toLowerCase()))
  let gospels = 0
  for (const book of books) if (GOSPELS.has(book)) gospels += 1
  if (gospels >= 2) return true
  if (books.size >= 2 && references.length <= 8) return true
  if (books.size === 1 && references.length <= 5) return true
  return false
}

function rangeKey(range) {
  return `${range.book}:${range.ch}:${range.start}:${range.end}`
}

function contains(range, book, chapter, verse) {
  return range.book === book && range.ch === chapter && range.start <= verse && verse <= range.end
}

function ensureXml() {
  if (existsSync(xmlPath)) return
  execFileSync('curl', ['-fsSL', '-o', xmlPath, xmlUrl], { stdio: 'inherit' })
}

function passagesFromXml(xml) {
  const blocks = xml.match(/<Passage>[\s\S]*?<\/Passage>/g) ?? []
  return blocks.map((block) => [...block.matchAll(/<Verse\b([^>]*)>([^<]+)<\/Verse>/g)].map((match) => ({
    hebrew: /\bHEB=/.test(match[1]),
    reference: match[2],
  })))
}

function englishRanges(web, piece, hebrew) {
  const points = []
  const missing = []
  for (let verse = piece.start; verse <= piece.end; verse += 1) {
    const mapped = hebrew ? toEnglish(piece.book, piece.chapter, verse) : [{ ch: piece.chapter, v: verse }]
    if (mapped.length === 0) continue
    for (const point of mapped) {
      if (!verseText(web, piece.book, point.ch, point.v)) {
        missing.push(`${piece.book} ${piece.chapter}:${verse} → ${point.ch}:${point.v}`)
        continue
      }
      points.push({ book: piece.book, ch: point.ch, v: point.v })
    }
  }
  const unique = []
  const seen = new Set()
  for (const point of points) {
    const key = `${point.ch}:${point.v}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(point)
  }
  return { ranges: coalesce(unique).flatMap((range) => clipRange(web, range)), missing }
}

function assertText(web, book, chapter, verse, pattern) {
  const text = verseText(web, book, chapter, verse)
  if (!pattern.test(text)) throw new Error(`expected ${book} ${chapter}:${verse} to match ${pattern}, got ${text.slice(0, 80)}`)
}

function assertMapped(book, hebrewChapter, hebrewVerse, englishChapter, englishVerse) {
  const mapped = toEnglish(book, hebrewChapter, hebrewVerse)
  const found = mapped.some((point) => point.ch === englishChapter && point.v === englishVerse)
  if (!found) {
    throw new Error(`${book} ${hebrewChapter}:${hebrewVerse} → ${JSON.stringify(mapped)}, expected ${englishChapter}:${englishVerse}`)
  }
}

function build() {
  ensureXml()
  const ids = bookIds()
  const idIndex = new Map(ids.map((id, index) => [id, index]))
  const web = loadWeb()

  assertMapped('psa', 22, 2, 22, 1)
  assertMapped('psa', 53, 2, 53, 1)
  if (toEnglish('psa', 53, 1).length !== 0) throw new Error('psalm 53 title')
  assertMapped('psa', 18, 51, 18, 50)
  assertMapped('psa', 18, 2, 18, 1)
  assertMapped('psa', 14, 1, 14, 1)
  assertMapped('psa', 60, 14, 60, 12)
  assertMapped('psa', 40, 18, 40, 17)
  assertMapped('psa', 51, 6, 51, 4)
  assertMapped('1ki', 5, 25, 5, 11)
  assertMapped('isa', 8, 23, 9, 1)
  assertMapped('2ch', 13, 23, 14, 1)
  assertMapped('hos', 2, 25, 2, 23)
  assertText(web, 'psa', 22, 1, /forsaken/i)
  assertText(web, 'psa', 53, 1, /fool/i)
  assertText(web, 'psa', 14, 1, /fool/i)
  assertText(web, 'psa', 18, 1, /love you/i)

  const xml = readFileSync(xmlPath, 'utf8')
  const passages = passagesFromXml(xml)
  const index = new Map()
  const missing = []
  let kept = 0

  for (const passage of passages) {
    const references = passage.map((verse) => verse.reference)
    if (!keepPassage(references)) continue
    const ranges = []
    const seen = new Set()
    for (const verse of passage) {
      for (const piece of parsePieces(verse.reference)) {
        const converted = englishRanges(web, piece, verse.hebrew)
        missing.push(...converted.missing)
        for (const range of converted.ranges) {
          const key = rangeKey(range)
          if (seen.has(key)) continue
          seen.add(key)
          ranges.push(range)
        }
      }
    }
    if (ranges.length < 2) continue
    kept += 1
    for (const range of ranges) {
      for (let verse = range.start; verse <= range.end; verse += 1) {
        const others = ranges.filter((candidate) => !contains(candidate, range.book, range.ch, verse))
        if (others.length === 0) continue
        const key = `${range.book}:${range.ch}:${verse}`
        const bucket = index.get(key) ?? new Map()
        for (const other of others) bucket.set(rangeKey(other), other)
        index.set(key, bucket)
      }
    }
  }

  const allowedMissing = new Set(['act 8:37', 'act 15:34', 'act 24:7', 'luk 17:36'])
  const unexpected = missing.filter((item) => {
    const target = item.split(' → ')[1]
    const book = item.slice(0, 3)
    return !allowedMissing.has(`${book} ${target}`)
  })
  if (unexpected.length > 0) {
    throw new Error(`unmapped verses:\n${unexpected.slice(0, 30).join('\n')}`)
  }

  const books = {}
  const ordered = [...index.entries()].sort((a, b) => a[0].localeCompare(b[0], 'en', { numeric: true }))
  for (const [key, bucket] of ordered) {
    const [book, chapter, verse] = key.split(':')
    const rows = [...bucket.values()]
      .map((range) => [idIndex.get(range.book), range.ch, range.start, range.end])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3])
    const chapterMap = (books[book] ??= {})
    const verseMap = (chapterMap[chapter] ??= {})
    verseMap[verse] = rows
  }

  function rowsFor(book, chapter, verse) {
    return books[book]?.[chapter]?.[verse] ?? null
  }

  function includes(book, chapter, verse, bookIndex, startChapter, startVerse, endVerse) {
    const rows = rowsFor(book, chapter, verse)
    if (!rows?.some((row) => row[0] === bookIndex && row[1] === startChapter && row[2] === startVerse && row[3] === endVerse)) {
      throw new Error(`missing parallel ${book} ${chapter}:${verse} → ${bookIndex} ${startChapter}:${startVerse}-${endVerse}`)
    }
  }

  includes('mat', '3', '16', idIndex.get('mrk'), 1, 10, 11)
  includes('mat', '3', '16', idIndex.get('luk'), 3, 21, 22)
  includes('mat', '3', '16', idIndex.get('jhn'), 1, 32, 32)
  includes('jhn', '1', '23', idIndex.get('mat'), 3, 3, 3)
  includes('psa', '22', '1', idIndex.get('mat'), 27, 46, 46)
  includes('psa', '14', '1', idIndex.get('psa'), 53, 1, 1)
  includes('mat', '5', '43', idIndex.get('mrk'), 12, 31, 31)
  if (rowsFor('rut', '1', '1')) throw new Error('ruth should have no parallels')
  if (rowsFor('num', '7', '14')) throw new Error('numbers 7 formula list should be omitted')
  if (rowsFor('jer', '13', '8')) throw new Error('jeremiah formula list should be omitted')
  if (rowsFor('rom', '1', '7')) throw new Error('epistle greetings should be omitted')

  writeFileSync(outPath, `${JSON.stringify(books)}\n`)
  writeFileSync(
    licensePath,
    [
      'UBS Parallel Passage Database',
      '© 2023 United Bible Societies',
      'Licensed under Creative Commons Attribution-ShareAlike 4.0 International.',
      'https://creativecommons.org/licenses/by-sa/4.0/',
      '',
      'Source: https://github.com/ubsicap/ubs-open-license/tree/main/parallel%20passages',
      '',
      'public/scripture/parallels.json is Adapted Material. Word-match numbers were omitted.',
      'Hebrew verse numbers were converted to traditional Protestant numbering.',
      'Long formula lists were left out. See scripts/build-parallels.mjs.',
      '',
    ].join('\n'),
  )

  const bytes = Buffer.byteLength(JSON.stringify(books))
  console.log(`passages kept ${kept} of ${passages.length}; verses indexed ${index.size}; ${bytes} bytes`)
}

build()
