import { loadBook, peekBook } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import type { PassageRef } from '../scripture/passages'

export type ListenMode = 'verse' | 'chapter' | 'continue'

function afterLoaded(
  chapters: string[][],
  passage: PassageRef,
  mode: ListenMode,
): PassageRef | null {
  const verseCount = chapters[passage.chapter - 1]?.length ?? 0
  if (passage.verse < verseCount) {
    return { bookIndex: passage.bookIndex, chapter: passage.chapter, verse: passage.verse + 1 }
  }
  if (mode === 'chapter') return null

  const book = BOOKS[passage.bookIndex]
  if (!book) return null
  if (passage.chapter < book.chapters) {
    return { bookIndex: passage.bookIndex, chapter: passage.chapter + 1, verse: 1 }
  }
  if (passage.bookIndex < BOOKS.length - 1) {
    return { bookIndex: passage.bookIndex + 1, chapter: 1, verse: 1 }
  }
  return null
}

/**
 * The next verse when this book is already in memory.
 * Undefined means the chapter text still has to load.
 * Null means this mode should stop.
 */
export function passageAfterSync(
  versionId: string,
  passage: PassageRef,
  mode: ListenMode,
): PassageRef | null | undefined {
  if (mode === 'verse') return null
  const chapters = peekBook(versionId, passage.bookIndex)
  if (!chapters) return undefined
  return afterLoaded(chapters, passage, mode)
}

/** The next verse to read, or null when this mode should stop. */
export async function passageAfter(
  versionId: string,
  passage: PassageRef,
  mode: ListenMode,
): Promise<PassageRef | null> {
  if (mode === 'verse') return null
  const chapters = await loadBook(versionId, passage.bookIndex)
  return afterLoaded(chapters, passage, mode)
}
