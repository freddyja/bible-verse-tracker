import { BOOKS } from './books'
import { fold, type PassageRef } from './passages'
import { versionById } from './versions'

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
