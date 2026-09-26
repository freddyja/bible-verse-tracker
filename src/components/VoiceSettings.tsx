import { useEffect, useId, useRef, useState } from 'react'
import type { Language } from '../i18n/messages'
import { useLanguage } from '../i18n/useLanguage'
import { loadVerse } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import {
  readVoicePrefs,
  setVoiceGender,
  setVoiceStyle,
  useVoicePrefs,
  type VoiceGender,
  type VoiceStyle,
} from '../speech/prefs'
import {
  applyVoice,
  canSpeak,
  cancelSpeech,
  ignoredSpeechError,
  speakWhenReady,
  subscribeVoices,
  usesDeepMalePitch,
  whenVoicesReady,
} from '../speech/voices'

const JOHN_INDEX = BOOKS.findIndex((book) => book.id === 'jhn')

/** Public-domain John 3:16, used only when the active text cannot be loaded. */
const FALLBACK: Record<Language, string> = {
  en: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
  es: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
  pt: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
}

const GENDERS: { id: VoiceGender; label: 'voiceGenderMale' | 'voiceGenderFemale' | 'voiceGenderDefault' }[] = [
  { id: 'male', label: 'voiceGenderMale' },
  { id: 'female', label: 'voiceGenderFemale' },
  { id: 'default', label: 'voiceGenderDefault' },
]

const STYLES: { id: VoiceStyle; label: 'voiceStyleCalm' | 'voiceStyleClear' | 'voiceStyleWarm' }[] = [
  { id: 'calm', label: 'voiceStyleCalm' },
  { id: 'clear', label: 'voiceStyleClear' },
  { id: 'warm', label: 'voiceStyleWarm' },
]

async function sampleText(versionId: string, language: Language): Promise<string> {
  if (JOHN_INDEX < 0) return FALLBACK[language]
  try {
    const text = await loadVerse(versionId, JOHN_INDEX, 3, 16)
    if (text?.trim()) return text.trim()
  } catch {
    // The fixed public-domain line still previews the voice.
  }
  return FALLBACK[language]
}

