import type { Language } from '../i18n/messages'
import type { PrayerGuideCard, PrayerItem } from './types'

/** True when the public proxy URL is set for this build (no secrets in the client). */
export function prayerProxyConfigured(): boolean {
  const url = import.meta.env.VITE_PRAYER_PROXY_URL
  return typeof url === 'string' && url.trim().length > 0
}

function proxyUrl(): string | null {
  const url = import.meta.env.VITE_PRAYER_PROXY_URL
  if (typeof url !== 'string') return null
  const trimmed = url.trim().replace(/\/$/, '')
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
    return parseGuideObject(JSON.parse(body) as unknown)
  } catch {
    return null
  }
}

export function parseGuideObject(value: unknown): PrayerGuideCard | null {
  if (!value || typeof value !== 'object') return null
  const parsed = value as Record<string, unknown>
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
}

type ProxyErrorBody = { error?: string }

/** Call the server-side prayer proxy when VITE_PRAYER_PROXY_URL is set. Throws on failure. */
export async function generateCustomGuide(topic: string, language: Language): Promise<PrayerGuideCard> {
  const base = proxyUrl()
  if (!base) throw new Error('missing-proxy')

  const response = await fetch(base, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ topic, language }),
  })

  const data = (await response.json()) as unknown
  if (!response.ok) {
    const err = data as ProxyErrorBody
    throw new Error(err.error ?? `proxy-${response.status}`)
  }
  const guide = parseGuideObject(data)
  if (!guide) throw new Error('bad-json')
  return guide
}
