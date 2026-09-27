import type { Language } from '../i18n/messages'
import { readVoicePrefs, type VoicePrefs, type VoiceStyle } from './prefs'

const utteranceLang: Record<Language, string> = {
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
}

/**
 * Pace and tone on top of the phone's own voice.
 * Pitch is the timbre shift; rate is the pace. Neither picks a different voice.
 */
const STYLE: Record<VoiceStyle, { rate: number; pitch: number }> = {
  calm: { rate: 0.82, pitch: 0.92 },
  clear: { rate: 0.96, pitch: 1 },
  warm: { rate: 0.9, pitch: 1.08 },
}

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

const VOICES_WAIT_MS = 1200
const VOICES_POLL_MS = 80

/**
 * Run once the engine has reported voices. The first getVoices() call is often
 * empty. iOS Safari often never fires voiceschanged, so this also polls.
 * Waiting keeps Read Out Loud from starting before the phone's speech engine
 * is ready. The system voice is left in place.
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

export type VoiceApplyOptions = {
  /**
   * A failed first speak can try again. The retry uses the same system voice
   * and style. It does not switch voices or shift pitch for gender.
   */
  pitchOnly?: boolean
}

function clearVoice(utterance: SpeechSynthesisUtterance) {
  try {
    utterance.voice = null
  } catch {
    // An engine that rejects a cleared voice still speaks on its default.
  }
}

/**
 * Read Out Loud uses the device's default voice for this language.
 * Calm, Clear, and Warm only change rate and pitch on that voice.
 */
export function applyVoice(
  utterance: SpeechSynthesisUtterance,
  language: Language,
  prefs: VoicePrefs = readVoicePrefs(),
  options?: VoiceApplyOptions,
): void {
  // A retry after a failed speak uses this same style. It does not pick a voice.
  void options
  const prosody = STYLE[prefs.style] ?? STYLE.clear
  try {
    utterance.lang = utteranceLanguage(language)
    utterance.rate = prosody.rate
    utterance.pitch = prosody.pitch
  } catch {
    // The engine can still speak with its own defaults.
  }
  clearVoice(utterance)
}

