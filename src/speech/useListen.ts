import { useEffect, useRef, useState } from 'react'
import type { Language } from '../i18n/messages'
import { loadBook, loadVerse, peekVerse } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import type { PassageRef } from '../scripture/passages'
import { passageAfter, passageAfterSync, type ListenMode } from './passageQueue'
import { applyVoice, canSpeak } from './voices'

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

function ignoredSpeechError(error: string): boolean {
  return error === 'canceled' || error === 'interrupted' || error === 'cancelled'
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
    if (!sessionRef.current && !window.speechSynthesis?.speaking) return
    generationRef.current += 1
    commit(null)
    window.speechSynthesis?.cancel()
  }

  function fail(current: Session, refusedSpeech: boolean) {
    if (sessionRef.current?.generation !== current.generation) return
    generationRef.current += 1
    commit(null)
    if (refusedSpeech) setRefused(true)
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

  function utter(current: Session, text: string, delay: boolean) {
    if (sessionRef.current?.generation !== current.generation) return
    const withText: Session = { ...current, spokenText: text, status: 'playing' }
    commit(withText)

    const utterance = new SpeechSynthesisUtterance(text)
    applyVoice(utterance, languageRef.current)
    let settled = false
    utterance.onend = () => {
      if (settled) return
      settled = true
      const live = sessionRef.current
      if (!live || live.generation !== current.generation || live.status !== 'playing') return
      goNext(live)
    }
    utterance.onerror = (event) => {
      if (settled) return
      settled = true
      const live = sessionRef.current
      if (!live || live.generation !== current.generation) return
      if (ignoredSpeechError(event.error)) return
      fail(live, true)
    }

    const run = () => {
      if (sessionRef.current?.generation !== current.generation) return
      try {
        window.speechSynthesis.speak(utterance)
      } catch {
        fail(current, true)
      }
    }
    if (delay) {
      try {
        window.speechSynthesis.cancel()
      } catch {
        // The engine can refuse a cancel before the first utterance.
      }
      window.setTimeout(run, 50)
    } else {
      run()
    }
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
    // The verse that just finished has ended. Speak the next one after a short
    // gap so Chrome does not drop it, without waiting on anything else.
    const ready = knownText(next)
    if (ready) utter(next, ready, true)
    else void speakAfterLoad(next, true)
  }

  function primeSpeech() {
    try {
      const primer = new SpeechSynthesisUtterance(' ')
      primer.volume = 0
      window.speechSynthesis.speak(primer)
    } catch {
      // A phone that cannot speak still shows the words.
    }
  }

  function start(mode: ListenMode, passage: PassageRef, text?: string) {
    if (!canSpeak()) return
    setRefused(false)
    generationRef.current += 1
    try {
      window.speechSynthesis.cancel()
    } catch {
      // Starting fresh still speaks the verse in this tap.
    }
    const spoken =
      text?.trim() ||
      peekVerse(versionRef.current, passage.bookIndex, passage.chapter, passage.verse)
    const next: Session = {
      generation: generationRef.current,
      mode,
      status: 'playing',
      passage,
      freeText: null,
      spokenText: spoken,
    }
    if (!spoken) primeSpeech()
    commit(next)
    onMoveRef.current(passage)
    prefetchAhead(next)
    speakNow(next, false)
  }

  function speakText(text: string) {
    if (!canSpeak()) return
    const trimmed = text.trim()
    if (!trimmed) return
    setRefused(false)
    generationRef.current += 1
    try {
      window.speechSynthesis.cancel()
    } catch {
      // The typed verse is spoken in this tap.
    }
    const next: Session = {
      generation: generationRef.current,
      mode: 'verse',
      status: 'playing',
      passage: null,
      freeText: trimmed,
      spokenText: trimmed,
    }
    commit(next)
    speakNow(next, false)
  }

  function pause() {
    const current = sessionRef.current
    if (!current || current.status !== 'playing' || !canSpeak()) return
    commit({ ...current, status: 'paused' })
    window.speechSynthesis.pause()
  }

  function resume() {
    const current = sessionRef.current
    if (!current || current.status !== 'paused' || !canSpeak()) return
    const synth = window.speechSynthesis
    if (synth.paused && synth.speaking) {
      commit({ ...current, status: 'playing' })
      synth.resume()
      return
    }
    generationRef.current += 1
    const next = { ...current, generation: generationRef.current, status: 'playing' as const }
    commit(next)
    speakNow(next, false)
  }

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

  useEffect(() => {
    return () => {
      generationRef.current += 1
      sessionRef.current = null
      window.speechSynthesis?.cancel()
    }
  }, [])

  useEffect(() => {
    if (!sessionRef.current) return
    generationRef.current += 1
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
