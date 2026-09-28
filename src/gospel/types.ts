export type GospelKind = 'scripture' | 'passage' | 'care' | 'refuse' | 'fallback'

export type GospelVerse = {
  reference: string
  version: string
  text: string
  bookIndex: number
  chapter: number
  verse: number
}

export type GospelAnswer = {
  kind: GospelKind
  intro: string
  verses: GospelVerse[]
  closing: string
}

export type GospelTurn = {
  id: string
  question: string
  answer: GospelAnswer
  at: number
}

export type VerseRef = {
  bookId: string
  chapter: number
  verse: number
}
