import { BOOKS } from './books'
import {
  baseStrong,
  entryFromRow,
  normalizeStrong,
  wordFromRow,
  type LexiconEntry,
  type LexiconWord,
} from './lexicon'
import { pickMeaning, type MeaningHit } from './meaning'
import { fold, type PassageRef } from './passages'
import { versionById } from './versions'

export type { LexiconEntry, LexiconWord }

export type ScriptureHit = PassageRef & { text: string }

const books = new Map<string, string[][]>()
const xrefs = new Map<string, number[][][][]>()

function scriptureUrl(path: string): string {
  return `${import.meta.env.BASE_URL}scripture/${path}`
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(url)
  return response.json() as Promise<T>
}

async function fetchOptional<T>(url: string): Promise<T | null> {
  const response = await fetch(url)
  if (response.status === 404) return null
  if (!response.ok) throw new Error(url)
  return response.json() as Promise<T>
}

function versionFolder(versionId: string): string {
  const folder = versionById(versionId)?.folder
  if (!folder) throw new Error('version')
  return folder
}

export function peekBook(versionId: string, bookIndex: number): string[][] | null {
  const id = BOOKS[bookIndex]?.id
  if (!id) return null
  return books.get(`${versionId}:${id}`) ?? null
}

export function peekVerse(
  versionId: string,
  bookIndex: number,
  chapter: number,
  verse: number,
): string | null {
  return peekBook(versionId, bookIndex)?.[chapter - 1]?.[verse - 1] ?? null
}

export async function loadBook(versionId: string, bookIndex: number): Promise<string[][]> {
  const id = BOOKS[bookIndex]?.id
  if (!id) throw new Error('book')
  const key = `${versionId}:${id}`
  const cached = books.get(key)
  if (cached) return cached
  const chapters = await fetchJson<string[][]>(scriptureUrl(`${versionFolder(versionId)}/${id}.json`))
  books.set(key, chapters)
  return chapters
}

export async function loadVerse(
  versionId: string,
  bookIndex: number,
  chapter: number,
  verse: number,
): Promise<string | null> {
  const chapters = await loadBook(versionId, bookIndex)
  return chapters[chapter - 1]?.[verse - 1] ?? null
}

export async function loadCrossReferences(bookIndex: number): Promise<number[][][][]> {
  const id = BOOKS[bookIndex]?.id
  if (!id) return []
  const cached = xrefs.get(id)
  if (cached) return cached
  const table = await fetchJson<number[][][][]>(scriptureUrl(`xrefs/${id}.json`))
  xrefs.set(id, table)
  return table
}

let parallelTable: Record<string, Record<string, Record<string, number[][]>>> | null = null

async function loadParallelBooks(): Promise<Record<string, Record<string, Record<string, number[][]>>>> {
  if (parallelTable) return parallelTable
  const table = await fetchJson<Record<string, Record<string, Record<string, number[][]>>>>(
    scriptureUrl('parallels.json'),
  )
  parallelTable = table
  return table
}

export type ParallelHit = ScriptureHit & { endVerse: number }

export async function parallelPassages(
  versionId: string,
  passage: PassageRef,
): Promise<ParallelHit[]> {
  const table = await loadParallelBooks()
  const id = BOOKS[passage.bookIndex]?.id
  if (!id) return []
  const refs = table[id]?.[String(passage.chapter)]?.[String(passage.verse)] ?? []
  const rows = await Promise.all(
    refs.map(async ([bookIndex, chapter, verse, endVerse]) => {
      const text = await loadVerse(versionId, bookIndex, chapter, verse)
      if (!text) return null
      return { bookIndex, chapter, verse, endVerse, text }
    }),
  )
  return rows.filter((row): row is ParallelHit => row !== null)
}

const meanings = new Map<string, Record<string, [number, number, string][]>>()

export async function meaningFor(passage: PassageRef): Promise<MeaningHit | null> {
  const id = BOOKS[passage.bookIndex]?.id
  if (!id) return null
  let table = meanings.get(id)
  if (!table) {
    table = await fetchJson<Record<string, [number, number, string][]>>(scriptureUrl(`meaning/${id}.json`))
    meanings.set(id, table)
  }
  return pickMeaning(table[String(passage.chapter)], passage.verse)
}

const lexiconWords = new Map<string, Record<string, Record<string, string[][]>> | null>()
const lexiconDict = new Map<string, Record<string, [string, string, string, string, string[]]>>()
const audienceNotes = new Map<string, string | null>()
const todayNotes = new Map<string, Record<string, Record<string, string>> | null>()

