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

export function cancelSpeech(): void {
  if (!canSpeak()) return
  try {
    window.speechSynthesis.cancel()
  } catch {
    // The engine can refuse a cancel before the first utterance.
  }
}

function scoreVoice(voice: SpeechSynthesisVoice, language: Language): number {
  const lang = (voice?.lang || '').toLowerCase()
  if (!lang.startsWith(language)) return -1
  let score = 1
  if (language === 'en' && lang.startsWith('en-us')) score += 2
  if (language === 'es' && (lang.startsWith('es-es') || lang.startsWith('es-mx') || lang.startsWith('es-us'))) {
    score += 2
  }
  if (language === 'pt' && lang.startsWith('pt-br')) score += 3
  if (language === 'pt' && lang.startsWith('pt-pt')) score += 1
  if (voice.localService) score += 1
  return score
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

export type GenderAvailability = {
  /** False until the browser has reported at least one voice. */
  ready: boolean
  male: boolean
  female: boolean
}

export function genderAvailability(voices: SpeechSynthesisVoice[], language: Language): GenderAvailability {
  if (voices.length === 0) return { ready: false, male: false, female: false }
  let male = false
  let female = false
  for (const voice of voices) {
    if (scoreVoice(voice, language) < 0) continue
    const gender = classifyGender(voice)
    if (gender === 'male') male = true
    if (gender === 'female') female = true
  }
  return { ready: true, male, female }
}

export function effectiveGender(
  gender: VoiceGender,
  voices: SpeechSynthesisVoice[],
  language: Language,
): VoiceGender {
  if (gender === 'default') return 'default'
  const available = genderAvailability(voices, language)
  if (!available.ready) return gender
  if (gender === 'male' && !available.male) return 'default'
  if (gender === 'female' && !available.female) return 'default'
  return gender
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
  const gender = effectiveGender(prefs.gender, voices, language)
  let pool = ranked(voices, language, gender)
  if (pool.length === 0 && gender !== 'default') pool = ranked(voices, language, 'default')
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

/** Apply the shared Voice preference to an utterance. Never throws. */
export function applyVoice(
  utterance: SpeechSynthesisUtterance,
  language: Language,
  prefs: VoicePrefs = readVoicePrefs(),
): void {
  const prosody = STYLE[prefs.style] ?? STYLE.clear
  utterance.rate = prosody.rate
  utterance.pitch = prosody.pitch
  utterance.lang = utteranceLanguage(language)
  const voice = pickVoice(language, prefs)
  if (voice instanceof SpeechSynthesisVoice) {
    utterance.voice = voice
    if (voice.lang) utterance.lang = voice.lang
  }
}
