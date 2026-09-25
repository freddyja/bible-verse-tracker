import { useState } from 'react'
import { DISPLAY_NAME_LIMIT, useDisplayName } from '../hooks/useDisplayName'
import { useLanguage } from '../i18n/useLanguage'

export function GreetingNameField() {
  const { t } = useLanguage()
  const { name, save } = useDisplayName()
  const [draft, setDraft] = useState(name)

  function apply(value: string) {
    setDraft(save(value))
  }

  return (
    <form
      className="greeting-name"
      onSubmit={(event) => {
        event.preventDefault()
        apply(draft)
      }}
    >
      <label className="field">
        <span className="setting-label">{t('greetingName')}</span>
        <input
          value={draft}
          maxLength={DISPLAY_NAME_LIMIT}
          autoComplete="nickname"
          placeholder={t('greetingNamePlaceholder')}
          onChange={(event) => setDraft(event.target.value)}
        />
        <span className="setting-help">{t('greetingNameHelp')}</span>
      </label>
      <div className="greeting-name-actions">
        {name ? (
          <button type="button" className="button button-ghost" onClick={() => apply('')}>
            {t('greetingClear')}
          </button>
        ) : null}
        <button type="submit" className="button">
          {t('save')}
        </button>
      </div>
    </form>
  )
}
