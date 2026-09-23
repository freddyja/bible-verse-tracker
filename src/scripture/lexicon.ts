export type LexiconWord = {
  surface: string
  transliteration: string
  strong: string
  gloss: string
  aramaic: boolean
}

export type LexiconEntry = {
  id: string
  lemma: string
  transliteration: string
  gloss: string
  definition: string
  related: string[]
}

export function normalizeStrong(raw: string): string | null {
  const match = raw.toUpperCase().match(/([GH])0*(\d+)([A-Z]?)/)
  if (!match) return null
  const n = Number(match[2])
  if (!Number.isInteger(n) || n <= 0) return null
  return `${match[1]}${n}${match[3]}`
}

export function baseStrong(id: string): string {
  return id.replace(/[A-Z]+$/, '')
}

export function wordFromRow(row: readonly string[]): LexiconWord | null {
  const surface = row[0]?.trim() ?? ''
  const strong = row[2] ? normalizeStrong(row[2]) : null
  if (!surface || !strong) return null
  return {
    surface,
    transliteration: row[1]?.trim() ?? '',
    strong,
    gloss: row[3]?.trim() ?? '',
    aramaic: row[4] === 'a',
  }
}

export function entryFromRow(id: string, row: readonly [string, string, string, string, string[]] | readonly string[]): LexiconEntry | null {
  const lemma = String(row[0] ?? '').trim()
  const gloss = String(row[2] ?? '').trim()
  if (!lemma && !gloss) return null
  const related = Array.isArray(row[4]) ? row[4].filter((item) => typeof item === 'string') : []
  return {
    id,
    lemma,
    transliteration: String(row[1] ?? '').trim(),
    gloss,
    definition: String(row[3] ?? '').trim() || gloss,
    related,
  }
}
