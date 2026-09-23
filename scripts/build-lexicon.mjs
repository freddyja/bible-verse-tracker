/**
 * Builds the Greek and Hebrew lexicon from STEP Bible data (CC BY 4.0).
 *
 * Word lists: TAGNT (Greek NT) and TAHOT (Hebrew OT).
 * Definitions: TBESG and TBESH, the STEP Bible brief lexicons
 * (Abbott-Smith for Greek, abridged BDB for Hebrew).
 *
 * Greek words are limited to the Textus Receptus (Scrivener 1894), marked K
 * outside parentheses in the STEP Bible edition code. Where that file records
 * a distinct TR spelling, the TR spelling is the surface form.
 * Hebrew words are the Leningrad reading (type L).
 *
 * Changes from the source files, noted for the CC BY 4.0 record:
 * - Split into one JSON file per book, plus two dictionary files.
 * - Dropped morphology, edition lists, and textual variants that are not the
 *   traditional Greek text or the Leningrad Hebrew reading.
 * - Removed morpheme slashes, cantillation, and verse punctuation from the
 *   Hebrew surface form. Transliteration keeps a hyphen at a prefix boundary
 *   and STEP Bible's capital for the stressed syllable.
 * - Definitions longer than the phone limit are cut at a sentence or line.
 * - Strong's numbers are written without leading zeros (G0976 → G976).
 *   A disambiguating letter is kept (H7225G).
 *
 * Usage: node scripts/build-lexicon.mjs
 */
import { createReadStream, createWriteStream, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import readline from 'node:readline'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const cacheDir = join(root, 'scripts/.cache/stepbible')
const outDir = join(root, 'public/scripture/lexicon')
const wordsDir = join(outDir, 'words')
const base = 'https://raw.githubusercontent.com/STEPBible/STEPBible-Data/master'
const greekLimit = 900
const hebrewLimit = 1200

const STEP_BOOK = {
  gen: 'gen',
  exo: 'exo',
  lev: 'lev',
  num: 'num',
  deu: 'deu',
  jos: 'jos',
  jdg: 'jdg',
  rut: 'rut',
  '1sa': '1sa',
  '2sa': '2sa',
  '1ki': '1ki',
  '2ki': '2ki',
  '1ch': '1ch',
  '2ch': '2ch',
  ezr: 'ezr',
  neh: 'neh',
  est: 'est',
  job: 'job',
  psa: 'psa',
  pro: 'pro',
  ecc: 'ecc',
  sng: 'sng',
  isa: 'isa',
  jer: 'jer',
  lam: 'lam',
  ezk: 'ezk',
  dan: 'dan',
  hos: 'hos',
  jol: 'jol',
  amo: 'amo',
  oba: 'oba',
  jon: 'jon',
  mic: 'mic',
  nam: 'nah',
  hab: 'hab',
  zep: 'zep',
  hag: 'hag',
  zec: 'zec',
  mal: 'mal',
  mat: 'mat',
  mrk: 'mrk',
  luk: 'luk',
  jhn: 'jhn',
  act: 'act',
  rom: 'rom',
  '1co': '1co',
  '2co': '2co',
  gal: 'gal',
  eph: 'eph',
  php: 'php',
  col: 'col',
  '1th': '1th',
  '2th': '2th',
  '1ti': '1ti',
  '2ti': '2ti',
  tit: 'tit',
  phm: 'phm',
  heb: 'heb',
  jas: 'jas',
  '1pe': '1pe',
  '2pe': '2pe',
  '1jn': '1jn',
  '2jn': '2jn',
  '3jn': '3jn',
  jud: 'jud',
  rev: 'rev',
}

const sources = {
  greekWords: [
    'Translators Amalgamated OT+NT/TAGNT Mat-Jhn - Translators Amalgamated Greek NT - STEPBible.org CC-BY.txt',
    'Translators Amalgamated OT+NT/TAGNT Act-Rev - Translators Amalgamated Greek NT - STEPBible.org CC-BY.txt',
  ],
  hebrewWords: [
    'Translators Amalgamated OT+NT/TAHOT Gen-Deu - Translators Amalgamated Hebrew OT - STEPBible.org CC BY.txt',
    'Translators Amalgamated OT+NT/TAHOT Jos-Est - Translators Amalgamated Hebrew OT - STEPBible.org CC BY.txt',
    'Translators Amalgamated OT+NT/TAHOT Job-Sng - Translators Amalgamated Hebrew OT - STEPBible.org CC BY.txt',
    'Translators Amalgamated OT+NT/TAHOT Isa-Mal - Translators Amalgamated Hebrew OT - STEPBible.org CC BY.txt',
  ],
  greekLexicon:
    'Lexicons/TBESG - Translators Brief lexicon of Extended Strongs for Greek - STEPBible.org CC BY.txt',
  hebrewLexicon:
    'Lexicons/TBESH - Translators Brief lexicon of Extended Strongs for Hebrew - STEPBible.org CC BY.txt',
}

function normalizeStrong(raw) {
  const match = String(raw)
    .toUpperCase()
    .match(/([GH])0*(\d+)([A-Z]?)/)
  if (!match) return null
  const n = Number(match[2])
  if (!Number.isInteger(n) || n <= 0) return null
  return `${match[1]}${n}${match[3]}`
}

function baseStrong(id) {
  return id.replace(/[A-Z]+$/, '')
}

function inTraditionalGreek(type) {
  return /[Kk]/.test(type.replace(/\([^)]*\)/g, ''))
}

