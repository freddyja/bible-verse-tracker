import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import type { PlanPace } from '../scripture/readingPlan'
import { PLAN_PACES } from '../scripture/readingPlan'
import { VERSIONS } from '../scripture/versions'
import type { StoredPlan } from '../hooks/useReadingPlan'

const PACE_COPY: Record<PlanPace, { label: 'planPace90' | 'planPace180' | 'planPace365'; hint: 'planPace90Hint' | 'planPace180Hint' | 'planPace365Hint' }> = {
  90: { label: 'planPace90', hint: 'planPace90Hint' },
  180: { label: 'planPace180', hint: 'planPace180Hint' },
  365: { label: 'planPace365', hint: 'planPace365Hint' },
}

type ReadingOptionsProps = {
  plan: StoredPlan | null
  onSave: (pace: PlanPace, versionId: string) => void
}

export function ReadingOptions({ plan, onSave }: ReadingOptionsProps) {
  const { versionId, t } = useLanguage()
  const [pace, setPace] = useState<PlanPace>(plan?.pace ?? 365)
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
      <p className="field-note">{t('readingOptionsHelp')}</p>
      <fieldset className="field">
        <legend className="setting-label">{t('planPace')}</legend>
        <div className="pace-options">
          {PLAN_PACES.map((option) => {
            const copy = PACE_COPY[option]
            return (
              <button
                key={option}
                type="button"
                className="pace-option"
                aria-pressed={pace === option}
                onClick={() => setPace(option)}
              >
                <span className="pace-name">{t(copy.label)}</span>
                <span className="pace-hint">{t(copy.hint)}</span>
              </button>
            )
          })}
        </div>
      </fieldset>
      <label className="field">
        <span className="setting-label">{t('planTranslation')}</span>
        <select className="plan-select" value={translation} onChange={(event) => setTranslation(event.target.value)}>
          {groups.map((group) => (
            <optgroup key={group.language} label={group.label}>
              {VERSIONS.filter((version) => version.language === group.language).map((version) => (
                <option key={version.id} value={version.id}>
                  {version.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="setting-help">{t('bibleVersionHelp')}</span>
      </label>
      <div className="plan-edition">
        <span className="setting-label">{t('planEdition')}</span>
        <p>{t('planEditionProtestant')}</p>
      </div>
      {plan ? <p className="field-note">{t('planPaceChange')}</p> : null}
      <button type="submit" className="button button-block">
        {plan ? t('planSave') : t('planStart')}
      </button>
    </form>
  )
}
