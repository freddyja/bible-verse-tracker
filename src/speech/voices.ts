import type { Language } from '../i18n/messages'
import { readVoicePrefs, type VoiceGender, type VoicePrefs, type VoiceStyle } from './prefs'

const utteranceLang: Record<Language, string> = {
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
}

/** Rate and pitch stay inside one voice when the phone only has one. */
const STYLE: Record<VoiceStyle, { rate: number; pitch: number }> = {
  calm: { rate: 0.82, pitch: 0.92 },
  clear: { rate: 0.96, pitch: 1 },
  warm: { rate: 0.9, pitch: 1.08 },
}

/**
 * Scale applied only when no matching voice can be assigned.
 * Male stays well below the style pitch; female stays well above it,
 * so a shared system voice cannot sound the same for both.
 */
const GENDER_PITCH: Record<VoiceGender, number> = {
  male: 0.58,
  female: 1.4,
  default: 1,
}

function clampPitch(pitch: number): number {
  if (pitch < 0) return 0
  if (pitch > 2) return 2
  return pitch
}

/**
 * Names the Web Speech API uses for on-device voices. Gender is not a
 * standard field, so unknown names stay available only as System default.
 */
const FEMALE_NAMES =
  /\b(samantha|victoria|karen|moira|tessa|fiona|veena|zira|hazel|serena|allison|salli|kimberly|joanna|kendra|paulina|monica|mónica|luciana|francisca|fernanda|amelie|amélie|milena|helena|aria|jenny|sonia|libby)\b/i
const MALE_NAMES =
  /\b(alex|daniel|fred|oliver|rishi|david|mark|george|aaron|arthur|jorge|felipe|diego|carlos|ricardo|guy|davis|ryan)\b/i

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function utteranceLanguage(language: Language): string {
  return utteranceLang[language]
}

/**
 * Stop current speech. Returns false when there is nothing to stop.
 * An idle cancel() makes some phones fire voiceschanged in a loop and
 * ignore later taps, including the language buttons in Settings.
 * Canceling also makes Chrome drop a speak queued in the same turn.
 */
export function cancelSpeech(): boolean {
  if (!canSpeak()) return false
  const synth = window.speechSynthesis
  try {
    if (!synth.speaking && !synth.pending) return false
    synth.cancel()
    return true
  } catch {
    // The engine can refuse a cancel before the first utterance.
    return false
  }
}

export function ignoredSpeechError(error: string | undefined): boolean {
  return error === 'canceled' || error === 'interrupted' || error === 'cancelled'
}

const CANCEL_SETTLE_MS = 100
const CANCEL_GIVE_UP_MS = 400

/**
 * Speak after a cancel from this turn has finished clearing the queue.
 * Chrome applies cancel asynchronously and drops an utterance queued before that.
 */
export function speakWhenReady(
  utterance: SpeechSynthesisUtterance,
  isCurrent: () => boolean,
  onSpeakError: () => void,
  options?: { waitForCancel?: boolean; onQueued?: () => void },
): void {
  if (!canSpeak()) {
    onSpeakError()
    return
  }
  const synth = window.speechSynthesis
  const settleMs = options?.waitForCancel ? CANCEL_SETTLE_MS : 0
  const started = Date.now()
  const step = () => {
    if (!isCurrent()) return
    let busy = false
    try {
      busy = Boolean(synth.speaking || synth.pending)
    } catch {
      busy = false
    }
    const age = Date.now() - started
    if ((busy || age < settleMs) && age < CANCEL_GIVE_UP_MS) {
      window.setTimeout(step, 20)
      return
    }
    try {
      if (synth.paused) synth.resume()
    } catch {
      // speak() below still runs when resume is refused.
    }
    try {
      synth.speak(utterance)
      options?.onQueued?.()
    } catch {
      onSpeakError()
    }
  }
  window.setTimeout(step, 0)
}

/**
 * Read on-device voices without letting voiceschanged call back into getVoices().
 * Phones often emit that event from getVoices() itself.
 */
export function subscribeVoices(onChange: (voices: SpeechSynthesisVoice[]) => void): () => void {
  if (!canSpeak()) {
    onChange([])
    return () => {}
  }
  const synth = window.speechSynthesis
  let reading = false
  let lastKey = ''
  const emit = () => {
    if (reading) return
    reading = true
    let next: SpeechSynthesisVoice[] = []
    try {
      next = synth.getVoices()
    } catch {
      next = []
    }
    reading = false
    const key = next.map((voice) => `${voice.voiceURI}\0${voice.lang}\0${voice.name}`).join('\n')
    if (key === lastKey) return
    lastKey = key
    onChange(next)
  }
  emit()
  synth.addEventListener?.('voiceschanged', emit)
  const retry = window.setTimeout(emit, 250)
  return () => {
    synth.removeEventListener?.('voiceschanged', emit)
    window.clearTimeout(retry)
  }
}