function cleanGloss(value) {
  return value
    .replace(/\[[^\]]*\]/g, (part) => part.slice(1, -1))
    .replace(/<[^>]*>/g, (part) => part.slice(1, -1))
    .replace(/\//g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^[,.;:\s]+|[,.;:\s]+$/g, '')
    .trim()
}

function stripGreekPunct(value) {
  return value.replace(/^[\s.,;:··"“”«»]+|[\s.,;:··"“”«»]+$/g, '').trim()
}

function foldGreek(value) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

const CANTILLATION = /[\u0591-\u05AF\u05BD\u05BF\u05C0\u05C3-\u05C6]/g

function hebrewSurface(value) {
  return value
    .replace(/\\/g, '')
    .replace(/[/\u05BE\u05C3׃־]/g, '')
    .replace(CANTILLATION, '')
    .replace(/\s+/g, '')
    .trim()
}

function hebrewTranslit(value) {
  return value
    .replace(/\\\S*/g, '')
    .split('/')
    .map((part) => part.replace(/\./g, ''))
    .filter((part) => part.length > 0)
    .join('-')
}

function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function clip(text, limit, keepLines) {
  const clean = keepLines ? text.trim() : text.replace(/\s+/g, ' ').trim()
  if (clean.length <= limit) return clean
  const slice = clean.slice(0, limit)
  if (keepLines) {
    const end = slice.lastIndexOf('\n')
    return (end > limit * 0.4 ? slice.slice(0, end) : slice).trim()
  }
  const end = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('; '))
  if (end > limit * 0.5) return slice.slice(0, end + 1).trim()
  return `${slice.trim()}…`
}

function relatedIds(text, self) {
  const found = []
  const seen = new Set([self, baseStrong(self)])
  const re = /\b([GH])0*(\d+)([A-Za-z]?)\b/gi
  for (const match of text.matchAll(re)) {
    const id = normalizeStrong(`${match[1]}${match[2]}${match[3] ?? ''}`)
    if (!id || seen.has(id)) continue
    const number = Number(id.slice(1).replace(/\D/g, ''))
    if (id.startsWith('H') && number >= 9000) continue
    if (id.startsWith('G') && number >= 5625) continue
    if (!Number.isInteger(number) || number <= 0) continue
    seen.add(id)
    found.push(id)
    if (found.length >= 6) break
  }
  return found
}

function trSpelling(field) {
  const match = /(?:^|[+;]\s*)TR:\s*([^;]+)/i.exec(field)
  if (!match) return ''
  return stripGreekPunct(match[1].replace(/\([^)]*\)/g, ' '))
}

async function download(remotePath) {
  const name = remotePath.split('/').pop()
  const dest = join(cacheDir, name)
  mkdirSync(cacheDir, { recursive: true })
  const url = `${base}/${remotePath.split('/').map(encodeURIComponent).join('/')}`
  console.log('download', name)
  const response = await fetch(url)
  if (!response.ok || !response.body) throw new Error(`${response.status} ${url}`)
  await pipeline(Readable.fromWeb(response.body), createWriteStream(dest))
  return dest
}

function parseRef(cell) {
  const match = /^(\d?[A-Za-z]{2,3})\.(\d+)\.(\d+)#(\d+)=([A-Za-z0-9()]+)/.exec(cell)
  if (!match) return null
  const bookId = STEP_BOOK[match[1].toLowerCase()]
  if (!bookId) return null
  return {
    bookId,
    chapter: Number(match[2]),
    verse: Number(match[3]),
    index: Number(match[4]),
    type: match[5],
  }
}

