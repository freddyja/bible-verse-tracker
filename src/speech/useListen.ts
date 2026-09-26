import { useCallback, useEffect, useRef, useState } from 'react'
import {
  lookupRecordedChapter,
  playbackQueue,
  verseAtTime,
  bibleBrainConfigured,
  type PlaybackSlice,
  type RecordedChapter,
  type RecordedLookup,
  type VerseMark,
} from '../audio/bibleBrain'
import type { Language } from '../i18n/messages'
import { loadBook, loadVerse, peekVerse } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import type { PassageRef } from '../scripture/passages'
import { passageAfter, passageAfterSync, type ListenMode } from './passageQueue'
import { readVoicePrefs } from './prefs'
import { applyVoice, canSpeak, cancelSpeech, ignoredSpeechError, speakWhenReady } from './voices'

type Status = 'idle' | 'playing' | 'paused'
type Source = 'recorded' | 'device'

type Session = {
  generation: number
  mode: ListenMode
  status: Exclude<Status, 'idle'>
  source: Source
  passage: PassageRef | null
  freeText: string | null
  spokenText: string | null
}

type Queue = {
  slices: PlaybackSlice[]
  index: number
  marks: VerseMark[]
  mode: ListenMode
}

export type RecordedOffer =
  | { kind: 'off' }
  | { kind: 'idle' }
  | { kind: 'checking' }
  | { kind: 'ready'; label: string; chapter: RecordedChapter }
  | { kind: 'absent'; reason: 'none' | 'offline' | 'denied' }

export type ListenController = {
  supported: boolean
  refused: boolean
  status: Status
  passage: PassageRef | null
  recorded: RecordedOffer
  preferPhone: boolean
  activeSource: Source | null
  start: (mode: ListenMode, passage: PassageRef, text?: string) => void
  speakText: (text: string) => void
  pause: () => void
  resume: () => void
  stop: () => void
  watch: (target: { bookIndex: number; chapter: number } | null) => void
  usePhoneVoice: () => void
  useRecordedVoice: () => void
}

function offerFromLookup(result: RecordedLookup): RecordedOffer {
  if (result.kind === 'ready') {
    return { kind: 'ready', label: result.chapter.label, chapter: result.chapter }
  }
  return { kind: 'absent', reason: result.reason }
}

function nextChapterStart(passage: PassageRef): PassageRef | null {
  const book = BOOKS[passage.bookIndex]
  if (!book) return null
  if (passage.chapter < book.chapters) {
    return { bookIndex: passage.bookIndex, chapter: passage.chapter + 1, verse: 1 }
  }
  if (passage.bookIndex < BOOKS.length - 1) {
    return { bookIndex: passage.bookIndex + 1, chapter: 1, verse: 1 }
  }
  return null
}

