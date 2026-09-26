import { useEffect, useId, useRef, useState } from 'react'
import type { Language } from '../i18n/messages'
import { useLanguage } from '../i18n/useLanguage'
import { loadVerse } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import {
  setVoiceGender,
  setVoiceStyle,
  useVoicePrefs,
  type VoiceGender,
  type VoiceStyle,
} from '../speech/prefs'
import { applyVoice, canSpeak, cancelSpeech } from '../speech/voices'

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

function ignoredSpeechError(error: string): boolean {
  return error === 'canceled' || error === 'interrupted' || error === 'cancelled'
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

  useEffect(() => {
    return () => {
      previewToken.current += 1
      cancelSpeech()
    }
  }, [language, versionId])

  function haltPreview() {
    previewToken.current += 1
    setPlaying(false)
    cancelSpeech()
  }

  function chooseGender(gender: VoiceGender) {
    if (gender !== prefs.gender) haltPreview()
    setVoiceGender(gender)
  }

  function chooseStyle(style: VoiceStyle) {
    if (style !== prefs.style) haltPreview()
    setVoiceStyle(style)
  }

  function playSample() {
    if (!supported) return
    const token = ++previewToken.current
    setFailed(false)
    setPlaying(true)
    cancelSpeech()
    void sampleText(versionId, language).then((text) => {
      if (previewToken.current !== token) return
      let utterance: SpeechSynthesisUtterance
      try {
        utterance = new SpeechSynthesisUtterance(text)
        applyVoice(utterance, language)
      } catch {
        setPlaying(false)
        setFailed(true)
        return
      }
      let settled = false
      const finish = (ok: boolean) => {
        if (settled || previewToken.current !== token) return
        settled = true
        setPlaying(false)
        if (!ok) setFailed(true)
      }
      utterance.onend = () => finish(true)
      utterance.onerror = (event) => finish(ignoredSpeechError(event.error))
      window.setTimeout(() => {
        if (previewToken.current !== token) return
        try {
          window.speechSynthesis.speak(utterance)
        } catch {
          finish(false)
        }
      }, 50)
    })
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
        <p className="setting-help">{t('voiceGenderLimited')}</p>
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