function ensureVerse(books, bookId, chapter, verse) {
  let book = books.get(bookId)
  if (!book) {
    book = new Map()
    books.set(bookId, book)
  }
  const chapterKey = String(chapter)
  let chapterMap = book.get(chapterKey)
  if (!chapterMap) {
    chapterMap = new Map()
    book.set(chapterKey, chapterMap)
  }
  const verseKey = String(verse)
  let rows = chapterMap.get(verseKey)
  if (!rows) {
    rows = new Map()
    chapterMap.set(verseKey, rows)
  }
  return rows
}

async function readGreek(path, books, used) {
  const rl = readline.createInterface({ input: createReadStream(path, 'utf8'), crlfDelay: Infinity })
  let count = 0
  for await (const line of rl) {
    if (!line || line.startsWith('#') || line.startsWith('Word')) continue
    const cols = line.split('\t')
    const ref = parseRef(cols[0] ?? '')
    if (!ref || ref.chapter < 1 || ref.verse < 1) continue
    if (!inTraditionalGreek(ref.type)) continue
    const greekCell = cols[1] ?? ''
    const pair = /^(.*?)\s*\(([^)]*)\)\s*$/.exec(greekCell)
    const spelled = trSpelling(cols[7] ?? '')
    const surface = stripGreekPunct(spelled || (pair ? pair[1] : greekCell))
    const transliteration = (pair?.[2] ?? '').replace(/\./g, '').trim()
    const strong = normalizeStrong((cols[3] ?? '').split('=')[0])
    const gloss = cleanGloss(cols[2] ?? '')
    if (!surface || !strong) continue
    const rows = ensureVerse(books, ref.bookId, ref.chapter, ref.verse)
    if (rows.has(ref.index)) continue
    rows.set(ref.index, [surface, transliteration, strong, gloss])
    used.add(strong)
    used.add(baseStrong(strong))
    count += 1
  }
  console.log('greek words', count, path.split('/').pop())
}

function rootStrong(cell) {
  const braced = [...cell.matchAll(/\{([HG]\d+[A-Za-z]?)\}/gi)].map((match) => normalizeStrong(match[1]))
  const lexical = braced.filter((id) => id && Number(id.slice(1).replace(/\D/g, '')) < 9000)
  if (lexical.length > 0) return lexical[lexical.length - 1]
  return normalizeStrong(cell)
}

function isAramaic(grammar) {
  return grammar.split('/').some((part) => part.startsWith('A'))
}

async function readHebrew(path, books, used) {
  const rl = readline.createInterface({ input: createReadStream(path, 'utf8'), crlfDelay: Infinity })
  let count = 0
  const types = new Map()
  for await (const line of rl) {
    if (!line || line.startsWith('Eng') || line.startsWith('#')) continue
    const cols = line.split('\t')
    const ref = parseRef(cols[0] ?? '')
    if (!ref || ref.chapter < 1 || ref.verse < 1) continue
    types.set(ref.type, (types.get(ref.type) ?? 0) + 1)
    if (ref.type !== 'L') continue
    const surface = hebrewSurface(cols[1] ?? '')
    const transliteration = hebrewTranslit(cols[2] ?? '')
    const strong = rootStrong(cols[4] ?? '')
    const gloss = cleanGloss(cols[3] ?? '')
    if (!surface || !strong) continue
    const word = [surface, transliteration, strong, gloss]
    if (isAramaic(cols[5] ?? '')) word.push('a')
    const rows = ensureVerse(books, ref.bookId, ref.chapter, ref.verse)
    if (rows.has(ref.index)) continue
    rows.set(ref.index, word)
    used.add(strong)
    used.add(baseStrong(strong))
    count += 1
  }
  const top = [...types.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)
  console.log('hebrew words', count, path.split('/').pop(), 'types', top.map(([k, v]) => `${k}:${v}`).join(' '))
}

function writeBooks(books) {
  mkdirSync(wordsDir, { recursive: true })
  for (const [bookId, chapters] of books) {
    const out = {}
    for (const [chapter, verses] of chapters) {
      out[chapter] = {}
      for (const [verse, rows] of verses) {
        out[chapter][verse] = [...rows.keys()]
          .sort((a, b) => a - b)
          .map((index) => rows.get(index))
      }
    }
    writeFileSync(join(wordsDir, `${bookId}.json`), JSON.stringify(out))
  }
}

