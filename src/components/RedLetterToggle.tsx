import { useLanguage } from '../i18n/useLanguage'

export function RedLetterToggle({ hint = false }: { hint?: boolean }) {
  const { redLetter, setRedLetter, t } = useLanguage()
  return (
    <label className="red-letter-toggle">
      <input
        type="checkbox"
        checked={redLetter}
        onChange={(event) => setRedLetter(event.target.checked)}
      />
      <span className="red-letter-copy">
        <span>{t('redLetter')}</span>
        {hint ? <span className="setting-help">{t('redLetterHelp')}</span> : null}
      </span>
    </label>
  )
}
