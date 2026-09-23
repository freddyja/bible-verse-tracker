import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/useLanguage'
import { audienceFor, meaningFor, todayFor } from '../scripture/api'
import type { MeaningHit } from '../scripture/meaning'
import { parseReference } from '../scripture/passages'

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
  const key = `${bookIndex}:${chapter}:${verse}`
  const [loaded, setLoaded] = useState<{
    key: string
    context: MeaningHit | null
    thenNote: string | null
    todayNote: string | null
  } | null>(null)
  const study = loaded?.key === key ? loaded : null

  useEffect(() => {
    let cancelled = false
    Promise.all([
      meaningFor({ bookIndex, chapter, verse }),
      audienceFor({ bookIndex, chapter, verse }),
      todayFor({ bookIndex, chapter, verse }),
    ])
      .then(([context, thenNote, todayNote]) => {
        if (!cancelled) setLoaded({ key, context, thenNote, todayNote })
      })
      .catch(() => {
        if (!cancelled) setLoaded({ key, context: null, thenNote: null, todayNote: null })
      })
    return () => {
      cancelled = true
    }
  }, [bookIndex, chapter, verse, key])

  if (!study) return <p className="field-note">{t('meaningLoading')}</p>

  const context = study.context

  return (
    <div className="meaning-note">
      {language !== 'en' ? <p className="field-note">{t('meaningEnglish')}</p> : null}
      <StudySection title={t('studyContext')} empty={t('studyContextEmpty')} source={t('meaningSource')}>
        {context ? (
          <>
            {context.end > context.start ? (
              <p className="meaning-range">{t('meaningRange', { start: context.start, end: context.end })}</p>
            ) : null}
            <NoteParagraphs text={context.text} />
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
      <StudySection title={t('studyToday')} empty={t('studyTodayEmpty')} source={t('studyTodaySource')}>
        {study.todayNote ? <NoteParagraphs text={study.todayNote} /> : null}
      </StudySection>
    </div>
  )
}

type MeaningNoteProps = {
  reference: string
  locked: boolean
  onClose: () => void
}

export function MeaningNote({ reference, locked, onClose }: MeaningNoteProps) {
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
      </div>
    </dialog>,
    document.body,
  )
}
