import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import type { MessageKey } from '../i18n/messages'
import type { PlanPace } from '../scripture/readingPlan'
import { PLAN_PACES } from '../scripture/readingPlan'
import { VERSIONS } from '../scripture/versions'
import type { StoredPlan } from '../hooks/useReadingPlan'

const PACE_COPY: Record<
  PlanPace,
  {
    label: MessageKey
    hint: MessageKey
    detail: MessageKey
  }
> = {
  90: { label: 'planPace90', hint: 'planPace90Hint', detail: 'planPace90Detail' },
  180: { label: 'planPace180', hint: 'planPace180Hint', detail: 'planPace180Detail' },
  365: { label: 'planPace365', hint: 'planPace365Hint', detail: 'planPace365Detail' },
}

type ReadingOptionsProps = {
  plan: StoredPlan | null
  onSave: (pace: PlanPace, versionId: string) => void
}

function Check({ on }: { on: boolean }) {
  return (
    <span className={on ? 'check-orb is-on' : 'check-orb'} aria-hidden="true">
      {on ? '✓' : ''}
    </span>
  )
}

export function ReadingOptions({ plan, onSave }: ReadingOptionsProps) {
  const { versionId, t } = useLanguage()
  const [pace, setPace] = useState<PlanPace>(plan?.pace ?? 90)
  const [translation, setTranslation] = useState(plan?.versionId ?? versionId)
  const groups = [
    { label: t('langEn'), language: 'en' as const },
    { label: t('langEs'), language: 'es' as const },
    { label: t('langPt'), language: 'pt' as const },
  ]

  return (
    <form
      className="reading-options"
      onSubmit={(event) => {
        event.preventDefault()
        onSave(pace, translation)
      }}
    >
      <div className="options-hero">
        <svg className="options-mark" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 5.5h6.2c1.2 0 2.3.6 2.8 1.5.5-.9 1.6-1.5 2.8-1.5H21V18h-4.2c-1.1 0-2.1.4-2.8 1.1-.7-.7-1.7-1.1-2.8-1.1H5V5.5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12 7.2v11.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <h2 className="options-title">{t('readingOptions')}</h2>
        <p className="options-lead">{t('readingOptionsHelp')}</p>
      </div>
      <fieldset className="field">
        <legend className="plan-section-label">{t('planPace')}</legend>
        <div className="pace-options">
          {PLAN_PACES.map((option) => {
            const copy = PACE_COPY[option]
            const selected = pace === option
            return (
              <button
                key={option}
                type="button"
                className="pace-option"
                aria-pressed={selected}
                onClick={() => setPace(option)}
              >
                <span className="pace-copy">
                  <span className="pace-name">{t(copy.label)}</span>
                  <span className="pace-hint">{t(copy.hint)}</span>
                  <span className="pace-detail">{t(copy.detail)}</span>
                </span>
                <Check on={selected} />
              </button>
            )
          })}
        </div>
      </fieldset>
      <fieldset className="field">
        <legend className="plan-section-label">{t('planTranslation')}</legend>
        {groups.map((group) => (
          <div key={group.language} className="translation-group">
            <p className="translation-lang">{group.label}</p>
            <div className="pace-options">
              {VERSIONS.filter((version) => version.language === group.language).map((version) => {
                const selected = translation === version.id
                return (
                  <button
                    key={version.id}
                    type="button"
                    className="pace-option"
                    aria-pressed={selected}
                    onClick={() => setTranslation(version.id)}
                  >
                    <span className="pace-copy">
                      <span className="pace-name">{version.name}</span>
                      <span className="pace-hint">{version.abbr}</span>
                    </span>
                    <Check on={selected} />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </fieldset>
      <div className="field">
        <p className="plan-section-label">{t('planEdition')}</p>
        <div className="pace-option is-static">
          <span className="pace-copy">
            <span className="pace-name">{t('planEditionTitle')}</span>
            <span className="pace-detail">{t('planEditionDetail')}</span>
          </span>
          <Check on />
        </div>
      </div>
      {plan ? <p className="field-note">{t('planPaceChange')}</p> : null}
      <button type="submit" className="button button-block">
        {plan ? t('planSave') : t('planStart')}
      </button>
    </form>
  )
}
