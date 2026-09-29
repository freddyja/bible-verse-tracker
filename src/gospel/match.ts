import { PACKS, type GospelPack } from './packs.ts'
import { normalizeQuestion } from './text.ts'

/**
 * Drop common “what does the Bible say about …” framing so the theme word
 * can beat generic keywords like “scripture” or “bible”.
 */
export function focusTopic(query: string): string {
  const frames: RegExp[] = [
    /^what does (the )?(bible|scripture|word of god) (say |teach )?(about |on )?/,
    /^what (do|does) (the )?(bible|scriptures?) (say|teach) (about |on )?/,
    /^que dice (la )?(biblia|escritura|escrituras) (sobre|acerca de) /,
    /^que ensena (la )?(biblia|escritura|escrituras) (sobre|acerca de) /,
    /^o que (a )?(biblia|escritura|escrituras) (diz|ensina) (sobre|acerca de) /,
    /^tell me about /,
    /^what about /,
    /^how about /,
    /^hablame (de |sobre )?/,
    /^hablemos (de |sobre )?/,
    /^fale (me )?(sobre|de) /,
  ]
  let focused = query
  for (const frame of frames) {
    const next = focused.replace(frame, '').trim()
    if (next.length >= 2) focused = next
  }
  return focused
}

function scorePack(pack: GospelPack, query: string): number {
  const words = new Set(query.split(' ').filter((word) => word.length > 1))
  let score = 0
  for (const raw of pack.keywords) {
    const keyword = normalizeQuestion(raw)
    if (keyword.length < 2) continue
    if (query === keyword) {
      score = Math.max(score, 120 + keyword.length)
      continue
    }
    if (keyword.includes(' ') && query.includes(keyword)) {
      score = Math.max(score, 90 + keyword.length)
      continue
    }
    if (!keyword.includes(' ') && words.has(keyword)) {
      score = Math.max(score, 70 + keyword.length)
    }
  }
  return score
}

/** The closest curated theme, when the question clearly names one. */
export function pickPack(question: string): GospelPack | null {
  const normalized = normalizeQuestion(question)
  if (normalized.length < 2) return null
  const query = focusTopic(normalized)
  let best: GospelPack | null = null
  let bestScore = 54
  for (const pack of PACKS) {
    const score = scorePack(pack, query)
    if (score > bestScore) {
      best = pack
      bestScore = score
    }
  }
  return best
}
