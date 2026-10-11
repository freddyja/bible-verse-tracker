import type { SermonBlock, SermonDepth, SermonHandout, SermonLang, SermonLangChoice } from './types'

const ORDER: readonly SermonLang[] = ['en', 'es', 'pt']

const LABELS: Record<
  SermonLang,
  {
    title: string
    bigIdea: string
    openingHook: string
    passage: string
    context: string
    point: string
    application: string
    invitation: string
    closingPrayer: string
  }
> = {
  en: {
    title: 'Title',
    bigIdea: 'Big idea',
    openingHook: 'Opening hook',
    passage: 'Passage',
    context: 'Context',
    point: 'Point',
    application: 'Application',
    invitation: 'Invitation',
    closingPrayer: 'Closing prayer',
  },
  es: {
    title: 'Título',
    bigIdea: 'Idea central',
    openingHook: 'Gancho de apertura',
    passage: 'Pasaje',
    context: 'Contexto',
    point: 'Punto',
    application: 'Aplicación',
    invitation: 'Invitación',
    closingPrayer: 'Oración final',
  },
  pt: {
    title: 'Título',
    bigIdea: 'Grande ideia',
    openingHook: 'Gancho de abertura',
    passage: 'Passagem',
    context: 'Contexto',
    point: 'Ponto',
    application: 'Aplicação',
    invitation: 'Convite',
    closingPrayer: 'Oração final',
  },
}

function shortBlockText(block: SermonBlock): string {
  return [
    block.reference,
    block.quote,
    '',
    block.punch,
    '',
    block.context,
    '',
    block.application,
    '',
    block.challenge,
    '',
    block.charge,
    '',
    block.questionsLabel,
    `1. ${block.questions[0]}`,
    `2. ${block.questions[1]}`,
  ].join('\n')
}

function fullBlockText(block: SermonBlock, language: SermonLang): string {
  const L = LABELS[language]
  const points = block.points ?? []
  const pointLines = points.flatMap((point, index) => {
    const head = `${L.point} ${index + 1}: ${point.heading}`
    const thought = point.crossRef ? `${point.thought} (${point.crossRef})` : point.thought
    return ['', head, thought]
  })
  const questions = block.questions.map((q, i) => `${i + 1}. ${q}`)
  return [
    `${L.title}: ${block.title ?? ''}`,
    `${L.bigIdea}: ${block.bigIdea ?? ''}`,
    '',
    `${L.openingHook}:`,
    block.openingHook ?? '',
    '',
    `${L.passage}:`,
    block.reference,
    block.quote,
    '',
    `${L.context}:`,
    block.context,
    ...pointLines,
    '',
    `${L.application}:`,
    block.application,
    '',
    `${L.invitation}:`,
    block.invitation ?? '',
    '',
    `${L.closingPrayer}:`,
    block.closingPrayer ?? '',
    '',
    block.questionsLabel,
    ...questions,
  ].join('\n')
}

function blockText(block: SermonBlock, language: SermonLang, depth: SermonDepth): string {
  if (depth === 'full') return fullBlockText(block, language)
  return shortBlockText(block)
}

export function handoutText(handout: SermonHandout, choice: SermonLangChoice = 'all'): string {
  const languages: readonly SermonLang[] = choice === 'all' ? ORDER : [choice]
  return languages.map((language) => blockText(handout.blocks[language], language, handout.depth)).join('\n\n')
}

/** `topic.docx` for all three languages, `topic-EN.docx` (or -ES / -PT) for one. */
export function handoutFileName(topic: string, choice: SermonLangChoice = 'all'): string {
  const slug = topic
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
  const suffix = choice === 'all' ? '' : `-${choice.toUpperCase()}`
  return `${slug || 'sermon'}${suffix}.docx`
}
