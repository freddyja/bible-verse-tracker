import { BOOKS } from './books'

/** The next or previous chapter, crossing into the neighboring book. */
export function chapterStep(
  bookIndex: number,
  chapter: number,
  direction: 1 | -1,
): { bookIndex: number; chapter: number } | null {
  const book = BOOKS[bookIndex]
  if (!book) return null
  const nextChapter = chapter + direction
  if (nextChapter >= 1 && nextChapter <= book.chapters) {
    return { bookIndex, chapter: nextChapter }
  }
  const nextBook = bookIndex + direction
  if (nextBook < 0 || nextBook >= BOOKS.length) return null
  return {
    bookIndex: nextBook,
    chapter: direction === 1 ? 1 : BOOKS[nextBook].chapters,
  }
}
