export type SermonLang = 'en' | 'es' | 'pt'

export type SermonCopy = {
  punch: string
  context: string
  application: string
  challenge: string
  charge: string
  questions: readonly [string, string]
}

/** Spoken alternatives for one language. The same index is used across fields. */
export type SermonLines = {
  punch: readonly string[]
  context: readonly string[]
  application: readonly string[]
  challenge: readonly string[]
  charge: readonly string[]
  questions: readonly (readonly [string, string])[]
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
  reference: string
  quote: string
  punch: string
  context: string
  application: string
  challenge: string
  charge: string
  questionsLabel: string
  questions: readonly [string, string]
}

export type SermonHandout = {
  topic: string
  blocks: Record<SermonLang, SermonBlock>
}
