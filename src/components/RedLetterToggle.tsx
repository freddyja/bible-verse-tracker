import { useLanguage } from '../i18n/useLanguage'

export function RedLetterToggle() {
  const { redLetter, setRedLetter, t } = useLanguage()
  return (
    <label className="red-letter-toggle">
      <input
        type="checkbox"
        checked={redLetter}
        onChange={(event) => setRedLetter(event.target.checked)}
      />
      <span>{t('redLetter')}</span>
    </label>
  )
}
