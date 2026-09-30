export type SermonLang = 'en' | 'es' | 'pt'

export type SermonDepth = 'short' | 'full'

export type SermonCopy = {
  punch: string
  context: string
  application: string
  challenge: string
  charge: string
  questions: readonly [string, string]
}

export type SermonPoint = {
  heading: string
  thought: string
  crossRef?: string
}

export type SermonFullCopy = {
  title: string
  bigIdea: string
  openingHook: string
  context: string
  points: readonly [SermonPoint, SermonPoint, SermonPoint]
  application: string
  invitation: string
  closingPrayer: string
  questions: readonly [string, string, string, string]
}

/** Spoken alternatives for one language. The same index is used across fields. */
export type SermonLines = {
  punch: readonly string[]
  context: readonly string[]
  application: readonly string[]
  challenge: readonly string[]
  charge: readonly string[]
  questions: readonly (readonly [string, string])[]
  /** Full-depth spoken takes. Same lineIndex as Short. */
  full: SermonFullLines
}

export type SermonPointLines = {
  heading: readonly string[]
  thought: readonly string[]
  crossRef?: readonly (string | undefined)[]
}

export type SermonFullLines = {
  title: readonly string[]
  bigIdea: readonly string[]
  openingHook: readonly string[]
  /** When omitted, Short context is reused. */
  context?: readonly string[]
  points: readonly [SermonPointLines, SermonPointLines, SermonPointLines]
  application: readonly string[]
  invitation: readonly string[]
  closingPrayer: readonly string[]
  questions: readonly (readonly [string, string, string, string])[]
}

export type SermonOutline = {
  id: string
  keywords: readonly string[]
  bookId: string
  chapter: number
  verse: number
  endVerse: number
  /** When true, {topic} in the lines is replaced with the class topic. */
  slots?: boolean
  lines: Record<SermonLang, SermonLines>
}

export type SermonBlock = {
  depth: SermonDepth
  reference: string
  quote: string
  /** Short punch — also used as a spoken lead in Full when needed. */
  punch: string
  context: string
  application: string
  challenge: string
  charge: string
  questionsLabel: string
  questions: readonly string[]
  /** Full-only fields (present when depth === 'full'). */
  title?: string
  bigIdea?: string
  openingHook?: string
  points?: readonly [SermonPoint, SermonPoint, SermonPoint]
  invitation?: string
  closingPrayer?: string
}

export type SermonHandout = {
  topic: string
  depth: SermonDepth
  blocks: Record<SermonLang, SermonBlock>
}
