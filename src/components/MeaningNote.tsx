import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/useLanguage'
import { meaningFor } from '../scripture/api'
import type { MeaningHit } from '../scripture/meaning'
import { parseReference } from '../scripture/passages'

type MeaningBodyProps = {
  bookIndex: number
  chapter: number
  verse: number
}

function MeaningAbout() {
  const { t } = useLanguage()
  return (
    <footer className="meaning-about">
      <p className="meaning-about-label">{t('meaningAbout')}</p>
      <p>{t('meaningSource')}</p>
    </footer>
  )
}

export function MeaningBody({ bookIndex, chapter, verse }: MeaningBodyProps) {
  const { language, t } = useLanguage()
  const [loaded, setLoaded] = useState<{ key: string; note: MeaningHit | null } | null>(null)
  const key = `${bookIndex}:${chapter}:${verse}`
  const note = loaded?.key === key ? loaded.note : null
  const pending = loaded?.key !== key

  useEffect(() => {
    let cancelled = false
    meaningFor({ bookIndex, chapter, verse })
      .then((next) => {
        if (!cancelled) setLoaded({ key, note: next })
      })
      .catch(() => {
        if (!cancelled) setLoaded({ key, note: null })
      })
    return () => {
      cancelled = true
    }
  }, [bookIndex, chapter, verse, key])

  if (pending) return <p className="field-note">{t('meaningLoading')}</p>

  if (!note) {
    return (
      <>
        <p className="field-note">{t('meaningEmpty')}</p>
        <MeaningAbout />
      </>
    )
  }

  const paragraphs = note.text.split(/\n\n+/).filter((paragraph) => paragraph.length > 0)

  return (
    <div className="meaning-note">
      {language !== 'en' ? <p className="field-note">{t('meaningEnglish')}</p> : null}
      {note.end > note.start ? (
        <p className="meaning-range">{t('meaningRange', { start: note.start, end: note.end })}</p>
      ) : null}
      <div className="meaning-text" lang="en">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <MeaningAbout />
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
