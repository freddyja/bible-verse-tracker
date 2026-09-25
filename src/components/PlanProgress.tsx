import type { MessageKey } from '../i18n/messages'
import { BOOKS } from '../scripture/books'
import { useLanguage } from '../i18n/useLanguage'
import { formatPlanSpan, planBookLines, planTitle, type PlanDay } from '../scripture/readingPlan'
import type { StoredPlan } from '../hooks/useReadingPlan'

type PlanProgressProps = {
  plan: StoredPlan
  days: readonly PlanDay[]
  completedCount: number
  currentDay: PlanDay | null
  onToggle: (day: number) => void
  onRead: (day: PlanDay) => void
}

export function PlanProgress({ plan, days, completedCount, currentDay, onToggle, onRead }: PlanProgressProps) {
  const { language, t } = useLanguage()
  const percent = Math.round((completedCount / plan.pace) * 100)
  const paceLabel: MessageKey = plan.pace === 90 ? 'planPace90' : plan.pace === 180 ? 'planPace180' : 'planPace365'
  const lines = currentDay ? planBookLines(language, currentDay) : []

  return (
    <section className="plan-progress">
      <p className="plan-section-label">{t('planOverall')}</p>
      <div className="plan-overall-row">
        <p className="plan-count">
          <span>{completedCount}</span>
          <small> / {t(paceLabel)}</small>
        </p>
        <p className="plan-percent">{percent}%</p>
      </div>
      <div
        className="plan-meter"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={plan.pace}
        aria-valuenow={completedCount}
        aria-label={t('planFraction', { done: completedCount, pace: plan.pace })}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      {currentDay ? (
        <article className="gold-card plan-today">
          <div className="plan-today-kicker">
            <span>{t('planDayProgress', { day: currentDay.day })}</span>
            <span className="plan-mini-meter" aria-hidden="true">
              <span style={{ width: `${percent}%` }} />
            </span>
          </div>
          <h2 className="plan-day">{planTitle(language, currentDay)}</h2>
          <ul className="plan-lines">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <button type="button" className="button button-block" onClick={() => onRead(currentDay)}>
            {t('planRead')}
          </button>
        </article>
      ) : (
        <p className="gold-card plan-done">{t('planDone')}</p>
      )}
      <p className="plan-section-label">{t('planListTitle', { pace: plan.pace })}</p>
      <ul className="plan-days">
        {days.map((day) => {
          const checked = plan.completed.includes(day.day)
          const book = BOOKS[day.start.bookIndex]?.names[language] ?? ''
          return (
            <li key={day.day} className={currentDay?.day === day.day ? 'plan-day-card is-current' : 'plan-day-card'}>
              <button
                type="button"
                className="plan-day-check"
                aria-pressed={checked}
                aria-label={t('planDayOf', { day: day.day, pace: plan.pace })}
                onClick={() => onToggle(day.day)}
              >
                <span className={checked ? 'check-orb is-on' : 'check-orb'}>{checked ? '✓' : ''}</span>
              </button>
              <button type="button" className="plan-day-open" onClick={() => onRead(day)}>
                <span className="plan-day-copy">
                  <span className="plan-check-day">
                    {t('planDayShort', { day: day.day })} · {book}
                  </span>
                  <span className="plan-check-range">{formatPlanSpan(language, day)}</span>
                </span>
                <span className="plan-chevron" aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="field-note">{t('planCheckHint')}</p>
    </section>
  )
}
