import type { Verse } from './types'

/** Other saved verses that share at least one of the selected categories. */
export function versesSharingCategory(
  verses: readonly Verse[],
  categoryIds: readonly string[],
  excludeId: string | null,
): Verse[] {
  const selected = new Set(categoryIds)
  if (selected.size === 0) return []
  return verses.filter(
    (verse) => verse.id !== excludeId && verse.categoryIds.some((id) => selected.has(id)),
  )
}
