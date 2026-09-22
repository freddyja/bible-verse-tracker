import type { Language } from '../i18n/messages'

const utteranceLang: Record<Language, string> = {
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function utteranceLanguage(language: Language): string {
  return utteranceLang[language]
}

function scoreVoice(voice: SpeechSynthesisVoice, language: Language): number {
  const lang = voice.lang.toLowerCase()
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

/** A voice for the app language, when the phone has one. */
export function pickVoice(language: Language): SpeechSynthesisVoice | undefined {
  if (!canSpeak()) return undefined
  const voices = window.speechSynthesis.getVoices()
  let best: SpeechSynthesisVoice | undefined
  let bestScore = -1
  for (const voice of voices) {
    const score = scoreVoice(voice, language)
    if (score > bestScore) {
      best = voice
      bestScore = score
    }
  }
  return best
}
