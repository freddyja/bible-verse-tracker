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
 * Female fallback stays high. Male fallback does not use a scale: iOS Safari
 * speaks every pitch at or below 0.5 as the same sound, and a value under that
 * floor is often ignored so the verse stays at pitch 1 (Samantha, unchanged).
 * Android and desktop will honor a pitch under that floor.
 */
const FEMALE_PITCH_SCALE = 1.4
const FEMALE_PITCH_FLOOR = 1.25
const IOS_PITCH_FLOOR = 0.5
const OTHER_MALE_FALLBACK_PITCH = 0.35
/**
 * Slower speech reads as lower. iOS will not go below pitch 0.5, so rate
 * carries the rest of the difference. Stay above 0.5 so Safari does not keep
 * an earlier, faster rate.
 */
const MALE_FALLBACK_RATE_SCALE = 0.7

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
  /\b(samantha|victoria|karen|moira|tessa|fiona|veena|zira|hazel|serena|allison|ava|susan|zoe|nicky|joelle|noelle|salli|kimberly|joanna|kendra|sara|sarah|michelle|ashley|amber|ana|elizabeth|cora|nancy|emma|jane|kathy|paulina|monica|mónica|luciana|francisca|fernanda|joana|amelie|amélie|milena|helena|aria|jenny|sonia|libby|grandma|princess|shelley)\b/i
/**
 * US male names include Microsoft David/Mark/Guy and the iOS voices Alex, Fred,
 * and Aaron. Spanish and Portuguese names stay in the list so those languages
 * can use them. English Male still refuses anything that is not en-US.
 */
const MALE_NAMES =
  /\b(alex|daniel|fred|oliver|rishi|david|mark|george|aaron|evan|nathan|tom|reed|arthur|jorge|juan|felipe|joaquim|diego|carlos|ricardo|guy|davis|ryan|christopher|eric|roger|steffan|stefan|brandon|jason|tony|andrew|brian|jacob|matthew)\b/i
/** Microsoft David/Mark/Guy and other named US male voices. */
const STRONG_US_MALE =
  /\b(david|mark|guy|davis|aaron|evan|nathan|ryan|christopher|eric|roger|steffan|stefan|brandon|jason|tony|andrew|brian|jacob|matthew)\b/i
/**
 * Voices iOS Safari and the home-screen app actually expose for US English:
 * Alex (older), Fred, and Aaron, including Spoken Content entries marked Male.
 */
const IOS_US_MALE = /\b(alex|fred|aaron|evan|nathan|reed|tom)\b/i

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

const VOICES_WAIT_MS = 1200
const VOICES_POLL_MS = 80

/**
 * Run once the engine has reported voices. The first getVoices() call is often
 * empty. iOS Safari often never fires voiceschanged, so this also polls.
 * Speaking before that list arrives uses whatever default the phone has —
 * frequently Samantha or another female voice, with no chance to pick Aaron.
 */
export function whenVoicesReady(isCurrent: () => boolean, run: () => void): void {
  if (!canSpeak()) {
    if (isCurrent()) run()
    return
  }
  const synth = window.speechSynthesis
  const read = (): SpeechSynthesisVoice[] => {
    try {
      return synth.getVoices()
    } catch {
      return []
    }
  }
  if (read().length > 0) {
    if (isCurrent()) run()
    return
  }
  let finished = false
  let timer = 0
  let poll = 0
  const finish = () => {
    if (finished) return
    finished = true
    synth.removeEventListener?.('voiceschanged', onVoices)
    window.clearTimeout(timer)
    window.clearInterval(poll)
    if (!isCurrent()) return
    run()
  }
  const onVoices = () => {
    if (read().length > 0) finish()
  }
  synth.addEventListener?.('voiceschanged', onVoices)
  poll = window.setInterval(() => {
    if (read().length > 0) finish()
  }, VOICES_POLL_MS)
  timer = window.setTimeout(finish, VOICES_WAIT_MS)
}

function voiceLabel(voice: SpeechSynthesisVoice): string {
  return `${voice?.name || ''} ${voice?.voiceURI || ''}`
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/([a-z])multilingual(?=neural\b|\b)/g, '$1')
    .replace(/([a-z])neural\b/g, '$1')
}

