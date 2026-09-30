import { BOOKS } from '../scripture/books'
import { loadVerse } from '../scripture/api'
import { formatPassageRange } from '../scripture/passages'
import { lineIndex, pickOutline } from './match'
import type {
  SermonBlock,
  SermonCopy,
  SermonDepth,
  SermonFullCopy,
  SermonFullLines,
  SermonHandout,
  SermonLang,
  SermonLines,
  SermonOutline,
  SermonPoint,
} from './types'

const VERSIONS: Record<SermonLang, string> = {
  en: 'kjv',
  es: 'rv1909',
  pt: 'blivre',
}

export const QUESTION_LABEL: Record<SermonLang, string> = {
  en: 'Discussion Questions:',
  es: 'Preguntas para el grupo:',
  pt: 'Perguntas para a reflexão:',
}

const ADDRESS: Record<SermonLang, string> = {
  en: 'Brothers, ',
  es: 'Hermanos, ',
  pt: 'Irmãos, ',
}

const ORDER: readonly SermonLang[] = ['en', 'es', 'pt']

function bookIndex(bookId: string): number {
  const index = BOOKS.findIndex((book) => book.id === bookId)
  if (index < 0) throw new Error(bookId)
  return index
}

function at<T>(items: readonly T[], index: number): T {
  const found = items[index % items.length]
  if (found === undefined) throw new Error('sermon')
  return found
}

function spokenCopy(lines: SermonLines, index: number): SermonCopy {
  const questions = at(lines.questions, index)
  return {
    punch: at(lines.punch, index),
    context: at(lines.context, index),
    application: at(lines.application, index),
    challenge: at(lines.challenge, index),
    charge: at(lines.charge, index),
    questions: [questions[0], questions[1]],
  }
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

function fillFull(copy: SermonFullCopy, topic: string, slots: boolean): SermonFullCopy {
  if (!slots) return copy
  const write = (value: string) => value.replaceAll('{topic}', topic)
  const writePoint = (point: SermonPoint): SermonPoint => ({
    heading: write(point.heading),
    thought: write(point.thought),
    crossRef: point.crossRef ? write(point.crossRef) : undefined,
  })
  return {
    title: write(copy.title),
    bigIdea: write(copy.bigIdea),
    openingHook: write(copy.openingHook),
    context: write(copy.context),
    points: [writePoint(copy.points[0]), writePoint(copy.points[1]), writePoint(copy.points[2])],
    application: write(copy.application),
    invitation: write(copy.invitation),
    closingPrayer: write(copy.closingPrayer),
    questions: [
      write(copy.questions[0]),
      write(copy.questions[1]),
      write(copy.questions[2]),
      write(copy.questions[3]),
    ],
  }
}

function withAudience(language: SermonLang, challenge: string, audience: string): string {
  if (!audience) return challenge
  const name = audience.charAt(0).toUpperCase() + audience.slice(1)
  const open = ADDRESS[language]
  if (challenge.startsWith(open)) return `${name}, ${challenge.slice(open.length)}`
  return `${name}. ${challenge}`
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

function pointAt(lines: SermonFullLines, pointIndex: 0 | 1 | 2, index: number): SermonPoint {
  const pack = lines.points[pointIndex]
  const cross = pack.crossRef ? at(pack.crossRef, index) : undefined
  return {
    heading: at(pack.heading, index),
    thought: at(pack.thought, index),
    crossRef: cross || undefined,
  }
}

function spokenFull(lines: SermonLines, index: number): SermonFullCopy {
  const full = lines.full
  const questions = at(full.questions, index)
  const context = full.context ? at(full.context, index) : at(lines.context, index)
  return {
    title: at(full.title, index),
    bigIdea: at(full.bigIdea, index),
    openingHook: at(full.openingHook, index),
    context,
    points: [pointAt(full, 0, index), pointAt(full, 1, index), pointAt(full, 2, index)],
    application: at(full.application, index),
    invitation: at(full.invitation, index),
    closingPrayer: at(full.closingPrayer, index),
    questions: [questions[0], questions[1], questions[2], questions[3]],
  }
}

function referenceFor(language: SermonLang, outline: SermonOutline): string {
  const index = bookIndex(outline.bookId)
  return formatPassageRange(language, {
    bookIndex: index,
    chapter: outline.chapter,
    verse: outline.verse,
    endVerse: outline.endVerse > outline.verse ? outline.endVerse : undefined,
  })
}

function blockFor(
  language: SermonLang,
  outline: SermonOutline,
  topic: string,
  audience: string,
  quote: string,
  depth: SermonDepth,
): SermonBlock {
  const index = lineIndex(outline, topic)
  const slots = outline.slots === true
  const short = fill(spokenCopy(outline.lines[language], index), topic, slots)
  const reference = referenceFor(language, outline)

  if (depth === 'short') {
    return {
      depth,
      reference,
      quote,
      punch: short.punch,
      context: short.context,
      application: short.application,
      challenge: withAudience(language, short.challenge, audience),
      charge: short.charge,
      questionsLabel: QUESTION_LABEL[language],
      questions: short.questions,
    }
  }

  const full = fillFull(spokenFull(outline.lines[language], index), topic, slots)
  return {
    depth,
    reference,
    quote,
    punch: short.punch,
    context: full.context,
    application: full.application,
    challenge: withAudience(language, short.challenge, audience),
    charge: short.charge,
    questionsLabel: QUESTION_LABEL[language],
    questions: full.questions,
    title: full.title,
    bigIdea: full.bigIdea,
    openingHook: full.openingHook,
    points: full.points,
    invitation: withAudience(language, full.invitation, audience),
    closingPrayer: full.closingPrayer,
  }
}

export async function buildHandout(
  topic: string,
  audience: string,
  depth: SermonDepth = 'short',
): Promise<SermonHandout> {
  const cleanTopic = topic.replace(/\s+/g, ' ').trim()
  const cleanAudience = audience.replace(/\s+/g, ' ').trim().slice(0, 80)
  const outline = pickOutline(cleanTopic)
  const quotes = await Promise.all(ORDER.map((language) => quoteFor(language, outline)))
  const blocks = {} as Record<SermonLang, SermonBlock>
  ORDER.forEach((language, index) => {
    blocks[language] = blockFor(
      language,
      outline,
      cleanTopic,
      cleanAudience,
      quotes[index] ?? '',
      depth,
    )
  })
  return { topic: cleanTopic, depth, blocks }
}
