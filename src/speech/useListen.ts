import { useEffect, useRef, useState } from 'react'
import type { Language } from '../i18n/messages'
import { loadBook, loadVerse, peekVerse } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import type { PassageRef } from '../scripture/passages'
import { passageAfter, passageAfterSync, type ListenMode } from './passageQueue'
import { readVoicePrefs } from './prefs'
import { applyVoice, canSpeak, cancelSpeech, ignoredSpeechError, speakWhenReady, whenVoicesReady } from './voices'

type Status = 'idle' | 'playing' | 'paused'

type Session = {
  generation: number
  mode: ListenMode
  status: Exclude<Status, 'idle'>
  passage: PassageRef | null
  freeText: string | null
  spokenText: string | null
}

export type ListenController = {
  supported: boolean
  refused: boolean
  status: Status
  passage: PassageRef | null
  start: (mode: ListenMode, passage: PassageRef, text?: string) => void
  speakText: (text: string) => void
  pause: () => void
  resume: () => void
  stop: () => void
}

export function useListen(
  language: Language,
  versionId: string,
  onMove: (passage: PassageRef) => void,
): ListenController {
  const [session, setSession] = useState<Session | null>(null)
  const [refused, setRefused] = useState(false)
  const sessionRef = useRef<Session | null>(null)
  const onMoveRef = useRef(onMove)
  const languageRef = useRef(language)
  const versionRef = useRef(versionId)
  const generationRef = useRef(0)
  /** True after the current utterance has started audio (watchdog may end it). */
  const utteranceStartedRef = useRef(false)
  /** Marks the in-flight utterance settled; returns false if already settled. */
  const markUtteranceSettledRef = useRef<(() => boolean) | null>(null)

  useEffect(() => {
    onMoveRef.current = onMove
  }, [onMove])

  useEffect(() => {
    languageRef.current = language
    versionRef.current = versionId
  }, [language, versionId])

  function commit(next: Session | null) {
    sessionRef.current = next
    setSession(next)
  }

  function stop() {
    const synth = window.speechSynthesis
    const engineBusy = Boolean(synth?.speaking || synth?.pending)
    if (!sessionRef.current && !engineBusy) return
    generationRef.current += 1
    utteranceStartedRef.current = false
    markUtteranceSettledRef.current = null
    commit(null)
    synth?.cancel()
  }

  function fail(current: Session, refusedSpeech: boolean) {
    if (sessionRef.current?.generation !== current.generation) return
    generationRef.current += 1
    utteranceStartedRef.current = false
    markUtteranceSettledRef.current = null
    commit(null)
    if (refusedSpeech) setRefused(true)
  }

  /** Clear playing UI when speech stops without an intentional pause. */
  function clearUnexpected(current: Session) {
    if (sessionRef.current?.generation !== current.generation) return
    generationRef.current += 1
    utteranceStartedRef.current = false
    markUtteranceSettledRef.current = null
    commit(null)
  }

  function prefetchAhead(current: Session) {
    if (current.mode !== 'continue' || !current.passage) return
    const book = BOOKS[current.passage.bookIndex]
    if (!book || current.passage.bookIndex >= BOOKS.length - 1) return
    if (current.passage.chapter < book.chapters) return
    void loadBook(versionRef.current, current.passage.bookIndex + 1)
  }

  function knownText(current: Session): string | null {
    const cached = current.passage
      ? peekVerse(
          versionRef.current,
          current.passage.bookIndex,
          current.passage.chapter,
          current.passage.verse,
        )
      : null
    return (current.freeText ?? current.spokenText ?? cached)?.trim() || null
  }

  function utter(current: Session, text: string, delay: boolean, pitchOnly = false) {
    if (sessionRef.current?.generation !== current.generation) return
    const withText: Session = { ...current, spokenText: text, status: 'playing' }
    commit(withText)

    whenVoicesReady(
      () => sessionRef.current?.generation === current.generation,
      () => beginUtterance(current, text, delay, pitchOnly),
    )
  }

  function beginUtterance(current: Session, text: string, delay: boolean, pitchOnly: boolean) {
    if (sessionRef.current?.generation !== current.generation) return

    let utterance: SpeechSynthesisUtterance
    try {
      utterance = new SpeechSynthesisUtterance(text)
      applyVoice(utterance, languageRef.current, readVoicePrefs(), { pitchOnly })
    } catch {
      if (!pitchOnly) {
        utter(current, text, true, true)
        return
      }
      fail(current, true)
      return
    }

    let settled = false
    let started = false
    let queuedAt = 0
    const stillCurrent = () => sessionRef.current?.generation === current.generation
    const markSettled = () => {
      if (settled) return false
      settled = true
      utteranceStartedRef.current = false
      if (markUtteranceSettledRef.current === markSettled) {
        markUtteranceSettledRef.current = null
      }
      return true
    }
    markUtteranceSettledRef.current = markSettled
    utteranceStartedRef.current = false
    const retryPitch = () => {
      if (settled || !stillCurrent()) return
      markSettled()
      utter(current, text, true, true)
    }

    utterance.onstart = () => {
      started = true
      if (stillCurrent() && !settled) utteranceStartedRef.current = true
    }
    utterance.onend = () => {
      if (settled) return
      const elapsed = queuedAt ? Date.now() - queuedAt : 0
      // Same failure as Settings preview: speech ends at once, with no audio.
      // Try once more on the system voice instead of skipping the verse.
      if (!pitchOnly && !started && queuedAt > 0 && elapsed < 400) {
        retryPitch()
        return
      }
      if (!markSettled()) return
      const live = sessionRef.current
      if (!live || live.generation !== current.generation || live.status !== 'playing') return
      goNext(live)
    }
    utterance.onerror = (event) => {
      if (settled) return
      const live = sessionRef.current
      if (!live || live.generation !== current.generation) return
      if (!pitchOnly && (!ignoredSpeechError(event.error) || !started)) {
        retryPitch()
        return
      }
      if (!markSettled()) return
      // Intentional stop/start already bumped generation, so we would have
      // returned above. A cancel/interrupt here left the UI stuck on playing.
      if (ignoredSpeechError(event.error)) {
        clearUnexpected(live)
        return
      }
      fail(live, true)
    }

    if (delay) cancelSpeech()
    speakWhenReady(
      utterance,
      () => stillCurrent() && !settled && sessionRef.current?.status === 'playing',
      () => {
        if (!stillCurrent()) return
        if (!pitchOnly) retryPitch()
        else fail(current, true)
      },
      {
        waitForCancel: delay,
        onQueued: () => {
          queuedAt = Date.now()
        },
      },
    )
  }

  function speakNow(current: Session, delay: boolean) {
    const ready = knownText(current)
    if (ready) {
      utter(current, ready, delay)
      return
    }
    void speakAfterLoad(current, delay)
  }

  async function speakAfterLoad(current: Session, delay: boolean) {
    if (!current.passage) {
      fail(current, false)
      return
    }
    let text: string | null = null
    try {
      text = await loadVerse(
        versionRef.current,
        current.passage.bookIndex,
        current.passage.chapter,
        current.passage.verse,
      )
    } catch {
      fail(current, true)
      return
    }
    if (sessionRef.current?.generation !== current.generation) return
    if (!text?.trim()) {
      goNext(current)
      return
    }
    utter(current, text, delay)
  }

  function goNext(current: Session) {
    if (!current.passage || current.freeText) {
      if (sessionRef.current?.generation === current.generation) commit(null)
      return
    }
    const following = passageAfterSync(versionRef.current, current.passage, current.mode)
    if (following === undefined) {
      void goNextAsync(current)
      return
    }
    moveTo(current, following)
  }

  async function goNextAsync(current: Session) {
    if (!current.passage) return
    let following: PassageRef | null = null
    try {
      following = await passageAfter(versionRef.current, current.passage, current.mode)
    } catch {
      fail(current, false)
      return
    }
    if (sessionRef.current?.generation !== current.generation) return
    moveTo(current, following)
  }

  function moveTo(current: Session, following: PassageRef | null) {
    if (sessionRef.current?.generation !== current.generation) return
    if (!following || !current.passage) {
      commit(null)
      return
    }
    const next: Session = {
      ...current,
      passage: following,
      freeText: null,
      spokenText: null,
      status: 'playing',
    }
    commit(next)
    if (
      following.bookIndex !== current.passage.bookIndex ||
      following.chapter !== current.passage.chapter
    ) {
      onMoveRef.current(following)
    }
    prefetchAhead(next)
    const ready = knownText(next)
    if (ready) utter(next, ready, true)
    else void speakAfterLoad(next, true)
  }

  function primeSpeech() {
    try {
      const primer = new SpeechSynthesisUtterance(' ')
      primer.volume = 0
      applyVoice(primer, languageRef.current, readVoicePrefs())
      window.speechSynthesis.speak(primer)
    } catch {
      // A phone that cannot speak still shows the words.
    }
  }

  function start(mode: ListenMode, passage: PassageRef, text?: string) {
    if (!canSpeak()) {
      setRefused(true)
      return
    }
    setRefused(false)
    generationRef.current += 1
    utteranceStartedRef.current = false
    markUtteranceSettledRef.current = null
    const interrupted = cancelSpeech()
    const spoken =
      text?.trim() ||
      peekVerse(versionRef.current, passage.bookIndex, passage.chapter, passage.verse)
    const next: Session = {
      generation: generationRef.current,
      mode,
      status: 'playing',
      passage,
      freeText: null,
      spokenText: spoken ?? null,
    }
    if (!spoken) primeSpeech()
    commit(next)
    onMoveRef.current(passage)
    prefetchAhead(next)
    speakNow(next, interrupted)
  }

  function speakText(text: string) {
    if (!canSpeak()) return
    const trimmed = text.trim()
    if (!trimmed) return
    setRefused(false)
    generationRef.current += 1
    utteranceStartedRef.current = false
    markUtteranceSettledRef.current = null
    const interrupted = cancelSpeech()
    const next: Session = {
      generation: generationRef.current,
      mode: 'verse',
      status: 'playing',
      passage: null,
      freeText: trimmed,
      spokenText: trimmed,
    }
    commit(next)
    speakNow(next, interrupted)
  }

  function pause() {
    const current = sessionRef.current
    if (!current || current.status !== 'playing') return
    if (!canSpeak()) return
    commit({ ...current, status: 'paused' })
    window.speechSynthesis.pause()
  }

  function resume() {
    const current = sessionRef.current
    if (!current || current.status !== 'paused') return
    if (!canSpeak()) return
    const synth = window.speechSynthesis
    if (synth.paused && synth.speaking) {
      commit({ ...current, status: 'playing' })
      synth.resume()
      return
    }
    generationRef.current += 1
    utteranceStartedRef.current = false
    markUtteranceSettledRef.current = null
    const next = { ...current, generation: generationRef.current, status: 'playing' as const }
    commit(next)
    speakNow(next, false)
  }

  // Chrome can stall long utterances; a pause/resume nudge keeps many engines alive.
  useEffect(() => {
    if (session?.status !== 'playing' || !canSpeak()) return
    const timer = window.setInterval(() => {
      const synth = window.speechSynthesis
      if (!synth.speaking || synth.paused) return
      synth.pause()
      synth.resume()
    }, 10000)
    return () => window.clearInterval(timer)
  }, [session?.status])

  // Some engines stop without onend. After speech has started, if the synth is
  // neither speaking nor paused for a short grace period, treat the utterance
  // as ended so Pause/Stop cannot stay stuck on playing.
  useEffect(() => {
    if (session?.status !== 'playing' || !canSpeak()) return
    let silentSince: number | null = null
    const GRACE_MS = 900
    const timer = window.setInterval(() => {
      const live = sessionRef.current
      if (!live || live.status !== 'playing') {
        silentSince = null
        return
      }
      if (!utteranceStartedRef.current) {
        silentSince = null
        return
      }
      const synth = window.speechSynthesis
      let speaking = false
      let paused = false
      let pending = false
      try {
        speaking = synth.speaking
        paused = synth.paused
        pending = synth.pending
      } catch {
        speaking = false
        paused = false
        pending = false
      }
      if (speaking || paused || pending) {
        silentSince = null
        return
      }
      const now = Date.now()
      if (silentSince === null) {
        silentSince = now
        return
      }
      if (now - silentSince < GRACE_MS) return
      silentSince = null
      const mark = markUtteranceSettledRef.current
      if (!mark || !mark()) return
      if (sessionRef.current?.generation !== live.generation || sessionRef.current.status !== 'playing') {
        return
      }
      goNext(live)
    }, 250)
    return () => window.clearInterval(timer)
  }, [session?.status, session?.generation])

  // Tab hide/background often cancels SpeechSynthesis without a clean onend.
  useEffect(() => {
    if (session?.status !== 'playing' || !canSpeak()) return
    const onVisibility = () => {
      if (document.visibilityState !== 'hidden') return
      const live = sessionRef.current
      if (!live || live.status !== 'playing') return
      window.setTimeout(() => {
        const still = sessionRef.current
        if (!still || still.generation !== live.generation || still.status !== 'playing') return
        const synth = window.speechSynthesis
        let speaking = false
        let paused = false
        let pending = false
        try {
          speaking = synth.speaking
          paused = synth.paused
          pending = synth.pending
        } catch {
          // Engine unavailable — treat as stopped.
        }
        if (speaking || paused || pending) return
        const mark = markUtteranceSettledRef.current
        if (mark) mark()
        clearUnexpected(still)
      }, 300)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [session?.status, session?.generation])

  useEffect(() => {
    return () => {
      generationRef.current += 1
      utteranceStartedRef.current = false
      markUtteranceSettledRef.current = null
      sessionRef.current = null
      window.speechSynthesis?.cancel()
    }
  }, [])

  useEffect(() => {
    if (!sessionRef.current) return
    generationRef.current += 1
    utteranceStartedRef.current = false
    markUtteranceSettledRef.current = null
    sessionRef.current = null
    setSession(null)
    window.speechSynthesis?.cancel()
  }, [language, versionId])

  return {
    supported: canSpeak(),
    refused,
    status: session?.status ?? 'idle',
    passage: session?.passage ?? null,
    start,
    speakText,
    pause,
    resume,
    stop,
  }
}
