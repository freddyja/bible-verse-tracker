import type { Verse } from './types'
import { parseReference, samePassage, type PassageRef } from '../scripture/passages'

/** The shelf copy of this passage, when he has already kept it. */
export function verseForPassage(verses: readonly Verse[], passage: PassageRef): Verse | undefined {
  return verses.find((verse) => {
    if (
      verse.passage &&
      verse.passage.bookIndex === passage.bookIndex &&
      verse.passage.chapter === passage.chapter &&
      verse.passage.verse === passage.verse
    ) {
      return true
    }
    const parsed = parseReference(verse.reference)
    return parsed ? samePassage(parsed, passage) : false
  })
}
