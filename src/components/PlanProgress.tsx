import { useLanguage } from '../i18n/useLanguage'
import { formatPlanSpan, type PlanDay } from '../scripture/readingPlan'
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

  return (
    <section className="plan-progress">
      <p className="plan-count">{t('planFraction', { done: completedCount, pace: plan.pace })}</p>
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
      <p className="field-note">{t('planCheckHint')}</p>
      {currentDay ? (
        <article className="gold-card plan-today">
          <p className="votd-kicker">{t('planToday')}</p>
          <h2 className="plan-day">{t('planDayOf', { day: currentDay.day, pace: plan.pace })}</h2>
          <p className="plan-range">{formatPlanSpan(language, currentDay)}</p>
          <button type="button" className="button" onClick={() => onRead(currentDay)}>
            {t('planRead')}
          </button>
        </article>
      ) : (
        <p className="gold-card plan-done">{t('planDone')}</p>
      )}
      <ul className="plan-check">
        {days.map((day) => {
          const checked = plan.completed.includes(day.day)
          const current = currentDay?.day === day.day
          return (
            <li key={day.day} className={current ? 'plan-check-row is-current' : 'plan-check-row'}>
              <label>
                <input type="checkbox" checked={checked} onChange={() => onToggle(day.day)} />
                <span>
                  <span className="plan-check-day">{t('planDayOf', { day: day.day, pace: plan.pace })}</span>
                  <span className="plan-check-range">{formatPlanSpan(language, day)}</span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
