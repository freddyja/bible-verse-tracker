import { BOOKS } from '../scripture/books.ts'
import { matchBook, normalizeReference, parseReference, type PassageRef } from '../scripture/passages.ts'
import { normalizeQuestion } from './text.ts'

const BOOK_PREFIX =
  /^(?:gospel of|gospel according to|evangelio de|evangelio segun|evangelho de|evangelho segundo|book of|libro de|livro de)\s+/

/**
 * A verse cited inside a longer question.
 * "John 3:16", "Juan 3:16", "João 3,16", and "what does 1 John 4:8 mean" all count.
 */
export function findReference(value: string): PassageRef | null {
  const prepared = value.replace(/(\d)\s*[.,]\s*(\d)/g, '$1:$2')
  const direct = parseReference(prepared)
  if (direct) return direct
  const normalized = normalizeReference(prepared)
  const pattern = /(\d+):(\d+)/g
  let match: RegExpExecArray | null
  while ((match = pattern.exec(normalized))) {
    const words = normalized.slice(0, match.index).trim().split(' ').filter(Boolean).slice(-6)
    for (let size = words.length; size >= 1; size -= 1) {
      const hit = parseReference(`${words.slice(-size).join(' ')} ${match[1]}:${match[2]}`)
      if (hit) return hit
    }
  }
  return null
}

/** The whole question names a book, or "Gospel of John" and the same shape in Spanish and Portuguese. */
export function findBookQuery(value: string): number | null {
  const direct = matchBook(value)
  if (direct !== null) return direct
  const normalized = normalizeQuestion(value)
  const stripped = normalized.replace(BOOK_PREFIX, '')
  if (stripped === normalized) return null
  return matchBook(stripped)
}

export function bookIdIndex(bookId: string): number {
  return BOOKS.findIndex((book) => book.id === bookId)
}
