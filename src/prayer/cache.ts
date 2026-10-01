import type { Language } from '../i18n/messages'
import { normalizeTopic } from './match'
import type { PrayerGuideCard } from './types'

const PREFIX = 'living-word:prayer-guide:'

function key(language: Language, topic: string): string {
  return `${PREFIX}${language}:${normalizeTopic(topic)}`
}

export function readCachedGuide(language: Language, topic: string): PrayerGuideCard | null {
  try {
    const raw = localStorage.getItem(key(language, topic))
    if (!raw) return null
    const parsed = JSON.parse(raw) as PrayerGuideCard
    if (!parsed?.titleHow || !Array.isArray(parsed.items) || parsed.items.length !== 6) return null
    return parsed
  } catch {
    return null
  }
}

export function writeCachedGuide(language: Language, topic: string, guide: PrayerGuideCard): void {
  try {
    localStorage.setItem(key(language, topic), JSON.stringify(guide))
  } catch {
    // Quota or private mode — ignore.
  }
}
