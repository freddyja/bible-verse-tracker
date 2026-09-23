import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { defaultVersionId, versionById, versionsFor } from '../scripture/versions'
import { readInitialLanguage } from './detectLanguage'
import type { Language } from './messages'
import { translate } from './messages'
import { LanguageContext, type LanguageContextValue } from './language-context'

const STORAGE_KEY = 'bible-verse-tracker.language'
const RED_LETTER_KEY = 'bible-verse-tracker.red-letter'

function readRedLetter(): boolean {
  try {
    return localStorage.getItem(RED_LETTER_KEY) !== '0'
  } catch {
    return true
  }
}

function versionKey(language: Language): string {
  return `bible-verse-tracker.version.${language}`
}

function readStoredVersion(language: Language): string {
  try {
    const stored = localStorage.getItem(versionKey(language))
    if (stored && versionById(stored)?.language === language) return stored
  } catch {
    // The default version for this language still applies.
  }
  return defaultVersionId(language)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(readInitialLanguage)
  const [chosen, setChosen] = useState<Record<Language, string>>(() => ({
    en: readStoredVersion('en'),
    es: readStoredVersion('es'),
    pt: readStoredVersion('pt'),
  }))
  const [redLetter, setRedLetterState] = useState(readRedLetter)

  const versionId = chosen[language]
  const versionName = versionById(versionId)?.name ?? versionsFor(language)[0].name

  useEffect(() => {
    document.documentElement.lang = language
    try {
      localStorage.setItem(STORAGE_KEY, language)
      localStorage.setItem(versionKey(language), versionId)
    } catch {
      // The choice still applies until the page closes.
    }
  }, [language, versionId])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      versionId,
      versionName,
      versions: versionsFor(language),
      setVersion: (next) => {
        if (versionById(next)?.language !== language) return
        setChosen((current) => (current[language] === next ? current : { ...current, [language]: next }))
      },
      redLetter,
      setRedLetter: (enabled) => {
        setRedLetterState(enabled)
        try {
          localStorage.setItem(RED_LETTER_KEY, enabled ? '1' : '0')
        } catch {
          // The choice still applies until the page closes.
        }
      },
      t: (key, vars) => translate(language, key, vars),
    }),
    [language, versionId, versionName, redLetter],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
