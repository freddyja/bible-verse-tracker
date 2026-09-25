import { BOOKS } from './books'

type DailyPick = {
  bookId: string
  chapter: number
  verse: number
}

/** Encouraging passages. The same calendar day always chooses the same one. */
const DAILY: readonly DailyPick[] = [
  { bookId: 'jos', chapter: 1, verse: 9 },
  { bookId: 'psa', chapter: 23, verse: 1 },
  { bookId: 'psa', chapter: 27, verse: 1 },
  { bookId: 'psa', chapter: 34, verse: 8 },
  { bookId: 'psa', chapter: 46, verse: 1 },
  { bookId: 'psa', chapter: 55, verse: 22 },
  { bookId: 'psa', chapter: 91, verse: 1 },
  { bookId: 'psa', chapter: 118, verse: 24 },
  { bookId: 'psa', chapter: 119, verse: 105 },
  { bookId: 'psa', chapter: 121, verse: 1 },
  { bookId: 'pro', chapter: 3, verse: 5 },
  { bookId: 'pro', chapter: 3, verse: 6 },
  { bookId: 'isa', chapter: 26, verse: 3 },
  { bookId: 'isa', chapter: 40, verse: 31 },
  { bookId: 'isa', chapter: 41, verse: 10 },
  { bookId: 'jer', chapter: 29, verse: 11 },
  { bookId: 'lam', chapter: 3, verse: 22 },
  { bookId: 'mic', chapter: 6, verse: 8 },
  { bookId: 'zep', chapter: 3, verse: 17 },
  { bookId: 'mat', chapter: 5, verse: 16 },
  { bookId: 'mat', chapter: 6, verse: 33 },
  { bookId: 'mat', chapter: 11, verse: 28 },
  { bookId: 'jhn', chapter: 3, verse: 16 },
  { bookId: 'jhn', chapter: 8, verse: 12 },
  { bookId: 'jhn', chapter: 14, verse: 6 },
  { bookId: 'jhn', chapter: 14, verse: 27 },
  { bookId: 'jhn', chapter: 15, verse: 5 },
  { bookId: 'jhn', chapter: 16, verse: 33 },
  { bookId: 'rom', chapter: 8, verse: 28 },
  { bookId: 'rom', chapter: 15, verse: 13 },
  { bookId: '2co', chapter: 5, verse: 17 },
  { bookId: '2co', chapter: 12, verse: 9 },
  { bookId: 'gal', chapter: 2, verse: 20 },
  { bookId: 'eph', chapter: 2, verse: 8 },
  { bookId: 'php', chapter: 4, verse: 6 },
  { bookId: 'php', chapter: 4, verse: 7 },
  { bookId: 'php', chapter: 4, verse: 13 },
  { bookId: 'php', chapter: 4, verse: 19 },
  { bookId: 'col', chapter: 3, verse: 15 },
  { bookId: '2ti', chapter: 1, verse: 7 },
  { bookId: 'heb', chapter: 11, verse: 1 },
  { bookId: 'heb', chapter: 13, verse: 8 },
  { bookId: 'jas', chapter: 1, verse: 17 },
  { bookId: '1pe', chapter: 5, verse: 7 },
  { bookId: '1jn', chapter: 4, verse: 19 },
  { bookId: 'rev', chapter: 21, verse: 4 },
]

/** Original photographs made for this app. */
const PHOTOS = ['harbor.jpg', 'lake.jpg', 'canyon.jpg', 'sea.jpg', 'forest.jpg', 'hills.jpg'] as const

export type DailyPassage = {
  bookIndex: number
  chapter: number
  verse: number
}

/** A stable day count from the local calendar date. */
export function localDayNumber(date = new Date()): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)
}

export function dailyVerse(date = new Date()): DailyPassage {
  const pick = DAILY[localDayNumber(date) % DAILY.length]
  const bookIndex = BOOKS.findIndex((book) => book.id === pick.bookId)
  return { bookIndex, chapter: pick.chapter, verse: pick.verse }
}

export function dailyPhoto(date = new Date()): string {
  return PHOTOS[localDayNumber(date) % PHOTOS.length]
}

/** A local calendar date that many days before `from`. */
export function daysAgo(offset: number, from = new Date()): Date {
  return new Date(from.getFullYear(), from.getMonth(), from.getDate() - offset)
}

export function greetingKey(date = new Date()): 'greetingMorning' | 'greetingAfternoon' | 'greetingEvening' {
  const hour = date.getHours()
  if (hour < 12) return 'greetingMorning'
  if (hour < 17) return 'greetingAfternoon'
  return 'greetingEvening'
}

const namedGreeting = {
  greetingMorning: 'greetingMorningNamed',
  greetingAfternoon: 'greetingAfternoonNamed',
  greetingEvening: 'greetingEveningNamed',
} as const

export function namedGreetingKey(date = new Date()) {
  return namedGreeting[greetingKey(date)]
}
