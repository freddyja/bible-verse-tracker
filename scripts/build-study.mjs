/**
 * Builds the two study notes that are not Matthew Henry.
 *
 * Then (original audience): unfoldingWord Translation Notes introductions,
 * CC BY-SA 4.0. Only the sections the source already separates as the
 * author, the occasion, and the religious and cultural world of the book.
 * Outlines, title-translation advice, and "translation issues" are left out.
 * The wording of the kept sections is not rewritten. Markdown links and
 * emphasis marks are removed so the note can be shown as plain text.
 * The note is about the whole book. It is not attached as if it were written
 * for one verse.
 *
 * Today: Charles Spurgeon, Faith's Checkbook (public domain). A reading is
 * stored only on the verse cited in that reading's heading. The date and the
 * repeated verse quotation are left out. The title and the comment stay.
 *
 * Usage: node scripts/build-study.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const thenDir = join(root, 'public/scripture/study/then')
const todayDir = join(root, 'public/scripture/study/today')
const tnBase = 'https://git.door43.org/unfoldingWord/en_tn/raw/tag/v85'

const TN_BOOK = {
  GEN: 'gen',
  EXO: 'exo',
  LEV: 'lev',
  NUM: 'num',
  DEU: 'deu',
  JOS: 'jos',
  JDG: 'jdg',
  RUT: 'rut',
  '1SA': '1sa',
  '2SA': '2sa',
  '1KI': '1ki',
  '2KI': '2ki',
  '1CH': '1ch',
  '2CH': '2ch',
  EZR: 'ezr',
  NEH: 'neh',
  EST: 'est',
  JOB: 'job',
  PSA: 'psa',
  PRO: 'pro',
  ECC: 'ecc',
  SNG: 'sng',
  ISA: 'isa',
  JER: 'jer',
  LAM: 'lam',
  EZK: 'ezk',
  DAN: 'dan',
  HOS: 'hos',
  JOL: 'jol',
  AMO: 'amo',
  OBA: 'oba',
  JON: 'jon',
  MIC: 'mic',
  NAM: 'nah',
  HAB: 'hab',
  ZEP: 'zep',
  HAG: 'hag',
  ZEC: 'zec',
  MAL: 'mal',
  MAT: 'mat',
  MRK: 'mrk',
  LUK: 'luk',
  JHN: 'jhn',
  ACT: 'act',
  ROM: 'rom',
  '1CO': '1co',
  '2CO': '2co',
  GAL: 'gal',
  EPH: 'eph',
  PHP: 'php',
  COL: 'col',
  '1TH': '1th',
  '2TH': '2th',
  '1TI': '1ti',
  '2TI': '2ti',
  TIT: 'tit',
  PHM: 'phm',
  HEB: 'heb',
  JAS: 'jas',
  '1PE': '1pe',
  '2PE': '2pe',
  '1JN': '1jn',
  '2JN': '2jn',
  '3JN': '3jn',
  JUD: 'jud',
  REV: 'rev',
}

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
  ['psalm', 'psa'],
  ['psalms', 'psa'],
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

function decodeBasic(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-z]+;/g, ' ')
}

function plainChunk(value) {
  return decodeBasic(value)
    .replace(/\[\[rc:\/\/[^\]]+\]\]/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|\s)\*([^*\n]+)\*(?=\s|$)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\(\.\.\/[^)]+\)/g, '')
    .replace(/\(See:\s*\)/gi, '')
    .replace(/\(\s*\)/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function excludedHeading(title) {
  return /translat|outline|title of this book|title of the book|how should the title|special formatting|textual issue|major issues in the text|in order to translate/i.test(
    title,
  )
}

function audienceNote(markdown) {
  const text = markdown.replace(/\\n/g, '\n').replace(/\r/g, '')
  const sections = []
  let current = null
  for (const line of text.split('\n')) {
    const heading = /^(#{1,4})\s+(.*?)\s*$/.exec(line)
    if (heading) {
      if (current) sections.push(current)
      current = { level: heading[1].length, title: heading[2].replace(/\*\*/g, '').trim(), body: [] }
    } else if (current) current.body.push(line)
  }
  if (current) sections.push(current)

  let mode = 'skip'
  let suppressLevel = 0
  const kept = []
  for (const section of sections) {
    if (suppressLevel && section.level <= suppressLevel) suppressLevel = 0
    if (section.level <= 2) {
      suppressLevel = 0
      const title = section.title
      if (/translation issues/i.test(title)) mode = 'skip'
      else if (/cultural/i.test(title) || /^part\s*2\b/i.test(title)) mode = 'part2'
      else if (/general introduction/i.test(title) || /^part\s*1\b/i.test(title) || section.level === 1) mode = 'part1'
      else mode = 'skip'
      continue
    }
    if (mode === 'skip') continue
    if (suppressLevel && section.level > suppressLevel) continue
    if (excludedHeading(section.title)) {
      suppressLevel = section.level
      continue
    }
    const title = plainChunk(section.title).replace(/\s+/g, ' ').trim()
    const body = plainChunk(section.body.join('\n'))
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join('\n\n')
    kept.push(body ? `${title}\n\n${body}` : title)
  }
  return kept.join('\n\n').trim()
}

