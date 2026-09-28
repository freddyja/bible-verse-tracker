import { PACKS, type GospelPack } from './packs.ts'
import { normalizeQuestion } from './text.ts'

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
  const query = normalizeQuestion(question)
  if (query.length < 2) return null
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