function normalizedLang(voice: SpeechSynthesisVoice): string {
  return (voice?.lang || '').toLowerCase().replace(/_/g, '-')
}

/** en-GB, en-AU, and other English locales that are not United States. */
function isNonAmericanEnglish(voice: SpeechSynthesisVoice): boolean {
  const lang = normalizedLang(voice)
  const label = voiceLabel(voice)
  if (/^en-(?!us)[a-z]{2}(?:-|$)/.test(lang)) return true
  if (/\ben-(gb|au|in|ie|za|nz|ca|sg|hk|ph|ng|ke|tz|gh)\b/.test(label)) return true
  if (/\bunited kingdom\b|\bbritish\b|\baustralian english\b|\bindian english\b/.test(label)) return true
  if (/\buk\b/.test(label) && /\benglish\b/.test(label)) return true
  // Daniel, Oliver, Rishi, Arthur, and George are UK voices unless tagged en-US.
  if (!lang.startsWith('en-us') && /\b(daniel|oliver|rishi|arthur|george)\b/.test(label)) return true
  return false
}

/**
 * en-US, including "Google US English" and US names whose lang string is only "en".
 * A non-US locale never counts, even if the label also mentions English.
 */
function isUsEnglishVoice(voice: SpeechSynthesisVoice): boolean {
  if (isNonAmericanEnglish(voice)) return false
  const lang = normalizedLang(voice)
  const label = voiceLabel(voice)
  if (lang === 'en-us' || lang.startsWith('en-us-')) return true
  if (/\ben-us\b|united states|u\.s\. english|american english/.test(label)) return true
  if (isGoogleUsEnglish(label)) return true
  if (
    (lang === 'en' || lang === '') &&
    /\b(alex|fred|aaron|evan|nathan|tom|samantha|allison|ava|susan|zoe|nicky|victoria|zira|david|mark|guy|davis)\b/.test(
      label,
    )
  ) {
    return true
  }
  // Spoken Content "Male" and Android male URI codes often report lang "en" or blank.
  if ((lang === 'en' || lang === '' || lang.startsWith('en-us')) && (hasToken(label, 'male') || isAndroidUsMale(label))) {
    return true
  }
  return false
}

/**
 * "Google US English" names a locale, not a gender. On desktop Chrome the
 * network voice is male. On Android the same label is usually the female
 * default, so it must not win Male there.
 */
function isGoogleUsEnglish(label: string): boolean {
  if (hasToken(label, 'female') || /\b(woman|girl)\b/.test(label)) return false
  if (!/\bgoogle\b/.test(label)) return false
  return /\bus english\b/.test(label) || /\bu\.s\. english\b/.test(label) || /\bamerican english\b/.test(label)
}

export type VoicePlatform = 'ios' | 'android' | 'other'

export function voicePlatform(): VoicePlatform {
  if (typeof navigator === 'undefined') return 'other'
  const ua = navigator.userAgent || ''
  const platform = navigator.platform || ''
  if (/Android/i.test(ua)) return 'android'
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  // iPadOS 13+ reports itself as a Mac.
  if (platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1) return 'ios'
  return 'other'
}

/**
 * Google TTS codes that do not say "male". Heard as male on Android 11:
 * en-us-x-iom, en-us-x-iol, en-us-x-tpd. Codes that say #male also count.
 * en-us-x-tpf / sfg / iob are female and are refused below.
 */
