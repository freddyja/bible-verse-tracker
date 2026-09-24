import type { MeaningHit } from './meaning'

export type TodaySource = 'checkbook' | 'morning'
export type ContextSource = 'concise' | 'complete'

export type TodayHit = {
  text: string
  source: TodaySource
}

export type ContextHit = MeaningHit & {
  source: ContextSource
}

/** Faith's Checkbook when it names the verse, otherwise Morning and Evening. */
export function pickToday(checkbook?: string | null, morning?: string | null): TodayHit | null {
  const primary = checkbook?.trim()
  if (primary) return { text: primary, source: 'checkbook' }
  const fallback = morning?.trim()
  if (fallback) return { text: fallback, source: 'morning' }
  return null
}

/** The concise note when it covers the verse, otherwise the complete commentary. */
export function pickContext(concise: MeaningHit | null, complete: MeaningHit | null): ContextHit | null {
  if (concise) return { ...concise, source: 'concise' }
  if (complete) return { ...complete, source: 'complete' }
  return null
}
