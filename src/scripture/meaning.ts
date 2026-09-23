export type MeaningHit = {
  start: number
  end: number
  text: string
}

export function pickMeaning(
  notes: readonly (readonly [number, number, string])[] | undefined,
  verse: number,
): MeaningHit | null {
  if (!notes) return null
  let best: MeaningHit | null = null
  for (const [start, end, text] of notes) {
    if (!text || verse < start || verse > end) continue
    if (!best || end - start < best.end - best.start) best = { start, end, text }
  }
  return best
}
