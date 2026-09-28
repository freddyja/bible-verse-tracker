import { fold } from '../scripture/passages'
import { OUTLINES, FALLBACK } from './outlines'
import type { SermonOutline } from './types'

function normalize(value: string): string {
  return fold(value)
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function scoreOutline(outline: SermonOutline, query: string): number {
  const words = new Set(query.split(' ').filter((word) => word.length > 1))
  let score = 0
  for (const raw of outline.keywords) {
    const keyword = normalize(raw)
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
      continue
    }
    if (keyword.includes(' ')) continue
    for (const word of words) {
      if (word.length < 5 || keyword.length < 5) continue
      if (word.startsWith(keyword) || keyword.startsWith(word)) {
        score = Math.max(score, 55 + Math.min(word.length, keyword.length))
      }
    }
  }
  return score
}

/** A curated outline when the topic is clear. Otherwise the Word-of-God handout, with the topic named. */
export function pickOutline(topic: string): SermonOutline {
  const query = normalize(topic)
  if (query.length < 2) return FALLBACK
  let best: SermonOutline = FALLBACK
  let bestScore = 54
  for (const outline of OUTLINES) {
    const score = scoreOutline(outline, query)
    if (score > bestScore) {
      best = outline
      bestScore = score
    }
  }
  return best
}
