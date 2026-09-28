import type { SermonBlock, SermonHandout, SermonLang } from './types'

const ORDER: readonly SermonLang[] = ['en', 'es', 'pt']

function blockText(block: SermonBlock): string {
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

export function handoutText(handout: SermonHandout): string {
  return ORDER.map((language) => blockText(handout.blocks[language])).join('\n\n')
}

export function handoutFileName(topic: string): string {
  const slug = topic
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
  return `${slug || 'sermon'}.docx`
}
