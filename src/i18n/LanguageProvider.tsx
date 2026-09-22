import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { readInitialLanguage } from './detectLanguage'
import { translate } from './messages'
import { LanguageContext, type LanguageContextValue } from './language-context'

const STORAGE_KEY = 'bible-verse-tracker.language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(readInitialLanguage)

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
