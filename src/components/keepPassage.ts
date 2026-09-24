import { verseForPassage } from '../data/matchVerse'
import type { PassageRef } from '../scripture/passages'
import type { ShelfKeep } from './ShelfSave'

/** Save props for a parallel or related passage, without the verse being edited. */
export function keepPassage(keep: ShelfKeep, passage: PassageRef, text: string) {
  return {
    passage,
    text,
    saved: verseForPassage(keep.verses, passage) ?? null,
    categories: keep.categories,
    onSave: keep.onSave,
    onCreateCategory: keep.onCreateCategory,
    onRecordingChange: keep.onRecordingChange,
  }
}
