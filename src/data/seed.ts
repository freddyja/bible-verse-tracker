import type { Category, Verse } from './types'

const seededAt = Date.UTC(2026, 0, 1)

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-comfort',
    name: 'Comfort',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'cat-courage',
    name: 'Courage',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'cat-marriage',
    name: 'Marriage',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 'cat-leadership',
    name: 'Leadership',
    createdAt: seededAt,
    updatedAt: seededAt,
  },
]

/**
 * Public-domain KJV wording, with sample notes Freddy can edit or delete.
 * Fixed ids so a refresh during first launch cannot duplicate them.
 */
export const SEED_VERSES: Verse[] = [
  {
    id: 'verse-psalm-23-1',
    reference: 'Psalm 23:1',
    text: 'The LORD is my shepherd; I shall not want.',
    note: 'A reminder that I am looked after, even when I cannot see the next step.',
    categoryIds: ['cat-comfort'],
    passage: { bookIndex: 18, chapter: 23, verse: 1 },
    createdAt: seededAt + 3,
    updatedAt: seededAt + 3,
  },
  {
    id: 'verse-joshua-1-9',
    reference: 'Joshua 1:9',
    text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    note: 'When the work feels bigger than I am, courage is a command, not a mood.',
    categoryIds: ['cat-courage', 'cat-leadership'],
    passage: { bookIndex: 5, chapter: 1, verse: 9 },
    createdAt: seededAt + 2,
    updatedAt: seededAt + 2,
  },
  {
    id: 'verse-ephesians-5-25',
    reference: 'Ephesians 5:25',
    text: 'Husbands, love your wives, even as Christ also loved the church, and gave himself for it;',
    note: 'Love that costs something. A standard I want to keep returning to.',
    categoryIds: ['cat-marriage'],
    passage: { bookIndex: 48, chapter: 5, verse: 25 },
    createdAt: seededAt + 1,
    updatedAt: seededAt + 1,
  },
]
