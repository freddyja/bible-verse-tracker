import type { Language } from '../i18n/messages'

/**
 * Speech-recognition locale for the app language.
 * Spanish is es-US because Freddy is in Florida; Read Out Loud stays on its own locale.
 */
const RECOGNITION_LANG: Record<Language, string> = {
  en: 'en-US',
  es: 'es-US',
  pt: 'pt-BR',
}

export function recognitionLanguage(language: Language): string {
  return RECOGNITION_LANG[language]
}

/** Insert spoken words at the caret, or append them, with a single separating space. */
export function applyDictation(prefix: string, spoken: string, suffix: string): string {
  const words = spoken.replace(/\s+/g, ' ').trim()
  if (!words) return prefix + suffix
  const lead = prefix.length > 0 && !/[\s([{"“¿¡]$/.test(prefix) ? ' ' : ''
  const trail = suffix.length > 0 && !/^[\s.,;:!?¿¡)\]}"”']/.test(suffix) ? ' ' : ''
  return `${prefix}${lead}${words}${trail}${suffix}`
}

export type DictationFailure = 'unavailable' | 'mic' | 'failed'

type DictationListener = {
  onUpdate: (transcript: string) => void
  /** The engine ended a segment. Fold the last transcript in before the next one arrives. */
  onRestart: () => void
  onEnd: () => void
  onError: (failure: DictationFailure) => void
}

type ResultRow = {
  [index: number]: { transcript: string } | undefined
}

type DictationResultEvent = {
  results: ArrayLike<ResultRow>
}

type DictationErrorEvent = {
  error?: string
}

type DictationEngine = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: DictationResultEvent) => void) | null
  onerror: ((event: DictationErrorEvent) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type DictationCtor = new () => DictationEngine

type Session = {
  id: number
  lang: string
  recognition: DictationEngine | null
  listener: DictationListener
  stopped: boolean
  done: boolean
  accepting: boolean
  everHeard: boolean
  emptyEnds: number
  rapidEnds: number
  startedAt: number
  restartTimer: number
}

/** iOS ends each phrase. Leaving continuous on there often fails the whole session. */
function prefersContinuous(): boolean {
  if (typeof navigator === 'undefined') return true
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua)) return false
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return false
  return true
}

function dictationCtor(): DictationCtor | null {
  if (typeof window === 'undefined') return null
  const host = window as unknown as {
    SpeechRecognition?: DictationCtor
    webkitSpeechRecognition?: DictationCtor
  }
  return host.SpeechRecognition ?? host.webkitSpeechRecognition ?? null
}

export function canDictate(): boolean {
  return dictationCtor() !== null
}

let active: Session | null = null
let nextId = 1

function transcriptOf(event: DictationResultEvent): string {
  let text = ''
  for (let index = 0; index < event.results.length; index += 1) {
    text += event.results[index]?.[0]?.transcript ?? ''
  }
  return text
}

function failureKind(error: string | undefined): DictationFailure | null {
  if (!error || error === 'aborted' || error === 'no-speech') return null
  if (error === 'not-allowed' || error === 'service-not-allowed' || error === 'audio-capture') return 'mic'
  return 'failed'
}

function detach(engine: DictationEngine | null) {
  if (!engine) return
  engine.onresult = null
  engine.onerror = null
  engine.onend = null
  try {
    engine.abort()
  } catch {
    // The engine may already be stopped.
  }
}

function endSession(session: Session, notify: 'end' | 'error', failure?: DictationFailure) {
  if (session.done) return
  session.done = true
  session.stopped = true
  session.accepting = false
  if (session.restartTimer) window.clearTimeout(session.restartTimer)
  if (active?.id === session.id) active = null
  detach(session.recognition)
  session.recognition = null
  if (notify === 'error') session.listener.onError(failure ?? 'failed')
  else session.listener.onEnd()
}

function bind(session: Session, recognition: DictationEngine) {
  session.recognition = recognition
  recognition.lang = session.lang
  recognition.continuous = prefersContinuous()
  recognition.interimResults = true

  recognition.onresult = (event) => {
    if (session.done || !session.accepting || active?.id !== session.id) return
    const transcript = transcriptOf(event)
    if (!transcript.trim()) return
    session.everHeard = true
    session.emptyEnds = 0
    session.listener.onUpdate(transcript)
  }

  recognition.onerror = (event) => {
    if (session.done || active?.id !== session.id) return
    const kind = failureKind(event.error)
    if (!kind) return
    endSession(session, 'error', kind)
  }

  recognition.onend = () => {
    if (session.done) return
    session.accepting = false
    recognition.onresult = null
    recognition.onerror = null
    recognition.onend = null
    if (session.stopped) {
      endSession(session, 'end')
      return
    }
    if (!session.everHeard) {
      session.emptyEnds += 1
      if (session.emptyEnds > 2) {
        endSession(session, 'end')
        return
      }
    }
    const brief = Date.now() - session.startedAt < 500
    if (brief) {
      session.rapidEnds += 1
      if (session.rapidEnds > 4) {
        endSession(session, session.everHeard ? 'end' : 'error', 'failed')
        return
      }
    } else {
      session.rapidEnds = 0
    }
    scheduleRestart(session)
  }
}

function scheduleRestart(session: Session) {
  if (session.done || session.stopped) return
  session.listener.onRestart()
  session.restartTimer = window.setTimeout(() => {
    session.restartTimer = 0
    if (session.done || session.stopped || active?.id !== session.id) return
    const Ctor = dictationCtor()
    if (!Ctor) {
      endSession(session, session.everHeard ? 'end' : 'error', 'failed')
      return
    }
    let recognition: DictationEngine
    try {
      recognition = new Ctor()
    } catch {
      endSession(session, session.everHeard ? 'end' : 'error', 'failed')
      return
    }
    bind(session, recognition)
    session.accepting = true
    session.startedAt = Date.now()
    try {
      recognition.start()
    } catch {
      endSession(session, session.everHeard ? 'end' : 'error', 'failed')
    }
  }, 160)
}

/**
 * Stop the active dictation session and release the microphone.
 * `discard` drops a late final result, used when the person typed over the session.
 */
export function stopDictation(options?: { discard?: boolean }) {
  const session = active
  if (!session || session.done) return
  session.stopped = true
  if (options?.discard) session.accepting = false
  if (session.restartTimer) {
    window.clearTimeout(session.restartTimer)
    session.restartTimer = 0
    endSession(session, 'end')
    return
  }
  const engine = session.recognition
  if (!engine) {
    endSession(session, 'end')
    return
  }
  try {
    engine.stop()
  } catch {
    endSession(session, 'end')
  }
}

/**
 * Start dictation from a user gesture. The microphone is requested here, not before.
 * Returns null when this browser has no SpeechRecognition.
 */
export function startDictation(language: Language, listener: DictationListener): number | null {
  const Ctor = dictationCtor()
  if (!Ctor) {
    listener.onError('unavailable')
    return null
  }
  if (active && !active.done) endSession(active, 'end')

  let recognition: DictationEngine
  try {
    recognition = new Ctor()
  } catch {
    listener.onError('unavailable')
    return null
  }

  const session: Session = {
    id: nextId,
    lang: recognitionLanguage(language),
    recognition: null,
    listener,
    stopped: false,
    done: false,
    accepting: true,
    everHeard: false,
    emptyEnds: 0,
    rapidEnds: 0,
    startedAt: Date.now(),
    restartTimer: 0,
  }
  nextId += 1
  active = session
  bind(session, recognition)

  try {
    recognition.start()
  } catch {
    endSession(session, 'error', 'failed')
    return null
  }
  return session.id
}
