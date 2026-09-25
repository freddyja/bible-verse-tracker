import { LanguagePicker } from './LanguagePicker'
import { GreetingNameField } from './GreetingNameField'
import { RedLetterToggle } from './RedLetterToggle'
import { VersionPicker } from './VersionPicker'
import { useLanguage } from '../i18n/useLanguage'

type SettingsPanelProps = {
  hasPlan: boolean
  onReadingOptions: () => void
  onPlan: () => void
}

export function SettingsPanel({ hasPlan, onReadingOptions, onPlan }: SettingsPanelProps) {
  const { t } = useLanguage()
  return (
    <div className="settings-panel">
      <LanguagePicker hint />
      <GreetingNameField />
      <VersionPicker hint />
      <RedLetterToggle hint />
      <div className="settings-links">
        <button type="button" className="button button-block" onClick={onReadingOptions}>
          {t('readingOptions')}
        </button>
        {hasPlan ? (
          <button type="button" className="button button-ghost button-block" onClick={onPlan}>
            {t('planProgressTitle')}
          </button>
        ) : null}
      </div>
    </div>
  )
}
