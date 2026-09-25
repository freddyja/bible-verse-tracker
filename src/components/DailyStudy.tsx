import type { MessageKey } from '../i18n/messages'
import { useLanguage } from '../i18n/useLanguage'
import type { ContextSource, TodaySource } from '../scripture/studyNotes'
import { useStudyLayers } from '../scripture/useStudyLayers'

function Paragraphs({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter((paragraph) => paragraph.length > 0)
  return (
    <div className="meaning-text" lang="en">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

function contextSourceKey(source: ContextSource | null): MessageKey {
  if (source === 'complete') return 'meaningSourceComplete'
  if (source === 'concise') return 'meaningSource'
  return 'studyContextSources'
}

function todaySourceKey(source: TodaySource | null): MessageKey {
  if (source === 'morning') return 'studyTodaySourceMorning'
  if (source === 'checkbook') return 'studyTodaySource'
  return 'studyTodaySources'
}

type DailyStudyProps = {
  bookIndex: number
  chapter: number
  verse: number
}

export function DailyStudy({ bookIndex, chapter, verse }: DailyStudyProps) {
  const { language, t } = useLanguage()
  const study = useStudyLayers(bookIndex, chapter, verse)

  if (!study) return <p className="field-note">{t('meaningLoading')}</p>

  return (
    <div className="study-stack">
      {language !== 'en' ? <p className="field-note">{t('meaningEnglish')}</p> : null}
      <details className="study-accordion">
        <summary>
          <span className="study-acc-label">{t('dailyMeaning')}</span>
          <span className="study-acc-hint">{t('dailyMeaningHint')}</span>
        </summary>
        <div className="study-acc-body">
          {study.contextText ? (
            <>
              {study.contextRange && study.contextRange.end > study.contextRange.start ? (
                <p className="meaning-range">
                  {t('meaningRange', { start: study.contextRange.start, end: study.contextRange.end })}
                </p>
              ) : null}
              <Paragraphs text={study.contextText} />
            </>
          ) : (
            <p className="field-note">{t('studyContextEmpty')}</p>
          )}
          <footer className="meaning-about">
            <p className="meaning-about-label">{t('meaningAbout')}</p>
            <p>{t(contextSourceKey(study.contextSource))}</p>
          </footer>
        </div>
      </details>
      <details className="study-accordion">
        <summary>
          <span className="study-acc-label">{t('dailyApplication')}</span>
          <span className="study-acc-hint">{t('dailyApplicationHint')}</span>
        </summary>
        <div className="study-acc-body">
          {study.todayNote ? <Paragraphs text={study.todayNote} /> : <p className="field-note">{t('studyTodayEmpty')}</p>}
          <footer className="meaning-about">
            <p className="meaning-about-label">{t('meaningAbout')}</p>
            <p>{t(todaySourceKey(study.todaySource))}</p>
          </footer>
        </div>
      </details>
      <details className="study-accordion">
        <summary>
          <span className="study-acc-label">{t('dailyReflection')}</span>
          <span className="study-acc-hint">{t('dailyReflectionHint')}</span>
        </summary>
        <div className="study-acc-body">
          {study.thenNote ? (
            <>
              <p className="meaning-range">{t('studyBookNote')}</p>
              <Paragraphs text={study.thenNote} />
            </>
          ) : (
            <p className="field-note">{t('studyThenEmpty')}</p>
          )}
          <footer className="meaning-about">
            <p className="meaning-about-label">{t('meaningAbout')}</p>
            <p>{t('studyThenSource')}</p>
          </footer>
        </div>
      </details>
    </div>
  )
}