function parseCitation(value) {
  const cleaned = value
    .trim()
    .replace(/\./g, ':')
    .replace(/\s+/g, ' ')
    .replace(/\bl(?=\d)/g, '1')
  const spaced = /^(.+?)\s+(\d+):(\d+)/.exec(cleaned)
  const tight = spaced ? null : /^([A-Za-z]+)(\d+):(\d+)/.exec(cleaned.replace(/\s+/g, ''))
  const name = (spaced?.[1] ?? tight?.[1] ?? '').toLowerCase()
  const chapter = Number(spaced?.[2] ?? tight?.[2])
  const verse = Number(spaced?.[3] ?? tight?.[3])
  if (!name || !chapter || !verse) return null
  const alias = BOOK_ALIASES.find(([label]) => label === name)
  if (!alias) return null
  return { bookId: alias[1], chapter, verse }
}

function stripTags(value) {
  return decodeBasic(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function paragraphsAfter(html) {
  return html
    .split(/<P>/i)
    .map((part) => stripTags(part))
    .filter((part) => part.length > 40)
}

function spurgeonReadings(html) {
  const blocks = html.split(/<A NAME="[^"]+"><\/A>/i).slice(1)
  const byBook = new Map()
  const missed = []
  for (const block of blocks) {
    const italic = /<I>([\s\S]*?)<\/I>/i.exec(block)
    if (!italic) {
      missed.push('no-verse')
      continue
    }
    const verseLine = stripTags(italic[1])
    const cited = [...verseLine.matchAll(/\(([^)]+)\)/g)].pop()
    const passage = cited ? parseCitation(cited[1]) : null
    if (!passage) {
      missed.push(cited?.[1] ?? verseLine.slice(-60))
      continue
    }
    const titles = [...block.matchAll(/<H[34]>([\s\S]*?)<\/H[34]>/gi)]
      .map((match) => stripTags(match[1]))
      .filter((title) => title && !/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d+$/i.test(title))
      .filter((title) => !title.includes(verseLine.slice(0, 24)))
    const title = titles[0] ?? ''
    const after = block.split(/<\/I>/i)[1] ?? ''
    const body = paragraphsAfter(after).join('\n\n')
    if (!body) {
      missed.push(`empty ${passage.bookId} ${passage.chapter}:${passage.verse}`)
      continue
    }
    const note = title ? `${title}\n\n${body}` : body
    let book = byBook.get(passage.bookId)
    if (!book) {
      book = {}
      byBook.set(passage.bookId, book)
    }
    const chapter = String(passage.chapter)
    const verse = String(passage.verse)
    book[chapter] ??= {}
    book[chapter][verse] = book[chapter][verse] ? `${book[chapter][verse]}\n\n${note}` : note
  }
  return { byBook, missed }
}

async function fetchText(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  return response.text()
}

async function buildThen() {
  mkdirSync(thenDir, { recursive: true })
  const list = await fetchText('https://git.door43.org/api/v1/repos/unfoldingWord/en_tn/contents/?ref=v85')
  const files = JSON.parse(list)
    .map((item) => item.name)
    .filter((name) => /^tn_[A-Z0-9]+\.tsv$/.test(name))
  let kept = 0
  for (const name of files) {
    const code = name.slice(3, -4)
    const bookId = TN_BOOK[code]
    if (!bookId) throw new Error(`unknown translation-notes book ${code}`)
    const tsv = await fetchText(`${tnBase}/${name}`)
    const line = tsv.split('\n').find((row) => row.startsWith('front:intro\t'))
    if (!line) {
      console.log('no intro', bookId)
      continue
    }
    const noteField = line.split('\t').slice(6).join('\t')
    const note = audienceNote(noteField)
    if (note.length < 80) {
      console.log('intro too thin', bookId, note.length)
      continue
    }
    if (/^how should the title|^translation issues/im.test(note)) {
      throw new Error(`${bookId} audience note still has a translator heading`)
    }
    writeFileSync(join(thenDir, `${bookId}.json`), JSON.stringify({ book: note }))
    kept += 1
    console.log('then', bookId, note.length)
  }
  return kept
}

async function buildToday() {
  mkdirSync(todayDir, { recursive: true })
  const html = await fetchText('https://archive.spurgeon.org/fcb/fcb-bod.htm')
  const { byBook, missed } = spurgeonReadings(html)
  if (missed.length > 0) {
    console.log('unparsed readings', missed.length)
    console.log(missed.slice(0, 12).join(' | '))
  }
  let readings = 0
  for (const [bookId, chapters] of byBook) {
    writeFileSync(join(todayDir, `${bookId}.json`), JSON.stringify(chapters))
    for (const verses of Object.values(chapters)) readings += Object.keys(verses).length
  }
  const genesis = byBook.get('gen')?.['3']?.['15'] ?? ''
  if (!/first promise to fallen man/i.test(genesis)) {
    throw new Error('Genesis 3:15 did not keep Spurgeon’s reading')
  }
  console.log('today readings', readings, 'missed', missed.length)
  return { readings, missed: missed.length }
}

const thenCount = await buildThen()
const today = await buildToday()
if (thenCount < 40) throw new Error(`expected audience notes for most translation-note books, got ${thenCount}`)
if (today.readings < 355 || today.missed > 0) {
  throw new Error(`Faith's Checkbook parse was short: ${today.readings} kept, ${today.missed} missed`)
}
console.log('study notes ready')