function isAndroidUsMale(label: string): boolean {
  if (hasToken(label, 'female') || /\b(woman|girl)\b/.test(label) || /#female\b/.test(label)) return false
  if (/en-us-x-(?:iom|iol|tpd)\b/.test(label)) return true
  if (!/en-us-x-[a-z0-9]+\b/.test(label)) return false
  return hasToken(label, 'male') || /#male\b/.test(label) || /\b(man|boy)\b/.test(label)
}

/** Female Android codes, including sfg without an explicit #male twin. */
function isAndroidUsFemaleCode(label: string): boolean {
  if (hasToken(label, 'male') || /#male\b/.test(label)) return false
  if (hasToken(label, 'female') || /#female\b/.test(label)) return /en-us/.test(label)
  return /en-us-x-(?:tpf|tpc|sfg|iob|sfb)\b/.test(label)
}

/**
 * Desktop Chrome's "Google US English" is male. The same label on a phone is
 * the female default, so iOS and Android never treat it as male.
 */
function isDesktopGoogleUsMale(voice: SpeechSynthesisVoice): boolean {
  if (voicePlatform() !== 'other') return false
  const label = voiceLabel(voice)
  if (isAndroidUsFemaleCode(label)) return false
  return isGoogleUsEnglish(label)
}

/**
 * Samantha, Nicky, Karen, Android female codes, unlabeled Google US English
 * on a phone, and any UK English voice cannot be Male.
 */
function isBlockedEnglishMaleVoice(voice: SpeechSynthesisVoice): boolean {
  const label = voiceLabel(voice)
  if (hasToken(label, 'female') || /\b(woman|girl)\b/.test(label)) return true
  if (FEMALE_NAMES.test(label)) return true
  if (/\b(samantha|nicky|karen)\b/.test(label)) return true
  if (/\bgoogle\b/.test(label) && /\buk\b/.test(label) && /\benglish\b/.test(label)) return true
  if (isAndroidUsFemaleCode(label)) return true
  if (voicePlatform() !== 'other' && isGoogleUsEnglish(label) && !isAndroidUsMale(label)) return true
  if (isNonAmericanEnglish(voice) || !isUsEnglishVoice(voice)) return true
  return false
}

/**
 * Gender of Google en-US Neural2 / WaveNet / Standard voices, which are letters
 * rather than names. The map is en-US only — en-AU-Neural2-A is female.
 */
function usCodedGender(label: string): Exclude<VoiceGender, 'default'> | undefined {
  const match = label.match(
    /\ben-us-(neural2|wavenet|standard|news|studio|casual|polyglot|journey|chirp-hd)-([a-z0-9]+)\b/,
  )
  if (!match) return undefined
  const family = match[1]
  const id = match[2]
  if (family === 'neural2' || family === 'wavenet' || family === 'standard') {
    if (id.length !== 1) return undefined
    if (family === 'neural2' && id === 'b') return undefined
    if ('abdij'.includes(id)) return 'male'
    if ('cefgh'.includes(id)) return 'female'
    return undefined
  }
  if (family === 'news') {
    if (id === 'k' || id === 'l') return 'female'
    if (id === 'm' || id === 'n') return 'male'
  }
  if (family === 'studio') {
    if (id === 'o') return 'female'
    if (id === 'q') return 'male'
  }
  if (family === 'casual' && id === 'k') return 'male'
  if (family === 'polyglot' && id === '1') return 'male'
  if (family === 'journey' || family === 'chirp-hd') {
    if (id === 'd') return 'male'
    if (id === 'f' || id === 'o') return 'female'
  }
  return undefined
}

function scoreVoice(voice: SpeechSynthesisVoice, language: Language): number {
  const lang = normalizedLang(voice)
  if (language === 'en') {
    if (!lang.startsWith('en') && !isUsEnglishVoice(voice)) return -1
    let score = 1
    if (isUsEnglishVoice(voice)) score += 12
    else if (isNonAmericanEnglish(voice)) score += 0
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
  const american = voices.filter((voice) => isUsEnglishVoice(voice))
  return american.length > 0 ? american : voices
}

function hasToken(haystack: string, word: 'male' | 'female'): boolean {
  const pattern = word === 'female' ? /(?:^|[^a-z])female(?:[^a-z]|$)/ : /(?:^|[^a-z])male(?:[^a-z]|$)/
  return pattern.test(haystack)
}

export function classifyGender(voice: SpeechSynthesisVoice): Exclude<VoiceGender, 'default'> | 'unknown' {
  const haystack = voiceLabel(voice)
  if (hasToken(haystack, 'female') || /\b(woman|girl)\b/.test(haystack)) return 'female'
  if (hasToken(haystack, 'male') || /\b(man|boy)\b/.test(haystack)) return 'male'
  const coded = usCodedGender(haystack)
  if (coded) return coded
  if (isAndroidUsMale(haystack)) return 'male'
  if (isDesktopGoogleUsMale(voice)) return 'male'
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

function localRank(voice: SpeechSynthesisVoice): number {
  return voice.localService ? 1 : 0
}

/**
 * English Male on a phone. Every candidate is already a US male voice.
 * Local outranks remote. Within that, an explicit Male tag (including the
 * Android male URI code) outranks a name-only voice such as Alex or David.
 */
function englishMaleRank(voice: SpeechSynthesisVoice): number {
  const label = voiceLabel(voice)
  const saysMale = hasToken(label, 'male') || /\b(man|boy)\b/.test(label)
  let rank = voice.localService ? 300 : 100
  if (saysMale) rank += 50
  if (isAndroidUsMale(label)) rank += 40
  if (isGoogleUsEnglish(label) && saysMale) rank += 35
  else if (isGoogleUsEnglish(label)) rank += 20
  if (STRONG_US_MALE.test(label)) rank += 25
  if (IOS_US_MALE.test(label)) rank += 20
  if (usCodedGender(label) === 'male') rank += 15
  return rank
}

function compareEnglishMale(a: SpeechSynthesisVoice, b: SpeechSynthesisVoice): number {
  return englishMaleRank(b) - englishMaleRank(a) || localRank(b) - localRank(a) || (a.name || '').localeCompare(b.name || '')
}

type VoiceChoice = {
  voice?: SpeechSynthesisVoice
  /** Pitch has to carry gender: no clearly male en-US voice was assigned. */
  deepen: boolean
}

/**
 * English Male assigns a clearly male en-US voice when the phone has one:
 * iOS Aaron / Alex / Fred, Android en-us-x-iom / iol / tpd (and #male codes),
 * Microsoft David / Mark. Desktop Chrome's Google US English still counts.
 * Samantha, Nicky, Karen, Android female codes, Google UK English,
 * and a phone's unlabeled Google US English are refused. Otherwise nothing
 * is assigned and pitch carries gender.
 */
function chooseEnglishMale(voices: SpeechSynthesisVoice[]): VoiceChoice {
  const males = voices.filter(
    (voice) => classifyGender(voice) === 'male' && !isBlockedEnglishMaleVoice(voice),
  )
  males.sort(compareEnglishMale)
  if (males[0]) return { voice: males[0], deepen: false }
  return { deepen: true }
}

function voiceDisplayName(voice: SpeechSynthesisVoice): string {
  const name = (voice.name || '').trim()
  const uri = voice.voiceURI || ''
  const generic = !name || /^english\b/i.test(name)
  if (generic && (hasToken(voiceLabel(voice), 'male') || isAndroidUsMale(voiceLabel(voice)))) {
    return name ? `${name} (Male)` : uri
  }
  return name || uri
}

export type MaleVoiceLabel = { mode: 'hidden' } | { mode: 'voice'; name: string } | { mode: 'pitch' }

/** What Settings should say for English Male: the chosen voice, or the pitch fallback. */
export function maleVoiceLabel(
  voices: SpeechSynthesisVoice[],
  language: Language,
  prefs: VoicePrefs,
): MaleVoiceLabel {
  if (prefs.gender !== 'male' || voices.length === 0) return { mode: 'hidden' }
  const choice = language === 'en' ? chooseEnglishMale(voices) : voiceChoice(voices, language, prefs)
  if (!choice.deepen && choice.voice) return { mode: 'voice', name: voiceDisplayName(choice.voice) }
  return { mode: 'pitch' }
}

function voiceChoice(voices: SpeechSynthesisVoice[], language: Language, prefs: VoicePrefs): VoiceChoice {
  if (language === 'en' && prefs.gender === 'male') return chooseEnglishMale(voices)
  const localeVoices = preferLocale(
    voices.filter((voice) => scoreVoice(voice, language) >= 0),
    language,
  )
  const pool = ranked(localeVoices, language, prefs.gender)
  // No opposite-gender fill-in. A missing voice uses pitch, not the other gender.
  if (pool.length === 0) return { deepen: prefs.gender !== 'default' }
  const voice = pickStyled(pool, prefs.style)
  if (!voice) return { deepen: prefs.gender !== 'default' }
  return { voice, deepen: false }
}

/** Best on-device voice for this language, gender, and style. */
export function selectVoice(
  voices: SpeechSynthesisVoice[],
  language: Language,
  prefs: VoicePrefs,
): SpeechSynthesisVoice | undefined {
  return voiceChoice(voices, language, prefs).voice
}

/**
 * True when English Male will lower the pitch because this phone has no
 * clearly male en-US voice. Empty lists stay false so the hint does not flash
 * before the engine reports its voices.
 */
export function usesDeepMalePitch(
  voices: SpeechSynthesisVoice[],
  language: Language,
  prefs: VoicePrefs,
): boolean {
  return maleVoiceLabel(voices, language, prefs).mode === 'pitch'
}

export function pickVoice(language: Language, prefs: VoicePrefs = readVoicePrefs()): SpeechSynthesisVoice | undefined {
  return selectVoice(installedVoices(), language, prefs)
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

function maleFallbackPitch(): number {
  return voicePlatform() === 'ios' ? IOS_PITCH_FLOOR : OTHER_MALE_FALLBACK_PITCH
}

function pitchFor(prefs: VoicePrefs, matched: boolean): number {
  const base = (STYLE[prefs.style] ?? STYLE.clear).pitch
  if (matched || prefs.gender === 'default') return base
  // Female stays high. Male uses the lowest pitch this device will speak.
  if (prefs.gender === 'male') return maleFallbackPitch()
  if (prefs.gender === 'female') return clampPitch(Math.max(base * FEMALE_PITCH_SCALE, FEMALE_PITCH_FLOOR))
  return clampPitch(base)
}

function rateFor(prefs: VoicePrefs, matched: boolean): number {
  const base = (STYLE[prefs.style] ?? STYLE.clear).rate
  if (matched || prefs.gender !== 'male') return base
  const scaled = Math.round(base * MALE_FALLBACK_RATE_SCALE * 100) / 100
  return Math.max(0.55, scaled)
}

function installedVoices(): SpeechSynthesisVoice[] {
  if (!canSpeak()) return []
  try {
    return window.speechSynthesis.getVoices()
  } catch {
    return []
  }
}

/** A chosen English male voice must be en-US and must not be female. */
function englishMaleVoiceAllowed(voice: SpeechSynthesisVoice): boolean {
  if (!isUsEnglishVoice(voice)) return false
  return classifyGender(voice) !== 'female'
}

function applyPitchFallback(utterance: SpeechSynthesisUtterance, language: Language, prefs: VoicePrefs) {
  clearVoice(utterance)
  try {
    utterance.lang = utteranceLanguage(language)
  } catch {
    // The language set by the caller still applies.
  }
  try {
    utterance.rate = rateFor(prefs, false)
    utterance.pitch = pitchFor(prefs, false)
  } catch {
    // Rate and pitch are best-effort.
  }
}

/** Keep the voice's own lang tag so Android does not drop it and speak the default. */
function langForAssignedVoice(voice: SpeechSynthesisVoice, language: Language): string {
  const raw = voice.lang || ''
  const lang = normalizedLang(voice)
  if (language === 'en') {
    if (!lang || lang === 'en') return utteranceLanguage(language)
    return raw
  }
  return raw || utteranceLanguage(language)
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

  const choice = voiceChoice(installedVoices(), language, prefs)
  const voice = choice.voice
  if (!isVoice(voice)) {
    applyPitchFallback(utterance, language, prefs)
    return
  }
  if (prefs.gender === 'male' && classifyGender(voice) === 'female') {
    applyPitchFallback(utterance, language, prefs)
    return
  }
  if (prefs.gender === 'female' && classifyGender(voice) === 'male') {
    applyPitchFallback(utterance, language, prefs)
    return
  }
  if (language === 'en' && prefs.gender === 'male' && (isBlockedEnglishMaleVoice(voice) || !englishMaleVoiceAllowed(voice))) {
    applyPitchFallback(utterance, language, prefs)
    return
  }

  const gendered = !choice.deepen && (prefs.gender === 'default' || classifyGender(voice) === prefs.gender)
  try {
    // Set lang before voice so the assignment is not cleared, then pitch last.
    // Use the voice's own lang string (en_US on Android) instead of forcing en-US.
    utterance.lang = langForAssignedVoice(voice, language)
    utterance.voice = voice
    utterance.rate = rateFor(prefs, gendered)
    utterance.pitch = pitchFor(prefs, gendered)
  } catch {
    applyPitchFallback(utterance, language, prefs)
  }
}