async function loadLexiconBook(bookIndex: number): Promise<Record<string, Record<string, string[][]>> | null> {
  const id = BOOKS[bookIndex]?.id
  if (!id) return null
  if (lexiconWords.has(id)) return lexiconWords.get(id) ?? null
  const table = await fetchOptional<Record<string, Record<string, string[][]>>>(scriptureUrl(`lexicon/words/${id}.json`))
  lexiconWords.set(id, table)
  return table
}

export async function lexiconFor(passage: PassageRef): Promise<LexiconWord[]> {
  const table = await loadLexiconBook(passage.bookIndex)
  const rows = table?.[String(passage.chapter)]?.[String(passage.verse)] ?? []
  return rows.map(wordFromRow).filter((word): word is LexiconWord => word !== null)
}

async function loadLexiconDict(kind: 'greek' | 'hebrew'): Promise<Record<string, [string, string, string, string, string[]]>> {
  const cached = lexiconDict.get(kind)
  if (cached) return cached
  const table = await fetchJson<Record<string, [string, string, string, string, string[]]>>(
    scriptureUrl(`lexicon/${kind}.json`),
  )
  lexiconDict.set(kind, table)
  return table
}

export function peekLexiconEntry(id: string): LexiconEntry | null {
  const kind = id.startsWith('G') ? 'greek' : 'hebrew'
  const table = lexiconDict.get(kind)
  if (!table) return null
  const normalized = normalizeStrong(id) ?? id
  const row = table[normalized] ?? table[baseStrong(normalized)]
  if (!row) return null
  return entryFromRow(normalized, row)
}

export async function lexiconEntry(id: string): Promise<LexiconEntry | null> {
  const normalized = normalizeStrong(id)
  if (!normalized) return null
  const kind = normalized.startsWith('G') ? 'greek' : 'hebrew'
  const table = await loadLexiconDict(kind)
  const row = table[normalized] ?? table[baseStrong(normalized)]
  if (!row) return null
  return entryFromRow(normalized, row)
}

export async function audienceFor(passage: PassageRef): Promise<string | null> {
  const id = BOOKS[passage.bookIndex]?.id
  if (!id) return null
  if (audienceNotes.has(id)) return audienceNotes.get(id) ?? null
  const table = await fetchOptional<{ book?: string }>(scriptureUrl(`study/then/${id}.json`))
  const note = table?.book?.trim() || null
  audienceNotes.set(id, note)
  return note
}

export async function todayFor(passage: PassageRef): Promise<string | null> {
  const id = BOOKS[passage.bookIndex]?.id
  if (!id) return null
  if (!todayNotes.has(id)) {
    const table = await fetchOptional<Record<string, Record<string, string>>>(scriptureUrl(`study/today/${id}.json`))
    todayNotes.set(id, table)
  }
  const text = todayNotes.get(id)?.[String(passage.chapter)]?.[String(passage.verse)]?.trim()
  return text || null
}

export async function relatedPassages(
  versionId: string,
  passage: PassageRef,
): Promise<ScriptureHit[]> {
  const table = await loadCrossReferences(passage.bookIndex)
  const refs = table[passage.chapter - 1]?.[passage.verse - 1] ?? []
  const rows = await Promise.all(
    refs.map(async ([bookIndex, chapter, verse]) => {
      const text = await loadVerse(versionId, bookIndex, chapter, verse)
      if (!text) return null
      return { bookIndex, chapter, verse, text }
    }),
  )
  return rows.filter((row): row is ScriptureHit => row !== null)
}

export async function searchScripture(
  versionId: string,
  query: string,
  limit = 24,
): Promise<ScriptureHit[]> {
  const tokens = fold(query)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1)
  if (tokens.length === 0) return []
  const loaded = await Promise.all(BOOKS.map((_, index) => loadBook(versionId, index)))
  const hits: ScriptureHit[] = []
  for (let bookIndex = 0; bookIndex < loaded.length; bookIndex += 1) {
    const chapters = loaded[bookIndex]
    for (let chapter = 0; chapter < chapters.length; chapter += 1) {
      const verses = chapters[chapter]
      for (let verse = 0; verse < verses.length; verse += 1) {
        const text = verses[verse]
        const haystack = fold(text)
        if (!tokens.every((token) => haystack.includes(token))) continue
        hits.push({ bookIndex, chapter: chapter + 1, verse: verse + 1, text })
        if (hits.length >= limit) return hits
      }
    }
  }
  return hits
}
