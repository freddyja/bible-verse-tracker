import { useId } from 'react'
import { bibleBrainConfigured } from '../audio/bibleBrain'
import { useLanguage } from '../i18n/useLanguage'

export function RecordedSettings() {
  const { t } = useLanguage()
  const headingId = useId()
  const configured = bibleBrainConfigured()

  return (
    <section className="voice-settings" aria-labelledby={headingId}>
      <h2 id={headingId} className="voice-heading">
        {t('recordedSection')}
      </h2>
      <p className="setting-help">{configured ? t('recordedReady') : t('recordedNeedsKey')}</p>
      <p className="setting-help">{t('recordedCredit')}</p>
      <p className="setting-help">{t('recordedPrivacy')}</p>
    </section>
  )
}
