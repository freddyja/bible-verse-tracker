import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { versesSharingCategory } from '../data/related'
import type { Verse } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import { relatedPassages, type ScriptureHit } from '../scripture/api'
import { formatPassage, parseReference } from '../scripture/passages'

type RelatedVersesProps = {
  reference: string
  categoryIds: readonly string[]
  verses: readonly Verse[]
  currentId: string | null
  locked: boolean
  onClose: () => void
  onOpenVerse: (verseId: string) => void
  onAddReference: (reference: string, text: string) => void
}

export function RelatedVerses({
  reference,
  categoryIds,
  verses,
  currentId,
  locked,
  onClose,
  onOpenVerse,
  onAddReference,
}: RelatedVersesProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { language, versionId, t } = useLanguage()
  const library = versesSharingCategory(verses, categoryIds, currentId)
  const hasReference = reference.trim().length > 0
  const [loaded, setLoaded] = useState<{ key: string; rows: ScriptureHit[] } | null>(null)
  const parsed = hasReference ? parseReference(reference) : null
  const loadKey = parsed ? `${versionId}:${parsed.bookIndex}:${parsed.chapter}:${parsed.verse}` : ''
  const passages = !parsed ? [] : loaded?.key === loadKey ? loaded.rows : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    closeRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  useEffect(() => {
    const next = parseReference(reference)
    if (!next) return
    const key = `${versionId}:${next.bookIndex}:${next.chapter}:${next.verse}`
    let cancelled = false
    relatedPassages(versionId, next)
      .then((rows) => {
        if (!cancelled) setLoaded({ key, rows })
      })
      .catch(() => {
        if (!cancelled) setLoaded({ key, rows: [] })
      })
    return () => {
      cancelled = true
    }
  }, [versionId, reference])

  let libraryMessage: string | null = null
  if (categoryIds.length === 0) libraryMessage = t('relatedNeedCategory')
  else if (library.length === 0) libraryMessage = t('relatedLibraryEmpty')

  let scriptureMessage: string | null = null
  if (!hasReference) scriptureMessage = t('relatedNeedReference')
  else if (passages === null) scriptureMessage = t('relatedLoading')
  else if (passages.length === 0) scriptureMessage = t('relatedScriptureEmpty')

  return createPortal(
    <dialog
      ref={dialogRef}
      className="dialog related-sheet"
      aria-labelledby="related-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="related-head">
        <h2 id="related-title" className="dialog-title">
          {t('relatedVerses')}
        </h2>
        <button ref={closeRef} type="button" className="text-button" onClick={onClose}>
          {t('close')}
        </button>
      </div>

      <div className="related-body">
        {locked ? <p className="field-note">{t('stopThenSave')}</p> : null}

        <section className="related-section" aria-labelledby="related-library">
          <h3 id="related-library" className="related-heading">
            {t('fromLibrary')}
          </h3>
          {libraryMessage ? <p className="field-note">{libraryMessage}</p> : null}
          {library.length > 0 ? (
            <ul className="related-list">
              {library.map((verse) => (
                <li key={verse.id} className="related-row">
                  <button
                    type="button"
                    className="related-open"
                    disabled={locked}
                    onClick={() => onOpenVerse(verse.id)}
                  >
                    <span className="related-ref">{verse.reference}</span>
                    <span className="related-snippet">{verse.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="related-section" aria-labelledby="related-scripture">
          <h3 id="related-scripture" className="related-heading">
            {t('crossReferences')}
          </h3>
          {scriptureMessage ? <p className="field-note">{scriptureMessage}</p> : null}
          {passages && passages.length > 0 ? (
            <ul className="related-list">
              {passages.map((passage) => {
                const label = formatPassage(language, passage)
                return (
                  <li key={label} className="related-row">
                    <div className="related-open">
                      <span className="related-ref">{label}</span>
                      <span className="related-snippet scripture-snippet">{passage.text}</span>
                    </div>
                    <button
                      type="button"
                      className="button button-small button-ghost"
                      disabled={locked}
                      aria-label={t('addReference', { reference: label })}
                      onClick={() => onAddReference(label, passage.text)}
                    >
                      {t('add')}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </section>
      </div>
    </dialog>,
    document.body,
  )
}
