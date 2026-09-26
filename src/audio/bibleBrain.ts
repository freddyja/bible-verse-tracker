import type { Language } from '../i18n/messages'
import { BOOKS } from '../scripture/books.ts'
import type { ListenMode } from '../speech/passageQueue'

/**
 * Faith Comes By Hearing Bible Brain (DBP v4).
 * The key is read from VITE_BIBLE_BRAIN_KEY at build time. Requests send only
 * a book and chapter — never note text, study text, or typed verse words.
 * Commercial audio (NIV, ESV, and the other names below) is never requested.
 */

const API = 'https://4.dbt.io/api'
const CHAPTER_TTL_MS = 20 * 60 * 1000

const ISO: Record<Language, string> = {
  en: 'eng',
  es: 'spa',
  pt: 'por',
}

export type VerseMark = {
  verse: number
  start: number
}

export type RecordedClip = {
  url: string
  verseStart: number
  verseEnd: number
}

export type RecordedChapter = {
  filesetId: string
  label: string
  bookIndex: number
  chapter: number
  clips: RecordedClip[]
  marks: VerseMark[]
}

export type PlaybackSlice = {
  url: string
  start: number
  end: number | null
  verse: number
}

export type RecordedLookup =
  | { kind: 'ready'; chapter: RecordedChapter }
  | { kind: 'absent'; reason: 'none' | 'offline' | 'denied' }

type AudioFileset = {
  id: string
  type: string
  size: string
}

type Candidate = {
  abbr: string
  name: string
  label: string
  rank: number
  filesets: AudioFileset[]
}

type CacheEntry = {
  at: number
  value: RecordedLookup
}

class BrainRequestError extends Error {
  reason: 'none' | 'offline' | 'denied'

  constructor(reason: 'none' | 'offline' | 'denied') {
    super(reason)
    this.reason = reason
  }
}

const catalogCache = new Map<Language, Promise<Candidate[]>>()
const catalogDirect = new Map<Language, boolean>()
const chapterCache = new Map<string, CacheEntry>()
const chapterInflight = new Map<string, Promise<RecordedLookup>>()

export function bibleBrainKey(): string {
  try {
    const raw = import.meta.env?.VITE_BIBLE_BRAIN_KEY
    return typeof raw === 'string' ? raw.trim() : ''
  } catch {
    return ''
  }
}

export function bibleBrainConfigured(): boolean {
  return bibleBrainKey().length > 0
}

export function bibleRank(language: Language, abbr: string, name: string): number | null {
  const version = abbr.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(3)
  const blob = `${abbr} ${name}`
  if (isDenied(version, blob)) return null
  if (language === 'en') return englishRank(version, name)
  if (language === 'es') return spanishRank(version, blob)
  return portugueseRank(version, blob)
}

