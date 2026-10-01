import type { Language } from '../i18n/messages'
import { readCachedGuide, writeCachedGuide } from './cache'
import { generateCustomGuide, prayerProxyConfigured } from './claude'
import { matchTemplate } from './match'
import type { PrayerGuideCard } from './types'

export type BuildResult =
  | { kind: 'template'; guide: PrayerGuideCard; templateId: string }
  | { kind: 'cached'; guide: PrayerGuideCard }
  | { kind: 'custom'; guide: PrayerGuideCard }
  | { kind: 'no-proxy' }
  | { kind: 'error'; message: string }

export { prayerProxyConfigured }

/** Resolve a topic to a prayer card: local template first, then cache, then optional proxy. */
export async function buildPrayerGuide(topic: string, language: Language): Promise<BuildResult> {
  const clean = topic.trim()
  if (!clean) return { kind: 'error', message: 'empty' }

  const matched = matchTemplate(clean)
  if (matched) {
    return { kind: 'template', guide: matched.guides[language], templateId: matched.id }
  }

  const cached = readCachedGuide(language, clean)
  if (cached) return { kind: 'cached', guide: cached }

  if (!prayerProxyConfigured()) return { kind: 'no-proxy' }

  try {
    const guide = await generateCustomGuide(clean, language)
    writeCachedGuide(language, clean, guide)
    return { kind: 'custom', guide }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'failed'
    return { kind: 'error', message }
  }
}