function voiceLabel(voice: SpeechSynthesisVoice): string {
  return `${voice?.name || ''} ${voice?.voiceURI || ''}`.toLowerCase()
}

function normalizedLang(voice: SpeechSynthesisVoice): string {
  return (voice?.lang || '').toLowerCase().replace(/_/g, '-')
}

/** en-US, including US names whose lang string is only "en". */
function isAmericanEnglish(voice: SpeechSynthesisVoice): boolean {
  const lang = normalizedLang(voice)
  if (lang === 'en-us' || lang.startsWith('en-us-')) return true
  return /\ben-us\b|united states|u\.s\. english|american english/.test(voiceLabel(voice))
}

/** en-GB and other UK voices (Daniel, Google UK English). Not used when an en-US voice exists. */
function isBritishEnglish(voice: SpeechSynthesisVoice): boolean {
  const lang = normalizedLang(voice)
  const label = voiceLabel(voice)
  if (lang === 'en-gb' || lang.startsWith('en-gb-')) return true
  if (/\ben-gb\b|united kingdom|british/.test(label)) return true
  if (/\buk\b/.test(label) && /\benglish\b/.test(label)) return true
  if (/\bdaniel\b/.test(label) && !lang.startsWith('en-us')) return true
  return false
}

function scoreVoice(voice: SpeechSynthesisVoice, language: Language): number {
  const lang = normalizedLang(voice)
  if (language === 'en') {
    if (!lang.startsWith('en') && !isAmericanEnglish(voice)) return -1
    let score = 1
    if (isAmericanEnglish(voice) && !isBritishEnglish(voice)) score += 12
    else if (isBritishEnglish(voice)) score += 0
    else score += 2
    if (voice.localService) score += 5
    return score
  }
  if (!lang.startsWith(language)) return -1
  let score = 1
  if (language === 'es' && (lang.startsWith('es-es') || lang.startsWith('es-mx') || lang.startsWith('es-us'))) {
    score += 2
  }
  if (language === 'pt' && lang.startsWith('pt-br')) score += 3
  if (language === 'pt' && lang.startsWith('pt-pt')) score += 1
  if (voice.localService) score += 1
  return score
}

/** For English, drop UK and other non-US voices whenever any en-US voice is installed. */
function preferLocale(voices: SpeechSynthesisVoice[], language: Language): SpeechSynthesisVoice[] {
  if (language !== 'en') return voices
  const american = voices.filter((voice) => isAmericanEnglish(voice) && !isBritishEnglish(voice))
  return american.length > 0 ? american : voices
}

function hasToken(haystack: string, word: 'male' | 'female'): boolean {
  const pattern = word === 'female' ? /(?:^|[^a-z])female(?:[^a-z]|$)/ : /(?:^|[^a-z])male(?:[^a-z]|$)/
  return pattern.test(haystack)
}

export function classifyGender(voice: SpeechSynthesisVoice): Exclude<VoiceGender, 'default'> | 'unknown' {
  const haystack = `${voice?.name || ''} ${voice?.voiceURI || ''}`.toLowerCase()
  if (hasToken(haystack, 'female') || /\b(woman|girl)\b/.test(haystack)) return 'female'
  if (hasToken(haystack, 'male') || /\b(man|boy)\b/.test(haystack)) return 'male'
  if (FEMALE_NAMES.test(haystack)) return 'female'
  if (MALE_NAMES.test(haystack)) return 'male'
  return 'unknown'
}

function ranked(voices: SpeechSynthesisVoice[], language: Language, gender: VoiceGender) {
  const rows: { voice: SpeechSynthesisVoice; score: number }[] = []
  for (const voice of voices) {
    const score = scoreVoice(voice, language)
    if (score < 0) continue
    if (gender !== 'default' && classifyGender(voice) !== gender) continue
    rows.push({ voice, score })
  }
  rows.sort(
    (a, b) =>
      b.score - a.score ||
      Number(b.voice.localService) - Number(a.voice.localService) ||
      (a.voice.name || '').localeCompare(b.voice.name || ''),
  )
  return rows
}

function pickStyled(
  pool: { voice: SpeechSynthesisVoice; score: number }[],
  style: VoiceStyle,
): SpeechSynthesisVoice | undefined {
  const best = pool[0]
  if (!best) return undefined
  if (pool.length === 1 || style === 'clear') return best.voice
  if (style === 'warm') {
    const alt = pool.find((row, index) => index > 0 && best.score - row.score <= 2)
    return (alt ?? best).voice
  }
  const local = pool.find((row) => row.voice.localService && best.score - row.score <= 1)
  return (local ?? best).voice
}

