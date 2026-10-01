import { fold } from '../scripture/passages'
import { TEMPLATES } from './templates'
import type { PrayerTemplate } from './types'

export function normalizeTopic(value: string): string {
  return fold(value)
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Strip common “pray for / how to pray for / praying for / ora por / ore por” fluff. */
function stripPrayerFraming(query: string): string {
  return query
    .replace(
      /^(how to )?(pray(ing|er)?|ora(r|cion|ção)?|ore) (for|por|para) (my |mi |minha |meu )?/,
      '',
    )
    .replace(/^(for|por|para) (my |mi |minha |meu )?/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function scoreTemplate(template: PrayerTemplate, query: string): number {
  const stripped = stripPrayerFraming(query)
  const words = new Set(
    [...query.split(' '), ...stripped.split(' ')].filter((word) => word.length > 1),
  )
  let score = 0
  for (const raw of template.keywords) {
    const keyword = normalizeTopic(raw)
    if (keyword.length < 2) continue
    if (query === keyword || stripped === keyword) {
      score = Math.max(score, 120 + keyword.length)
      continue
    }
    if (keyword.includes(' ') && (query.includes(keyword) || stripped.includes(keyword))) {
      score = Math.max(score, 95 + keyword.length)
      continue
    }
    if (!keyword.includes(' ') && words.has(keyword)) {
      score = Math.max(score, 75 + keyword.length)
      continue
    }
    if (keyword.includes(' ')) continue
    for (const word of words) {
      if (word.length < 4 || keyword.length < 4) continue
      if (word.startsWith(keyword) || keyword.startsWith(word)) {
        score = Math.max(score, 55 + Math.min(word.length, keyword.length))
      }
    }
  }
  return score
}

/** Return a curated template when the topic is clear; otherwise null (custom / Claude path). */
export function matchTemplate(topic: string): PrayerTemplate | null {
  const query = normalizeTopic(topic)
  if (query.length < 2) return null
  let best: PrayerTemplate | null = null
  let bestScore = 54
  for (const template of TEMPLATES) {
    const score = scoreTemplate(template, query)
    if (score > bestScore) {
      best = template
      bestScore = score
    }
  }
  return best
}
