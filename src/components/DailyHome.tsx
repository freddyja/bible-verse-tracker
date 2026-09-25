import type { Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import { formatPlanSpan, type PlanDay } from '../scripture/readingPlan'
import { dailyVerse } from '../scripture/daily'
import type { StoredPlan } from '../hooks/useReadingPlan'
import { DailyStudy } from './DailyStudy'
import { VerseOfTheDay } from './VerseOfTheDay'

type DailyHomeProps = {
  verses: readonly Verse[]
  plan: StoredPlan | null
  completedCount: number
  currentDay: PlanDay | null
  onOpenPassage: (bookIndex: number, chapter: number, verse: number) => void
  onOpenSaved: (verseId: string) => void
  onSaveVerse: (draft: VerseDraft, id: string | undefined, voice: VoiceNoteUpdate) => Promise<void>
  onOpenOptions: () => void
  onOpenPlan: () => void
  onReadPlan: (day: PlanDay) => void
}

export function DailyHome({
  verses,
  plan,
  completedCount,
  currentDay,
  onOpenPassage,
  onOpenSaved,
  onSaveVerse,
  onOpenOptions,
  onOpenPlan,
  onReadPlan,
}: DailyHomeProps) {
  const { language, t } = useLanguage()
  const passage = dailyVerse()
  const percent = plan && plan.pace > 0 ? Math.round((completedCount / plan.pace) * 100) : 0

  return (
    <div className="daily-home">
      <VerseOfTheDay
        verses={verses}
        onOpen={onOpenPassage}
        onOpenSaved={onOpenSaved}
        onSaveVerse={onSaveVerse}
      />
      <DailyStudy bookIndex={passage.bookIndex} chapter={passage.chapter} verse={passage.verse} />
      {plan ? (
        <section className="gold-card plan-peek">
          <p className="votd-kicker">{t('planProgressTitle')}</p>
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
          {currentDay ? (
            <>
              <h2 className="plan-day">{t('planDayOf', { day: currentDay.day, pace: plan.pace })}</h2>
              <p className="plan-range">{formatPlanSpan(language, currentDay)}</p>
              <div className="plan-peek-actions">
                <button type="button" className="button" onClick={() => onReadPlan(currentDay)}>
                  {t('planRead')}
                </button>
                <button type="button" className="button button-ghost" onClick={onOpenPlan}>
                  {t('planSeeDays')}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="plan-done-line">{t('planDone')}</p>
              <button type="button" className="button button-ghost" onClick={onOpenPlan}>
                {t('planSeeDays')}
              </button>
            </>
          )}
        </section>
      ) : (
        <section className="gold-card plan-peek">
          <h2 className="plan-day">{t('readingOptions')}</h2>
          <p className="field-note">{t('readingOptionsHelp')}</p>
          <button type="button" className="button" onClick={onOpenOptions}>
            {t('planSetup')}
          </button>
        </section>
      )}
    </div>
  )
}
