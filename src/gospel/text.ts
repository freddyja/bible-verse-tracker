import { fold } from '../scripture/passages.ts'

/** Lowercase, strip accents, and collapse punctuation so English, Spanish, and Portuguese match the same way. */
export function normalizeQuestion(value: string): string {
  return fold(value)
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