export function selectAudioFilesets(
  filesets: readonly AudioFileset[],
  testament: 'ot' | 'nt',
): AudioFileset[] {
  return filesets
    .map((fileset) => ({ fileset, score: filesetScore(fileset, testament) }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score || a.fileset.id.localeCompare(b.fileset.id))
    .map((item) => item.fileset)
}

export function parseChapterClips(payload: unknown): RecordedClip[] {
  const clips: RecordedClip[] = []
  for (const item of extractRecords(payload)) {
    const url = firstUrl(item)
    if (!url) continue
    const verseStart = parseVerse(item.verse_start ?? item.verse_start_alt ?? item.verse_sequence) ?? 1
    const verseEnd = parseVerse(item.verse_end ?? item.verse_end_alt) ?? verseStart
    clips.push({
      url,
      verseStart,
      verseEnd: Math.max(verseStart, verseEnd),
    })
  }
  clips.sort((a, b) => a.verseStart - b.verseStart || a.verseEnd - b.verseEnd)
  return clips
}

export function parseTimestamps(payload: unknown): VerseMark[] {
  const marks: VerseMark[] = []
  for (const item of extractRecords(payload)) {
    const verse = parseVerse(item.verse_start ?? item.verse_sequence ?? item.verse)
    const start = parseSeconds(item.timestamp ?? item.start)
    if (verse == null || start == null) continue
    marks.push({ verse, start })
  }
  marks.sort((a, b) => a.start - b.start || a.verse - b.verse)
  const seen = new Set<number>()
  return marks.filter((mark) => {
    if (seen.has(mark.verse)) return false
    seen.add(mark.verse)
    return true
  })
}

export function verseWindow(
  marks: readonly VerseMark[],
  verse: number,
): { start: number; end: number | null } | null {
  const index = marks.findIndex((mark) => mark.verse === verse)
  if (index < 0) return null
  const next = marks[index + 1]
  return { start: marks[index].start, end: next ? next.start : null }
}

export function verseAtTime(time: number, marks: readonly VerseMark[]): number | null {
  let verse: number | null = null
  for (const mark of marks) {
    if (mark.start <= time + 0.08) verse = mark.verse
    else break
  }
  return verse
}

/** How to play this chapter. Null means this mode cannot be isolated in the recording. */
export function playbackQueue(
  chapter: RecordedChapter,
  mode: ListenMode,
  verse: number,
): PlaybackSlice[] | null {
  if (chapter.clips.length === 0) return null
  if (chapter.clips.length === 1) {
    const clip = chapter.clips[0]
    if (mode === 'verse') {
      const window = verseWindow(chapter.marks, verse)
      if (!window) return null
      return [{ url: clip.url, start: window.start, end: window.end, verse }]
    }
    return [{ url: clip.url, start: 0, end: null, verse }]
  }

  if (mode === 'verse') {
    const clip = chapter.clips.find((item) => verse >= item.verseStart && verse <= item.verseEnd)
    if (!clip) return null
    if (clip.verseStart === clip.verseEnd) {
      return [{ url: clip.url, start: 0, end: null, verse }]
    }
    const window = verseWindow(chapter.marks, verse)
    if (!window) return null
    return [{ url: clip.url, start: window.start, end: window.end, verse }]
  }

  const clips = chapter.clips.filter((item) => item.verseEnd >= verse)
  if (clips.length === 0) return null
  return clips.map((clip) => ({
    url: clip.url,
    start: 0,
    end: null,
    verse: Math.max(verse, clip.verseStart),
  }))
}

export function lookupRecordedChapter(
  language: Language,
  bookIndex: number,
  chapter: number,
): Promise<RecordedLookup> {
  if (!bibleBrainConfigured()) return Promise.resolve({ kind: 'absent', reason: 'denied' })
  const book = BOOKS[bookIndex]
  if (!book || chapter < 1 || chapter > book.chapters) {
    return Promise.resolve({ kind: 'absent', reason: 'none' })
  }
  const key = `${language}:${bookIndex}:${chapter}`
  const cached = chapterCache.get(key)
  if (cached && Date.now() - cached.at < CHAPTER_TTL_MS) return Promise.resolve(cached.value)
  const pending = chapterInflight.get(key)
  if (pending) return pending
  const promise = fetchRecordedChapter(language, bookIndex, chapter)
    .then((value) => {
      chapterInflight.delete(key)
      if (value.kind === 'ready' || value.reason === 'none') {
        chapterCache.set(key, { at: Date.now(), value })
      }
      return value
    })
    .catch((error: unknown) => {
      chapterInflight.delete(key)
      const reason = error instanceof BrainRequestError ? error.reason : 'offline'
      return { kind: 'absent' as const, reason }
    })
  chapterInflight.set(key, promise)
  return promise
}

async function fetchRecordedChapter(
  language: Language,
  bookIndex: number,
  chapter: number,
): Promise<RecordedLookup> {
  const book = BOOKS[bookIndex]
  if (!book) return { kind: 'absent', reason: 'none' }
  const candidates = await loadCandidates(language)
  let chapterAudio = await firstPlayable(candidates, book.testament, book.id, bookIndex, chapter)
  if (!chapterAudio && catalogDirect.get(language)) {
    catalogDirect.set(language, false)
    const more = (await searchCatalog(language)).filter(
      (candidate) => !candidates.some((current) => current.abbr === candidate.abbr),
    )
    const merged = [...candidates, ...more].sort((a, b) => a.rank - b.rank || a.abbr.localeCompare(b.abbr))
    catalogCache.set(language, Promise.resolve(merged))
    chapterAudio = await firstPlayable(merged, book.testament, book.id, bookIndex, chapter)
  }
  if (!chapterAudio) return { kind: 'absent', reason: 'none' }
  return { kind: 'ready', chapter: chapterAudio }
}

async function firstPlayable(
  candidates: readonly Candidate[],
  testament: 'ot' | 'nt',
  bookId: string,
  bookIndex: number,
  chapter: number,
): Promise<RecordedChapter | null> {
  const book = bookId.toUpperCase()
  for (const candidate of candidates) {
    const filesets = selectAudioFilesets(candidate.filesets, testament).slice(0, 3)
    for (const fileset of filesets) {
      const clips = await loadClips(fileset.id, book, chapter)
      if (clips.length === 0) continue
      const marks = clips.length === 1 ? await loadMarks(fileset.id, book, chapter) : []
      return {
        filesetId: fileset.id,
        label: candidate.label,
        bookIndex,
        chapter,
        clips,
        marks,
      }
    }
  }
  return null
}

async function loadClips(filesetId: string, book: string, chapter: number): Promise<RecordedClip[]> {
  try {
    const payload = await getJson(`/bibles/filesets/${encodeURIComponent(filesetId)}/${book}/${chapter}`, {})
    return parseChapterClips(payload)
  } catch (error) {
    if (error instanceof BrainRequestError && error.reason === 'none') return []
    throw error
  }
}

async function loadMarks(filesetId: string, book: string, chapter: number): Promise<VerseMark[]> {
  try {
    const payload = await getJson(`/timestamps/${encodeURIComponent(filesetId)}/${book}/${chapter}`, {})
    return parseTimestamps(payload)
  } catch {
    return []
  }
}

function loadCandidates(language: Language): Promise<Candidate[]> {
  const cached = catalogCache.get(language)
  if (cached) return cached
  const pending = resolveCandidates(language).catch((error: unknown) => {
    catalogCache.delete(language)
    throw error
  })
  catalogCache.set(language, pending)
  return pending
}

async function resolveCandidates(language: Language): Promise<Candidate[]> {
  if (language === 'en') {
    const kjv = await loadBible('ENGKJV')
    if (kjv && bibleRank('en', kjv.abbr, kjv.name) === 0 && kjv.filesets.length > 0) {
      catalogDirect.set(language, true)
      return [kjv]
    }
  }
  catalogDirect.set(language, false)
  return searchCatalog(language)
}

async function loadBible(id: string): Promise<Candidate | null> {
  try {
    const payload = await getJson(`/bibles/${encodeURIComponent(id)}`, {})
    const row = extractBibleRows(payload)[0]
    if (!row) return null
    return toCandidate('en', row)
  } catch (error) {
    if (error instanceof BrainRequestError && error.reason === 'none') return null
    throw error
  }
}

async function searchCatalog(language: Language): Promise<Candidate[]> {
  const found: Candidate[] = []
  let page = 1
  let total = 1
  while (page <= total && page <= 6) {
    const payload = await getJson('/bibles', {
      language_code: ISO[language],
      media: 'audio',
      limit: '100',
      page: String(page),
    })
    for (const row of extractBibleRows(payload)) {
      const candidate = toCandidate(language, row)
      if (candidate) found.push(candidate)
    }
    total = readTotalPages(payload)
    page += 1
  }
  found.sort((a, b) => a.rank - b.rank || a.abbr.localeCompare(b.abbr))
  return found
}

function toCandidate(
  language: Language,
  row: { abbr: string; name: string; filesets: unknown },
): Candidate | null {
  const rank = bibleRank(language, row.abbr, row.name)
  if (rank == null) return null
  const filesets = collectFilesets(row.filesets)
  if (filesets.length === 0) return null
  return {
    abbr: row.abbr,
    name: row.name,
    label: displayLabel(row.abbr, row.name),
    rank,
    filesets,
  }
}

function displayLabel(abbr: string, name: string): string {
  const version = abbr.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(3)
  if (version.startsWith('KJV') || /king james/i.test(name)) return 'King James Version'
  const trimmed = name.trim()
  return trimmed || abbr
}

async function getJson(path: string, params: Record<string, string>): Promise<unknown> {
  const key = bibleBrainKey()
  if (!key) throw new BrainRequestError('denied')
  const url = new URL(`${API}${path}`)
  url.searchParams.set('v', '4')
  url.searchParams.set('key', key)
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, value)
  let response: Response
  try {
    response = await fetch(url)
  } catch {
    throw new BrainRequestError('offline')
  }
  if (response.status === 401 || response.status === 403 || response.status === 422) {
    throw new BrainRequestError('denied')
  }
  if (response.status === 404) throw new BrainRequestError('none')
  if (!response.ok) throw new BrainRequestError('offline')
  try {
    return await response.json()
  } catch {
    throw new BrainRequestError('offline')
  }
}

