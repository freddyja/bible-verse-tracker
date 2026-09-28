export type SermonLang = 'en' | 'es' | 'pt'

export type SermonCopy = {
  punch: string
  context: string
  application: string
  challenge: string
  charge: string
  questions: readonly [string, string]
}

export type SermonOutline = {
  id: string
  keywords: readonly string[]
  bookId: string
  chapter: number
  verse: number
  endVerse: number
  /** When true, {topic} in the copy is replaced with the class topic. */
  slots?: boolean
  copy: Record<SermonLang, SermonCopy>
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