export function useListen(
  language: Language,
  versionId: string,
  onMove: (passage: PassageRef) => void,
): ListenController {
  const [session, setSession] = useState<Session | null>(null)
  const [refused, setRefused] = useState(false)
  const [preferPhone, setPreferPhone] = useState(false)
  const [phoneLanguage, setPhoneLanguage] = useState(language)
  const [watchKey, setWatchKey] = useState<string | null>(null)
  const [loadedKey, setLoadedKey] = useState<string | null>(null)
  const [loadedOffer, setLoadedOffer] = useState<RecordedOffer | null>(null)
  const sessionRef = useRef<Session | null>(null)
  const onMoveRef = useRef(onMove)
  const languageRef = useRef(language)
  const versionRef = useRef(versionId)
  const generationRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const queueRef = useRef<Queue | null>(null)

  useEffect(() => {
    onMoveRef.current = onMove
  }, [onMove])

  useEffect(() => {
    languageRef.current = language
    versionRef.current = versionId
  }, [language, versionId])

  if (phoneLanguage !== language) {
    setPhoneLanguage(language)
    setPreferPhone(false)
  }

  const configured = bibleBrainConfigured()
  const requestKey = configured && watchKey ? `${language}:${watchKey}` : null
  const recorded: RecordedOffer = !configured
    ? { kind: 'off' }
    : !watchKey
      ? { kind: 'idle' }
      : loadedKey === requestKey && loadedOffer
        ? loadedOffer
        : { kind: 'checking' }

  function commit(next: Session | null) {
    sessionRef.current = next
    setSession(next)
  }

  function audioElement(): HTMLAudioElement {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.preload = 'auto'
      audioRef.current = audio
    }
    return audioRef.current
  }

  function haltAudio() {
    queueRef.current = null
    const audio = audioRef.current
    if (!audio) return
    audio.onended = null
    audio.ontimeupdate = null
    audio.onerror = null
    audio.onloadedmetadata = null
    audio.pause()
    if (audio.getAttribute('src')) {
      audio.removeAttribute('src')
      audio.load()
    }
  }

  function stop() {
    if (!sessionRef.current && !window.speechSynthesis?.speaking && !audioRef.current?.getAttribute('src')) return
    generationRef.current += 1
    commit(null)
    haltAudio()
    window.speechSynthesis?.cancel()
  }

  function fail(current: Session, refusedSpeech: boolean) {
    if (sessionRef.current?.generation !== current.generation) return
    generationRef.current += 1
    commit(null)
    haltAudio()
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

  function utter(current: Session, text: string, delay: boolean, pitchOnly = false) {
    if (sessionRef.current?.generation !== current.generation) return
    const withText: Session = { ...current, source: 'device', spokenText: text, status: 'playing' }
    commit(withText)

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
    const stillCurrent = () => sessionRef.current?.generation === current.generation
    const retryPitch = () => {
      if (settled || !stillCurrent()) return
      settled = true
      utter(current, text, true, true)
    }

    utterance.onstart = () => {
      started = true
    }
    utterance.onend = () => {
      if (settled) return
      settled = true
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
      settled = true
      if (ignoredSpeechError(event.error)) return
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
      { waitForCancel: delay },
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
      source: 'device',
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
      window.speechSynthesis.speak(primer)
    } catch {
      // A phone that cannot speak still shows the words.
    }
  }

  function fallbackToDevice(current: Session) {
    if (sessionRef.current?.generation !== current.generation) return
    haltAudio()
    if (!canSpeak()) {
      fail(current, true)
      return
    }
    const device: Session = { ...current, source: 'device', status: 'playing' }
    commit(device)
    speakNow(device, true)
  }

  function playSlice(slice: PlaybackSlice, generation: number) {
    const audio = audioElement()
    const seek = () => {
      if (sessionRef.current?.generation !== generation) return
      if (slice.start <= 0.15) return
      try {
        if (Math.abs(audio.currentTime - slice.start) > 0.2) audio.currentTime = slice.start
      } catch {
        // The browser applies the seek once the file can be seeked.
      }
    }
    audio.onloadedmetadata = () => {
      seek()
    }
    if (audio.src !== slice.url) audio.src = slice.url
    else seek()
    void audio.play().then(seek, () => {
      const live = sessionRef.current
      if (!live || live.generation !== generation) return
      fallbackToDevice(live)
    })
  }

  function bindAudio(generation: number) {
    const audio = audioElement()
    audio.onerror = () => {
      const live = sessionRef.current
      if (!live || live.generation !== generation || live.source !== 'recorded') return
      fallbackToDevice(live)
    }
    audio.onended = () => {
      const live = sessionRef.current
      const queue = queueRef.current
      if (!live || !queue || live.generation !== generation || live.source !== 'recorded') return
      if (queue.index + 1 < queue.slices.length) {
        queue.index += 1
        const nextSlice = queue.slices[queue.index]
        if (live.passage) {
          commit({ ...live, passage: { ...live.passage, verse: nextSlice.verse }, status: 'playing' })
        }
        playSlice(nextSlice, generation)
        return
      }
      if (live.mode === 'continue') {
        void advanceRecorded(live)
        return
      }
      generationRef.current += 1
      commit(null)
      haltAudio()
    }
    audio.ontimeupdate = () => {
      const live = sessionRef.current
      const queue = queueRef.current
      if (!live || !queue || live.generation !== generation || live.source !== 'recorded' || !live.passage) return
      if (live.status !== 'playing') return
      const slice = queue.slices[queue.index]
      if (!slice) return
      if (live.mode === 'verse' && slice.end != null && audio.currentTime >= slice.end - 0.05) {
        generationRef.current += 1
        commit(null)
        haltAudio()
        return
      }
      if (queue.marks.length === 0 || queue.slices.length !== 1) return
      const verse = verseAtTime(audio.currentTime, queue.marks)
      if (!verse || verse === live.passage.verse) return
      commit({ ...live, passage: { ...live.passage, verse } })
    }
  }

  function beginRecorded(
    mode: ListenMode,
    passage: PassageRef,
    slices: PlaybackSlice[],
    marks: VerseMark[],
    text?: string,
  ) {
    setRefused(false)
    generationRef.current += 1
    const generation = generationRef.current
    cancelSpeech()
    haltAudio()
    const spoken =
      text?.trim() || peekVerse(versionRef.current, passage.bookIndex, passage.chapter, passage.verse)
    commit({
      generation,
      mode,
      status: 'playing',
      source: 'recorded',
      passage,
      freeText: null,
      spokenText: spoken ?? null,
    })
    onMoveRef.current(passage)
    queueRef.current = {
      slices,
      index: 0,
      marks: slices.length === 1 ? marks : [],
      mode,
    }
    bindAudio(generation)
    playSlice(slices[0], generation)
  }

  async function advanceRecorded(current: Session) {
    if (!current.passage) {
      commit(null)
      haltAudio()
      return
    }
    const following = nextChapterStart(current.passage)
    if (!following) {
      commit(null)
      haltAudio()
      return
    }
    onMoveRef.current(following)
    let lookup: RecordedLookup
    try {
      lookup = await lookupRecordedChapter(languageRef.current, following.bookIndex, following.chapter)
    } catch {
      lookup = { kind: 'absent', reason: 'offline' }
    }
    if (sessionRef.current?.generation !== current.generation) return
    const slices = lookup.kind === 'ready' ? playbackQueue(lookup.chapter, 'continue', 1) : null
    if (lookup.kind !== 'ready' || !slices) {
      const device: Session = {
        ...current,
        passage: following,
        source: 'device',
        freeText: null,
        spokenText: null,
        status: 'playing',
      }
      haltAudio()
      commit(device)
      speakNow(device, true)
      return
    }
    const next: Session = {
      ...current,
      passage: following,
      source: 'recorded',
      freeText: null,
      spokenText: null,
      status: 'playing',
    }
    commit(next)
    queueRef.current = { slices, index: 0, marks: slices.length === 1 ? lookup.chapter.marks : [], mode: 'continue' }
    playSlice(slices[0], current.generation)
  }

  function sameChapter(chapter: RecordedChapter, passage: PassageRef): boolean {
    return chapter.bookIndex === passage.bookIndex && chapter.chapter === passage.chapter
  }

  function start(mode: ListenMode, passage: PassageRef, text?: string) {
    const offer = recorded
    if (!preferPhone && offer.kind === 'ready' && sameChapter(offer.chapter, passage)) {
      const slices = playbackQueue(offer.chapter, mode, passage.verse)
      if (slices && slices.length > 0) {
        beginRecorded(mode, passage, slices, offer.chapter.marks, text)
        return
      }
    }
    if (!canSpeak()) {
      setRefused(true)
      return
    }
    setRefused(false)
    generationRef.current += 1
    haltAudio()
    const interrupted = cancelSpeech()
    const spoken =
      text?.trim() ||
      peekVerse(versionRef.current, passage.bookIndex, passage.chapter, passage.verse)
    const next: Session = {
      generation: generationRef.current,
      mode,
      status: 'playing',
      source: 'device',
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
    haltAudio()
    const interrupted = cancelSpeech()
    const next: Session = {
      generation: generationRef.current,
      mode: 'verse',
      status: 'playing',
      source: 'device',
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
    if (current.source === 'recorded') {
      audioRef.current?.pause()
      commit({ ...current, status: 'paused' })
      return
    }
    if (!canSpeak()) return
    commit({ ...current, status: 'paused' })
    window.speechSynthesis.pause()
  }

  function resume() {
    const current = sessionRef.current
    if (!current || current.status !== 'paused') return
    if (current.source === 'recorded') {
      commit({ ...current, status: 'playing' })
      void audioRef.current?.play().catch(() => {
        const live = sessionRef.current
        if (!live || live.generation !== current.generation) return
        fallbackToDevice(live)
      })
      return
    }
    if (!canSpeak()) return
    const synth = window.speechSynthesis
    if (synth.paused && synth.speaking) {
      commit({ ...current, status: 'playing' })
      synth.resume()
      return
    }
    generationRef.current += 1
    const next = { ...current, generation: generationRef.current, status: 'playing' as const, source: 'device' as const }
    commit(next)
    speakNow(next, false)
  }

  const watch = useCallback((target: { bookIndex: number; chapter: number } | null) => {
    setWatchKey(target ? `${target.bookIndex}:${target.chapter}` : null)
  }, [])

  function usePhoneVoice() {
    setPreferPhone(true)
    if (sessionRef.current) stop()
  }

  function useRecordedVoice() {
    setPreferPhone(false)
    if (sessionRef.current) stop()
  }

  useEffect(() => {
    if (session?.status !== 'playing' || session.source !== 'device' || !canSpeak()) return
    const timer = window.setInterval(() => {
      const synth = window.speechSynthesis
      if (!synth.speaking || synth.paused) return
      synth.pause()
      synth.resume()
    }, 10000)
    return () => window.clearInterval(timer)
  }, [session?.status, session?.source])

  useEffect(() => {
    return () => {
      generationRef.current += 1
      sessionRef.current = null
      queueRef.current = null
      const audio = audioRef.current
      if (audio) {
        audio.onended = null
        audio.ontimeupdate = null
        audio.onerror = null
        audio.pause()
        audio.removeAttribute('src')
      }
      window.speechSynthesis?.cancel()
    }
  }, [])

  useEffect(() => {
    if (!sessionRef.current && !audioRef.current?.getAttribute('src')) return
    generationRef.current += 1
    sessionRef.current = null
    setSession(null)
    haltAudio()
    window.speechSynthesis?.cancel()
  }, [language, versionId])

  useEffect(() => {
    if (!requestKey || !watchKey) return
    const [bookIndex, chapter] = watchKey.split(':').map(Number)
    if (!Number.isFinite(bookIndex) || !Number.isFinite(chapter)) return
    const key = requestKey
    let cancelled = false
    void lookupRecordedChapter(language, bookIndex, chapter).then((result) => {
      if (cancelled) return
      setLoadedKey(key)
      setLoadedOffer(offerFromLookup(result))
    })
    return () => {
      cancelled = true
    }
  }, [language, requestKey, watchKey])

  return {
    supported: canSpeak(),
    refused,
    status: session?.status ?? 'idle',
    passage: session?.passage ?? null,
    recorded,
    preferPhone,
    activeSource: session?.source ?? null,
    start,
    speakText,
    pause,
    resume,
    stop,
    watch,
    usePhoneVoice,
    useRecordedVoice,
  }
}