function isDenied(version: string, blob: string): boolean {
  if (
    /^(NIV|ESV|NKJ|NKJV|NLT|NAS|NASB|CSB|NRS|NRSV|RSV|NVI|NVT|NAA|NTL|NTLH|TLA|MSG|AMP|GNT|CEV|NIR|NIRV|R60|RV60|RVR60|NTV|NAB|NJB|NET)$/.test(
      version,
    )
  ) {
    return true
  }
  if (/(NIV|ESV|NKJV|NLT|NASB|NVI|NVT)/.test(version)) return true
  return /new international|english standard|nueva versi[oó]n internacional|nova vers[aã]o internacional|new king james|reina[- ]valera 1960|\b1960\b|nueva traducci[oó]n viviente|nova vers[aã]o transformadora|nova almeida/i.test(
    blob,
  )
}

function englishRank(version: string, name: string): number | null {
  const folded = name.toLowerCase()
  if (version.startsWith('KJV') || (folded.includes('king james') && !folded.includes('new'))) return 0
  if (version === 'WEB' || folded.includes('world english bible')) return 1
  if (version === 'ASV' || (folded.includes('american standard') && !folded.includes('new'))) return 2
  if (version === 'GNV' || folded.includes('geneva')) return 3
  if (version === 'YLT' || /young.?s literal/.test(folded)) return 4
  return null
}

