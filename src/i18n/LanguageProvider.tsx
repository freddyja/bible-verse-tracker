import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { translate, type Language } from './messages'
import { LanguageContext, type LanguageContextValue } from './language-context'

const STORAGE_KEY = 'bible-verse-tracker.language'

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es' || stored === 'pt') return stored
  } catch {
    // A blocked store still leaves English for this visit.
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // The choice still applies until the page closes.
    }
  }, [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key, vars) => translate(language, key, vars),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