/** Best on-device voice for this language, gender, and style. */
export function selectVoice(
  voices: SpeechSynthesisVoice[],
  language: Language,
  prefs: VoicePrefs,
): SpeechSynthesisVoice | undefined {
  const localeVoices = preferLocale(
    voices.filter((voice) => scoreVoice(voice, language) >= 0),
    language,
  )
  const pool = ranked(localeVoices, language, prefs.gender)
  // No opposite-gender fill-in. A missing male voice uses pitch, not a female voice.
  if (pool.length === 0) return undefined
  return pickStyled(pool, prefs.style)
}

export function pickVoice(language: Language, prefs: VoicePrefs = readVoicePrefs()): SpeechSynthesisVoice | undefined {
  if (!canSpeak()) return undefined
  try {
    return selectVoice(window.speechSynthesis.getVoices(), language, prefs)
  } catch {
    return undefined
  }
}

export type VoiceApplyOptions = {
  /** System voice with a gender pitch shift, skipping a matched voice that failed to speak. */
  pitchOnly?: boolean
}

function isVoice(value: unknown): value is SpeechSynthesisVoice {
  if (!value || typeof value !== 'object') return false
  if (typeof SpeechSynthesisVoice !== 'undefined' && value instanceof SpeechSynthesisVoice) return true
  const voice = value as SpeechSynthesisVoice
  return typeof voice.name === 'string' && typeof voice.lang === 'string'
}

function clearVoice(utterance: SpeechSynthesisUtterance) {
  try {
    utterance.voice = null
  } catch {
    // An engine that rejects a cleared voice still speaks on its default.
  }
}

function pitchFor(prefs: VoicePrefs, matched: boolean): number {
  const base = (STYLE[prefs.style] ?? STYLE.clear).pitch
  if (matched || prefs.gender === 'default') return base
  const scaled = base * (GENDER_PITCH[prefs.gender] ?? 1)
  // Keep the two fallbacks from meeting in the middle of the 0–2 range.
  if (prefs.gender === 'male') return clampPitch(Math.min(scaled, 0.7))
  if (prefs.gender === 'female') return clampPitch(Math.max(scaled, 1.25))
  return clampPitch(scaled)
}

function genderMatches(voice: SpeechSynthesisVoice, gender: VoiceGender): boolean {
  if (gender === 'default') return true
  const classified = classifyGender(voice)
  if (gender === 'male' && classified === 'female') return false
  if (gender === 'female' && classified === 'male') return false
  return classified === gender
}

function applyPitchFallback(utterance: SpeechSynthesisUtterance, language: Language, prefs: VoicePrefs) {
  const prosody = STYLE[prefs.style] ?? STYLE.clear
  clearVoice(utterance)
  try {
    utterance.lang = utteranceLanguage(language)
  } catch {
    // The language set by the caller still applies.
  }
  try {
    utterance.rate = prosody.rate
    utterance.pitch = pitchFor(prefs, false)
  } catch {
    // Rate and pitch are best-effort.
  }
}

/**
 * Apply the shared Voice preference to an utterance. Never throws.
 * A male or female choice uses a matching voice when one is installed.
 * Otherwise, and when assigning that voice throws, the system voice speaks
 * with a gender pitch shift.
 */
export function applyVoice(
  utterance: SpeechSynthesisUtterance,
  language: Language,
  prefs: VoicePrefs = readVoicePrefs(),
  options?: VoiceApplyOptions,
): void {
  const prosody = STYLE[prefs.style] ?? STYLE.clear
  try {
    utterance.rate = prosody.rate
    utterance.pitch = prosody.pitch
    utterance.lang = utteranceLanguage(language)
  } catch {
    // The engine can still speak with its own defaults.
  }

  if (options?.pitchOnly) {
    applyPitchFallback(utterance, language, prefs)
    return
  }

  const voice = pickVoice(language, prefs)
  const matched = isVoice(voice) && genderMatches(voice, prefs.gender)
  if (!matched || !voice) {
    applyPitchFallback(utterance, language, prefs)
    return
  }

  try {
    utterance.pitch = pitchFor(prefs, true)
    // English stays en-US even if the chosen voice reports another locale.
    // Set lang before voice so the assignment is not cleared.
    utterance.lang = language === 'en' ? utteranceLanguage(language) : voice.lang || utteranceLanguage(language)
    utterance.voice = voice
  } catch {
    applyPitchFallback(utterance, language, prefs)
  }
}