function spanishRank(version: string, blob: string): number | null {
  const folded = blob.toLowerCase()
  const reina = /reina|valera/.test(folded)
  if (!reina && !/1909|1865/.test(folded) && !/1909|1865/.test(version)) return null
  if (/1909/.test(folded) || /1909/.test(version) || version === 'R09' || version.endsWith('R09')) return 0
  if (/1865/.test(folded) || /1865/.test(version)) return 1
  return null
}

function portugueseRank(version: string, blob: string): number | null {
  const folded = blob.toLowerCase()
  if (/b[ií]blia livre|acesso livre/.test(folded) || version.includes('BLV')) return 0
  if (/dom[ií]nio p[uú]blico/.test(folded)) return 1
  return null
}

function filesetAllowed(id: string): boolean {
  const version = id.toUpperCase().slice(3)
  return !/(NIV|ESV|NKJV|NLT|NASB|NVI|NVT)/.test(version)
}

function sizeCovers(size: string, testament: 'ot' | 'nt'): boolean {
  const code = size.toUpperCase().replace(/[^A-Z]/g, '')
  if (!code) return true
  if (code === 'C' || code === 'COMPLETE') return true
  if (testament === 'nt') return code.includes('NT') || code === 'N' || code === 'P'
  return code.includes('OT') || code === 'O' || code === 'P'
}

