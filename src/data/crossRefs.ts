import { parseReference, samePassage, type PassageRef } from './passages'

/**
 * A short local list of passages often read beside one another.
 * References only — no commentary, and only verses this shelf already knows.
 */
const CROSS_REFERENCES: { from: PassageRef; to: PassageRef[] }[] = [
  {
    from: { book: 'psalm', chapter: 23, verse: 1 },
    to: [
      { book: 'john', chapter: 10, verse: 11 },
      { book: 'isaiah', chapter: 40, verse: 11 },
      { book: 'psalm', chapter: 80, verse: 1 },
      { book: 'revelation', chapter: 7, verse: 17 },
    ],
  },
  {
    from: { book: 'joshua', chapter: 1, verse: 9 },
    to: [
      { book: 'deuteronomy', chapter: 31, verse: 6 },
      { book: 'isaiah', chapter: 41, verse: 10 },
      { book: 'matthew', chapter: 28, verse: 20 },
    ],
  },
  {
    from: { book: 'ephesians', chapter: 5, verse: 25 },
    to: [
      { book: 'colossians', chapter: 3, verse: 19 },
      { book: 'ephesians', chapter: 5, verse: 2 },
      { book: '1peter', chapter: 3, verse: 7 },
    ],
  },
  {
    from: { book: 'john', chapter: 3, verse: 16 },
    to: [
      { book: 'romans', chapter: 5, verse: 8 },
      { book: '1john', chapter: 4, verse: 9 },
      { book: 'john', chapter: 3, verse: 17 },
    ],
  },
  {
    from: { book: 'micah', chapter: 6, verse: 8 },
    to: [
      { book: 'deuteronomy', chapter: 10, verse: 12 },
      { book: 'hosea', chapter: 6, verse: 6 },
      { book: 'zechariah', chapter: 7, verse: 9 },
    ],
  },
]

const MAX_CROSS_REFERENCES = 5

export function crossReferencesFor(reference: string): PassageRef[] {
  const parsed = parseReference(reference)
  if (!parsed) return []
  const entry = CROSS_REFERENCES.find((item) => samePassage(item.from, parsed))
  if (!entry) return []
  return entry.to.filter((item) => !samePassage(item, parsed)).slice(0, MAX_CROSS_REFERENCES)
}
