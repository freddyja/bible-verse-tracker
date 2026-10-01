import type { Language } from '../i18n/messages'
import type { PrayerGuideCard, PrayerItem } from './types'

export function anthropicKeyPresent(): boolean {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY
  return typeof key === 'string' && key.trim().length > 0
}

function apiKey(): string | null {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (typeof key !== 'string') return null
  const trimmed = key.trim()
  return trimmed.length > 0 ? trimmed : null
}

function isItem(value: unknown): value is PrayerItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.n === 'number' &&
    typeof item.heading === 'string' &&
    typeof item.prayer === 'string' &&
    typeof item.ref === 'string'
  )
}

export function parseGuideJson(raw: string): PrayerGuideCard | null {
  const trimmed = raw.trim()
  const fenced = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(trimmed)
  const body = fenced ? fenced[1].trim() : trimmed
  try {
    const parsed = JSON.parse(body) as Record<string, unknown>
    if (typeof parsed.titleHow !== 'string' || typeof parsed.titleFor !== 'string') return null
    if (typeof parsed.tagline !== 'string') return null
    if (!Array.isArray(parsed.items) || parsed.items.length !== 6) return null
    if (!parsed.items.every(isItem)) return null
    const footer = parsed.footer as Record<string, unknown> | undefined
    if (!footer || typeof footer.prayer !== 'string' || typeof footer.ref !== 'string') return null
    return {
      titleHow: parsed.titleHow,
      titleFor: parsed.titleFor,
      tagline: parsed.tagline,
      items: parsed.items.map((item, index) => ({
        n: index + 1,
        heading: item.heading,
        prayer: item.prayer,
        ref: item.ref,
      })),
      footer: { prayer: footer.prayer, ref: footer.ref },
    }
  } catch {
    return null
  }
}

const LANG_NAME: Record<Language, string> = {
  en: 'English',
  es: 'Spanish',
  pt: 'Portuguese',
}

function buildPrompt(topic: string, language: Language): string {
  return `You write a short Christian prayer guide card for The Living Word app.
Return STRICT JSON only (no markdown fences, no commentary) matching this schema:
{
  "titleHow": string,
  "titleFor": string,
  "tagline": string,
  "items": [ { "n": number, "heading": string, "prayer": string, "ref": string } ],
  "footer": { "prayer": string, "ref": string }
}
Rules:
- Language of ALL strings: ${LANG_NAME[language]}.
- titleHow should be the local equivalent of "HOW TO PRAY" (EN: HOW TO PRAY, ES: CÓMO ORAR, PT: COMO ORAR).
- titleFor should be like "FOR {TOPIC}" in that language, ALL CAPS where natural.
- Exactly 6 items, n = 1..6. Each heading ALL CAPS, short. Each prayer one sentence. ref is a Bible reference only (book chapter:verse) — never paste copyrighted translation text.
- Prefer classic free/public-domain friendly refs (e.g. Psalms, Gospels, Paul) suitable for KJV / RV1909 / Bíblia Livre.
- Tone: warm, biblical, Living Word voice — not branded as Fire & Fellowship.
- Topic: ${topic}`
}

type AnthropicContent = { type?: string; text?: string }
type AnthropicResponse = {
  content?: AnthropicContent[]
  error?: { message?: string }
}

/** Call Claude Messages API when VITE_ANTHROPIC_API_KEY is set. Throws on failure. */
export async function generateCustomGuide(topic: string, language: Language): Promise<PrayerGuideCard> {
  const key = apiKey()
  if (!key) throw new Error('missing-key')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      messages: [{ role: 'user', content: buildPrompt(topic, language) }],
    }),
  })

  const data = (await response.json()) as AnthropicResponse
  if (!response.ok) {
    throw new Error(data.error?.message ?? `claude-${response.status}`)
  }
  const text = (data.content ?? [])
    .filter((part) => part.type === 'text' && typeof part.text === 'string')
    .map((part) => part.text)
    .join('\n')
  const guide = parseGuideJson(text)
  if (!guide) throw new Error('bad-json')
  return guide
}