function filesetScore(fileset: AudioFileset, testament: 'ot' | 'nt'): number {
  if (!fileset.id || !filesetAllowed(fileset.id)) return -1
  if (!sizeCovers(fileset.size, testament)) return -1
  const type = fileset.type.toLowerCase()
  if (!type.startsWith('audio') || type.includes('video')) return -1
  let score = type === 'audio_drama' ? 50 : type === 'audio' ? 40 : type === 'audio_stream' ? 10 : 20
  const id = fileset.id.toUpperCase()
  if (id.includes('OPUS') || id.includes('HLS')) score -= 15
  if (id.includes('DA')) score += 8
  const size = fileset.size.toUpperCase()
  if (size === 'C') score += 6
  else if (size === 'NT' || size === 'OT') score += 4
  return score
}

function collectFilesets(value: unknown): AudioFileset[] {
  const found: AudioFileset[] = []
  const buckets = Array.isArray(value)
    ? value
    : value && typeof value === 'object'
      ? Object.values(value)
      : []
  for (const bucket of buckets) {
    const items = Array.isArray(bucket) ? bucket : [bucket]
    for (const item of items) {
      const record = asRecord(item)
      if (!record) continue
      const id = stringOf(record.id)
      if (!id) continue
      const type = (stringOf(record.type ?? record.set_type_code) ?? '').toLowerCase()
      if (!type.startsWith('audio')) continue
      const size = (stringOf(record.size ?? record.set_size_code) ?? '').toUpperCase()
      found.push({ id, type, size })
    }
  }
  return found
}

function extractBibleRows(payload: unknown): { abbr: string; name: string; filesets: unknown }[] {
  const records = extractRecords(payload)
  const rows = records.length > 0 ? records : asRecord(payload) ? [asRecord(payload)!] : []
  const parsed: { abbr: string; name: string; filesets: unknown }[] = []
  for (const row of rows) {
    const abbr = stringOf(row.abbr ?? row.id)
    if (!abbr) continue
    const name = stringOf(row.name ?? row.vname) ?? ''
    parsed.push({ abbr, name, filesets: row.filesets })
  }
  return parsed
}

function extractRecords(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) return payload.filter(isRecord)
  const record = asRecord(payload)
  if (!record) return []
  if (Array.isArray(record.data)) return record.data.filter(isRecord)
  const nested = asRecord(record.data)
  if (nested && Array.isArray(nested.data)) return nested.data.filter(isRecord)
  if (nested && (nested.path || nested.abbr || nested.verse_start || nested.timestamp)) return [nested]
  if (record.path || record.abbr || record.verse_start || record.timestamp) return [record]
  return []
}

function readTotalPages(payload: unknown): number {
  const record = asRecord(payload)
  const meta = asRecord(record?.meta)
  const pagination = asRecord(meta?.pagination)
  const total = pagination?.total_pages
  return typeof total === 'number' && total >= 1 ? total : 1
}

function firstUrl(item: Record<string, unknown>): string | null {
  return (
    absoluteMediaUrl(item.path) ??
    absoluteMediaUrl(item.url) ??
    absoluteMediaUrl(item.file_name) ??
    absoluteMediaUrl(item.src) ??
    absoluteMediaUrl(item.resourceUrl)
  )
}

function absoluteMediaUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!/^https?:\/\//i.test(trimmed)) return null
  return trimmed
}

function parseVerse(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(1, Math.floor(value))
  if (typeof value === 'string') {
    const match = value.match(/\d+/)
    if (!match) return null
    return Math.max(1, Number(match[0]))
  }
  return null
}

function parseSeconds(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed) && parsed >= 0) return parsed
  }
  return null
}

function stringOf(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed || null
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return asRecord(value) !== null
}
