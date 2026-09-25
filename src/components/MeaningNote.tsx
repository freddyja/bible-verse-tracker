import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/useLanguage'
import { useStudyLayers } from '../scripture/useStudyLayers'
import { parseReference } from '../scripture/passages'
import { StudyKeep, type ShelfKeep } from './ShelfSave'

type MeaningBodyProps = {
  bookIndex: number
  chapter: number
  verse: number
}

function NoteParagraphs({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter((paragraph) => paragraph.length > 0)
  return (
    <div className="meaning-text" lang="en">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

function StudySection({
  title,
  empty,
  source,
  children,
}: {
  title: string
  empty: string
  source: string
  children: ReactNode | null
}) {
  const { t } = useLanguage()
  return (
    <section className="study-section">
      <h3 className="related-heading">{title}</h3>
      {children ?? <p className="field-note">{empty}</p>}
      <footer className="meaning-about">
        <p className="meaning-about-label">{t('meaningAbout')}</p>
        <p>{source}</p>
      </footer>
    </section>
  )
}

export function MeaningBody({ bookIndex, chapter, verse }: MeaningBodyProps) {
  const { language, t } = useLanguage()
  const study = useStudyLayers(bookIndex, chapter, verse)

  if (!study) return <p className="field-note">{t('meaningLoading')}</p>

  const contextSource =
    study.contextSource === 'complete'
      ? t('meaningSourceComplete')
      : study.contextSource === 'concise'
        ? t('meaningSource')
        : t('studyContextSources')
  const todaySource =
    study.todaySource === 'morning'
      ? t('studyTodaySourceMorning')
      : study.todaySource === 'checkbook'
        ? t('studyTodaySource')
        : t('studyTodaySources')

  return (
    <div className="meaning-note">
      {language !== 'en' ? <p className="field-note">{t('meaningEnglish')}</p> : null}
      <StudySection title={t('studyContext')} empty={t('studyContextEmpty')} source={contextSource}>
        {study.contextText ? (
          <>
            {study.contextRange && study.contextRange.end > study.contextRange.start ? (
              <p className="meaning-range">
                {t('meaningRange', { start: study.contextRange.start, end: study.contextRange.end })}
              </p>
            ) : null}
            <NoteParagraphs text={study.contextText} />
          </>
        ) : null}
      </StudySection>
      <StudySection title={t('studyThen')} empty={t('studyThenEmpty')} source={t('studyThenSource')}>
        {study.thenNote ? (
          <>
            <p className="meaning-range">{t('studyBookNote')}</p>
            <NoteParagraphs text={study.thenNote} />
          </>
        ) : null}
      </StudySection>
      <StudySection title={t('studyToday')} empty={t('studyTodayEmpty')} source={todaySource}>
        {study.todayNote ? <NoteParagraphs text={study.todayNote} /> : null}
      </StudySection>
    </div>
  )
}

type MeaningNoteProps = {
  reference: string
  locked: boolean
  keep?: ShelfKeep
  onClose: () => void
}

export function MeaningNote({ reference, locked, keep, onClose }: MeaningNoteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { t } = useLanguage()
  const hasReference = reference.trim().length > 0
  const parsed = hasReference ? parseReference(reference) : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    closeRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialogRef}
      className="dialog related-sheet"
      aria-labelledby="meaning-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="related-head">
        <h2 id="meaning-title" className="dialog-title">
          {t('meaning')}
        </h2>
        <button ref={closeRef} type="button" className="text-button" onClick={onClose}>
          {t('close')}
        </button>
      </div>
      <div className="related-body">
        {locked ? <p className="field-note">{t('stopThenSave')}</p> : null}
        {!hasReference ? <p className="field-note">{t('meaningNeedReference')}</p> : null}
        {hasReference && !parsed ? <p className="field-note">{t('meaningEmpty')}</p> : null}
        {parsed ? (
          <MeaningBody bookIndex={parsed.bookIndex} chapter={parsed.chapter} verse={parsed.verse} />
        ) : null}
        {keep && !locked ? <StudyKeep reference={reference} keep={keep} /> : null}
      </div>
    </dialog>,
    document.body,
  )
}