export function VoiceSettings() {
  const { language, versionId, t } = useLanguage()
  const prefs = useVoicePrefs()
  const headingId = useId()
  const genderLabelId = useId()
  const styleLabelId = useId()
  const previewToken = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const sampleKey = `${language}:${versionId}`
  const [trackedSampleKey, setTrackedSampleKey] = useState(sampleKey)
  if (trackedSampleKey !== sampleKey) {
    setTrackedSampleKey(sampleKey)
    setPlaying(false)
    setFailed(false)
  }
  const supported = canSpeak()
  const [installedVoices, setInstalledVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => subscribeVoices(setInstalledVoices), [])

  useEffect(() => {
    return () => {
      previewToken.current += 1
      cancelSpeech()
    }
  }, [language, versionId])

  const malePitchFallback = usesDeepMalePitch(installedVoices, language, prefs)

  function finishPreview(token: number, ok: boolean) {
    if (previewToken.current !== token) return
    setPlaying(false)
    if (!ok) setFailed(true)
  }

  function speakAttempt(
    text: string,
    token: number,
    pitchOnly: boolean,
    waitForCancel: boolean,
    pitchRetries: number,
  ) {
    if (previewToken.current !== token) return
    whenVoicesReady(
      () => previewToken.current === token,
      () => speakPrepared(text, token, pitchOnly, waitForCancel, pitchRetries),
    )
  }

  function speakPrepared(
    text: string,
    token: number,
    pitchOnly: boolean,
    waitForCancel: boolean,
    pitchRetries: number,
  ) {
    if (previewToken.current !== token) return
    let utterance: SpeechSynthesisUtterance
    try {
      utterance = new SpeechSynthesisUtterance(text)
      applyVoice(utterance, language, readVoicePrefs(), { pitchOnly })
    } catch {
      if (!pitchOnly) {
        speakAttempt(text, token, true, true, pitchRetries)
        return
      }
      finishPreview(token, false)
      return
    }

    let started = false
    let settled = false
    let queuedAt = 0
    const fallback = (nextPitchRetries: number) => {
      if (settled || previewToken.current !== token) return
      settled = true
      const interrupted = cancelSpeech()
      window.setTimeout(() => {
        speakAttempt(text, token, true, interrupted, nextPitchRetries)
      }, 0)
    }

    utterance.onstart = () => {
      started = true
    }
    utterance.onend = () => {
      if (settled || previewToken.current !== token) return
      const elapsed = queuedAt ? Date.now() - queuedAt : 0
      // Some male voices end at once, with no audio and no error. A real
      // reading of this sentence cannot finish that quickly.
      if (!pitchOnly && !started && elapsed < 250 && text.length > 40) {
        fallback(0)
        return
      }
      settled = true
      finishPreview(token, true)
    }
    utterance.onerror = (event) => {
      if (settled || previewToken.current !== token) return
      const ignored = ignoredSpeechError(event.error)
      // A chosen voice that never starts, or that the engine rejects, speaks
      // again on the default voice. A cancel after audio started is the user
      // moving on, so it does not count as a failure.
      if (!pitchOnly && (!ignored || !started)) {
        fallback(0)
        return
      }
      if (pitchOnly && ignored && !started && pitchRetries < 1) {
        fallback(pitchRetries + 1)
        return
      }
      settled = true
      finishPreview(token, ignored && started)
    }

    speakWhenReady(
      utterance,
      () => previewToken.current === token && !settled,
      () => {
        if (previewToken.current !== token || settled) return
        if (!pitchOnly || pitchRetries < 1) fallback(pitchOnly ? pitchRetries + 1 : 0)
        else finishPreview(token, false)
      },
      {
        waitForCancel,
        onQueued: () => {
          queuedAt = Date.now()
        },
      },
    )
  }

  function playSample() {
    if (!supported) return
    // One token and at most one cancel for this tap. Bumping the token and
    // canceling in a separate halt step lets Chrome drop the sample that follows.
    const token = ++previewToken.current
    setFailed(false)
    setPlaying(true)
    const interrupted = cancelSpeech()
    void sampleText(versionId, language).then((text) => {
      if (previewToken.current !== token) return
      speakAttempt(text, token, false, interrupted, 0)
    })
  }

  function chooseGender(gender: VoiceGender) {
    setVoiceGender(gender)
    playSample()
  }

  function chooseStyle(style: VoiceStyle) {
    setVoiceStyle(style)
    playSample()
  }

  return (
    <section className="voice-settings" aria-labelledby={headingId}>
      <h2 id={headingId} className="voice-heading">
        {t('voiceSection')}
      </h2>
      <p className="setting-help">{t('voiceHelp')}</p>
      <div className="lang voice-choice" role="group" aria-labelledby={genderLabelId}>
        <span id={genderLabelId} className="setting-label">
          {t('voiceGender')}
        </span>
        <div className="lang-options">
          {GENDERS.map((option) => (
            <button
              key={option.id}
              type="button"
              className="lang-option"
              aria-pressed={prefs.gender === option.id}
              onClick={() => chooseGender(option.id)}
            >
              {t(option.label)}
            </button>
          ))}
        </div>
        <p className="setting-help">{malePitchFallback ? t('voiceMaleFallback') : t('voiceGenderLimited')}</p>
      </div>
      <div className="lang voice-choice" role="group" aria-labelledby={styleLabelId}>
        <span id={styleLabelId} className="setting-label">
          {t('voiceStyle')}
        </span>
        <div className="lang-options">
          {STYLES.map((option) => (
            <button
              key={option.id}
              type="button"
              className="lang-option"
              aria-pressed={prefs.style === option.id}
              onClick={() => chooseStyle(option.id)}
            >
              {t(option.label)}
            </button>
          ))}
        </div>
      </div>
      <div className="voice-preview">
        <button
          type="button"
          className="button"
          disabled={!supported}
          aria-busy={playing}
          onClick={playSample}
        >
          {t('voicePreview')}
        </button>
        <p className="setting-help">{failed ? t('voicePreviewFailed') : t('voicePreviewHelp')}</p>
        {!supported ? <p className="setting-help">{t('listenUnavailable')}</p> : null}
      </div>
    </section>
  )
}
