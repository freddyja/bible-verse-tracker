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

function IconMeaning() {
  return (
    <svg className="study-acc-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.2 15.2 19 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconApplication() {
  return (
    <svg className="study-acc-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  )
}

function IconReflection() {
  return (
    <svg className="study-acc-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 5.5h8.2c.9 0 1.8.4 2.3 1.1.5-.7 1.4-1.1 2.3-1.1H21V18h-2.2c-.8 0-1.6.3-2.2.8-.6-.5-1.4-.8-2.2-.8H6V5.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
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
          <IconMeaning />
          <span className="study-acc-label">{t('dailyMeaning')}</span>
        </summary>
        <div className="study-acc-body">
          <p className="field-note">{t('dailyMeaningHint')}</p>
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
          <IconApplication />
          <span className="study-acc-label">{t('dailyApplication')}</span>
        </summary>
        <div className="study-acc-body">
          <p className="field-note">{t('dailyApplicationHint')}</p>
          {study.todayNote ? <Paragraphs text={study.todayNote} /> : <p className="field-note">{t('studyTodayEmpty')}</p>}
          <footer className="meaning-about">
            <p className="meaning-about-label">{t('meaningAbout')}</p>
            <p>{t(todaySourceKey(study.todaySource))}</p>
          </footer>
        </div>
      </details>
      <details className="study-accordion">
        <summary>
          <IconReflection />
          <span className="study-acc-label">{t('dailyReflection')}</span>
        </summary>
        <div className="study-acc-body">
          <p className="field-note">{t('dailyReflectionHint')}</p>
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
