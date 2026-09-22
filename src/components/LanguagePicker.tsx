import type { Language } from '../i18n/messages'
import { useLanguage } from '../i18n/useLanguage'

const options: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
]

export function LanguagePicker() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="lang" role="group" aria-label={t('language')}>
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          className="lang-option"
          aria-pressed={language === option.code}
          onClick={() => setLanguage(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