function parseLexicon(path, language, used) {
  const text = readFileSync(path, 'utf8')
  const entries = new Map()
  const primary = new Set()
  for (const line of text.split('\n')) {
    if (!/^[GH]\d/.test(line)) continue
    const cols = line.split('\t')
    if (cols.length < 7) continue
    const fromRelation = /^([HG]\d+[A-Za-z]?)/i.exec(cols[1] ?? '')
    const id = normalizeStrong(fromRelation?.[1] || cols[2] || cols[0])
    if (!id) continue
    const number = Number(id.slice(1).replace(/\D/g, ''))
    if (language === 'hebrew' && number >= 9000) continue
    if (language === 'greek' && number >= 5625) continue
    const base = baseStrong(id)
    if (!used.has(id) && !used.has(base)) continue
    const lemma = (cols[3] ?? '').trim()
    const transliteration = (cols[4] ?? '').trim()
    const gloss = cleanGloss(cols[6] ?? '')
    if (!lemma && !gloss) continue
    const rawDef = htmlToText(cols[7] ?? '').replace(/__+/g, ' ')
    const definition = clip(rawDef || gloss, language === 'hebrew' ? hebrewLimit : greekLimit, language === 'hebrew')
    const isMain = /=\s*$/.test(cols[1] ?? '') || (/=\s/.test(cols[1] ?? '') && !/meaning of/i.test(cols[1] ?? ''))
    const row = [lemma, transliteration, gloss, definition || gloss, relatedIds(`${gloss}\n${rawDef}`, id)]
    if (entries.has(id) && primary.has(id) && !isMain) continue
    entries.set(id, row)
    if (isMain) primary.add(id)
    if (!entries.has(base)) entries.set(base, row)
    else if (isMain && !primary.has(base)) {
      entries.set(base, row)
      primary.add(base)
    }
  }
  const byLemma = new Map()
  for (const [id, row] of entries) {
    const lemma = foldGreek(row[0])
    if (lemma.length >= 4 && !byLemma.has(lemma)) byLemma.set(lemma, id)
  }
  const out = {}
  for (const [id, row] of entries) {
    const self = foldGreek(row[0])
    const linked = row[4].filter((related) => entries.has(related) || entries.has(baseStrong(related)))
    const seen = new Set(linked)
    const words = foldGreek(row[3]).match(/\p{Script=Greek}+/gu) ?? []
    for (const word of words) {
      if (word.length < 4 || word === self || linked.length >= 6) continue
      const related = byLemma.get(word)
      if (!related || related === id || seen.has(related)) continue
      seen.add(related)
      linked.push(related)
    }
    row[4] = linked
    out[id] = row
  }
  return out
}

function sample(books, bookId, chapter, verse) {
  const rows = books.get(bookId)?.get(String(chapter))?.get(String(verse))
  if (!rows) return []
  return [...rows.keys()].sort((a, b) => a - b).map((index) => rows.get(index))
}

async function main() {
  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(wordsDir, { recursive: true })
  const books = new Map()
  const used = new Set()
  for (const remote of sources.greekWords) await readGreek(await download(remote), books, used)
  for (const remote of sources.hebrewWords) await readHebrew(await download(remote), books, used)
  writeBooks(books)

  const greek = parseLexicon(await download(sources.greekLexicon), 'greek', used)
  const hebrew = parseLexicon(await download(sources.hebrewLexicon), 'hebrew', used)
  writeFileSync(join(outDir, 'greek.json'), JSON.stringify(greek))
  writeFileSync(join(outDir, 'hebrew.json'), JSON.stringify(hebrew))

  const john = sample(books, 'jhn', 3, 16)
  const gen = sample(books, 'gen', 1, 1)
  if (!john.some((word) => word[2] === 'G25' || /^G25[A-Z]/.test(word[2]))) {
    throw new Error(`John 3:16 did not include ἀγαπάω: ${JSON.stringify(john)}`)
  }
  if (!gen.some((word) => word[2].startsWith('H1254') || word[2].startsWith('H7225'))) {
    throw new Error(`Genesis 1:1 did not include the expected Hebrew words: ${JSON.stringify(gen)}`)
  }
  if (!greek.G26 && !greek.G25) throw new Error('Greek lexicon is missing love')
  console.log('books', books.size, 'greek entries', Object.keys(greek).length, 'hebrew entries', Object.keys(hebrew).length)
  console.log('John 3:16', john.map((word) => word[0]).join(' '))
  console.log('Genesis 1:1', gen.map((word) => `${word[0]} ${word[1]}`).join(' | '))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
