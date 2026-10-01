/**
 * Living Word Prayer Guide proxy.
 * Keeps ANTHROPIC_API_KEY server-side; the Pages app POSTs topic + language only.
 */

export interface Env {
  ANTHROPIC_API_KEY: string
}

type Language = 'en' | 'es' | 'pt'

type PrayerItem = {
  n: number
  heading: string
  prayer: string
  ref: string
}

type PrayerGuideCard = {
  titleHow: string
  titleFor: string
  tagline: string
  items: PrayerItem[]
  footer: { prayer: string; ref: string }
}

const ALLOWED_ORIGINS = new Set([
  'https://freddyja.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
])

const MAX_TOPIC_LENGTH = 80
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 10

/** Per-isolate rate map — basic abuse guard, not a global store. */
const rateMap = new Map<string, { count: number; resetAt: number }>()

const LANG_NAME: Record<Language, string> = {
  en: 'English',
  es: 'Spanish',
  pt: 'Portuguese',
}

function corsHeaders(origin: string | null): HeadersInit {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://freddyja.github.io'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function jsonResponse(
  body: unknown,
  status: number,
  origin: string | null,
  extra?: HeadersInit,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin),
      ...extra,
    },
  })
}

function clientIp(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now >= entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count += 1
  if (entry.count > RATE_LIMIT_MAX) return true
  return false
}

function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'es' || value === 'pt'
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

function parseGuide(raw: string): PrayerGuideCard | null {
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin')

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'method-not-allowed' }, 405, origin)
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return jsonResponse({ error: 'origin-not-allowed' }, 403, origin)
    }

    const contentType = request.headers.get('Content-Type') || ''
    if (!contentType.toLowerCase().includes('application/json')) {
      return jsonResponse({ error: 'content-type-must-be-json' }, 415, origin)
    }

    const ip = clientIp(request)
    if (rateLimited(ip)) {
      return jsonResponse({ error: 'rate-limited' }, 429, origin, {
        'Retry-After': '60',
      })
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'invalid-json' }, 400, origin)
    }

    if (!body || typeof body !== 'object') {
      return jsonResponse({ error: 'invalid-body' }, 400, origin)
    }

    const { topic, language } = body as Record<string, unknown>
    if (typeof topic !== 'string' || !topic.trim()) {
      return jsonResponse({ error: 'empty-topic' }, 400, origin)
    }
    const cleanTopic = topic.trim()
    if (cleanTopic.length > MAX_TOPIC_LENGTH) {
      return jsonResponse({ error: 'topic-too-long' }, 400, origin)
    }
    if (!isLanguage(language)) {
      return jsonResponse({ error: 'invalid-language' }, 400, origin)
    }

    const apiKey = env.ANTHROPIC_API_KEY
    if (!apiKey || !apiKey.trim()) {
      return jsonResponse({ error: 'server-misconfigured' }, 500, origin)
    }

    let anthropicRes: Response
    try {
      anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey.trim(),
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1200,
          messages: [{ role: 'user', content: buildPrompt(cleanTopic, language) }],
        }),
      })
    } catch {
      return jsonResponse({ error: 'upstream-unreachable' }, 502, origin)
    }

    const data = (await anthropicRes.json()) as AnthropicResponse
    if (!anthropicRes.ok) {
      return jsonResponse(
        { error: data.error?.message ?? `claude-${anthropicRes.status}` },
        502,
        origin,
      )
    }

    const text = (data.content ?? [])
      .filter((part) => part.type === 'text' && typeof part.text === 'string')
      .map((part) => part.text)
      .join('\n')

    const guide = parseGuide(text)
    if (!guide) {
      return jsonResponse({ error: 'bad-json' }, 502, origin)
    }

    return jsonResponse(guide, 200, origin)
  },
}
