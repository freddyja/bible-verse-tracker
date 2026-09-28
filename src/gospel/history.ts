import type { GospelAnswer, GospelKind, GospelTurn, GospelVerse } from './types'

const STORAGE_KEY = 'bible-verse-tracker.gospel'
const TURN_LIMIT = 30

const KINDS = new Set<GospelKind>(['scripture', 'passage', 'care', 'refuse', 'fallback'])

function isVerse(value: unknown): value is GospelVerse {
  if (!value || typeof value !== 'object') return false
  const row = value as GospelVerse
  return (
    typeof row.reference === 'string' &&
    typeof row.version === 'string' &&
    typeof row.text === 'string' &&
    Number.isInteger(row.bookIndex) &&
    Number.isInteger(row.chapter) &&
    Number.isInteger(row.verse)
  )
}

function isAnswer(value: unknown): value is GospelAnswer {
  if (!value || typeof value !== 'object') return false
  const row = value as GospelAnswer
  return (
    KINDS.has(row.kind) &&
    typeof row.intro === 'string' &&
    typeof row.closing === 'string' &&
    Array.isArray(row.verses) &&
    row.verses.every(isVerse)
  )
}

function isTurn(value: unknown): value is GospelTurn {
  if (!value || typeof value !== 'object') return false
  const row = value as GospelTurn
  return typeof row.id === 'string' && typeof row.question === 'string' && typeof row.at === 'number' && isAnswer(row.answer)
}

export function loadGospelTurns(): GospelTurn[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isTurn).slice(-TURN_LIMIT)
  } catch {
    return []
  }
}

export function saveGospelTurns(turns: readonly GospelTurn[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(turns.slice(-TURN_LIMIT)))
  } catch {
    // A full disk should not block the answer already on screen.
  }
}
