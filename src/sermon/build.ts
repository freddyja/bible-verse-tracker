import { BOOKS } from '../scripture/books'
import { loadVerse } from '../scripture/api'
import { formatPassageRange } from '../scripture/passages'
import { pickOutline } from './match'
import type { SermonBlock, SermonCopy, SermonHandout, SermonLang, SermonOutline } from './types'

const VERSIONS: Record<SermonLang, string> = {
  en: 'kjv',
  es: 'rv1909',
  pt: 'blivre',
}

export const QUESTION_LABEL: Record<SermonLang, string> = {
  en: 'Discussion Questions:',
  es: 'Preguntas para el grupo:',
  pt: 'Preguntas para la reflexión:',
}

const ORDER: readonly SermonLang[] = ['en', 'es', 'pt']

function bookIndex(bookId: string): number {
  const index = BOOKS.findIndex((book) => book.id === bookId)
  if (index < 0) throw new Error(bookId)
  return index
}

function fill(copy: SermonCopy, topic: string, slots: boolean): SermonCopy {
  if (!slots) return copy
  const write = (value: string) => value.replaceAll('{topic}', topic)
  return {
    punch: write(copy.punch),
    context: write(copy.context),
    application: write(copy.application),
    challenge: write(copy.challenge),
    charge: write(copy.charge),
    questions: [write(copy.questions[0]), write(copy.questions[1])],
  }
}

function withAudience(language: SermonLang, challenge: string, audience: string): string {
  if (!audience) return challenge
  if (language === 'es') return `Una palabra para ${audience}. ${challenge}`
  if (language === 'pt') return `Uma palavra para ${audience}. ${challenge}`
  return `A word for ${audience}. ${challenge}`
}

function wrapQuote(language: SermonLang, text: string): string {
  if (language === 'pt') return `«${text}»`
  return `"${text}"`
}

async function quoteFor(language: SermonLang, outline: SermonOutline): Promise<string> {
  const index = bookIndex(outline.bookId)
  const parts: string[] = []
  for (let verse = outline.verse; verse <= outline.endVerse; verse += 1) {
    const text = await loadVerse(VERSIONS[language], index, outline.chapter, verse)
    if (!text?.trim()) throw new Error('verse')
    parts.push(text.replace(/\s+/g, ' ').trim())
  }
  return wrapQuote(language, parts.join(' '))
}

function blockFor(
  language: SermonLang,
  outline: SermonOutline,
  topic: string,
  audience: string,
  quote: string,
): SermonBlock {
  const copy = fill(outline.copy[language], topic, outline.slots === true)
  const index = bookIndex(outline.bookId)
  return {
    reference: formatPassageRange(language, {
      bookIndex: index,
      chapter: outline.chapter,
      verse: outline.verse,
      endVerse: outline.endVerse > outline.verse ? outline.endVerse : undefined,
    }),
    quote,
    punch: copy.punch,
    context: copy.context,
    application: copy.application,
    challenge: withAudience(language, copy.challenge, audience),
    charge: copy.charge,
    questionsLabel: QUESTION_LABEL[language],
    questions: copy.questions,
  }
}

export async function buildHandout(topic: string, audience: string): Promise<SermonHandout> {
  const cleanTopic = topic.replace(/\s+/g, ' ').trim()
  const cleanAudience = audience.replace(/\s+/g, ' ').trim().slice(0, 80)
  const outline = pickOutline(cleanTopic)
  const quotes = await Promise.all(ORDER.map((language) => quoteFor(language, outline)))
  const blocks = {} as Record<SermonLang, SermonBlock>
  ORDER.forEach((language, index) => {
    blocks[language] = blockFor(language, outline, cleanTopic, cleanAudience, quotes[index] ?? '')
  })
  return { topic: cleanTopic, blocks }
}
