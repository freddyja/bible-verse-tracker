import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { crossReferencesFor } from '../data/crossRefs'
import { formatPassage } from '../data/passages'
import { versesSharingCategory } from '../data/related'
import type { Verse } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'

type RelatedVersesProps = {
  reference: string
  categoryIds: readonly string[]
  verses: readonly Verse[]
  currentId: string | null
  locked: boolean
  onClose: () => void
  onOpenVerse: (verseId: string) => void
  onAddReference: (reference: string) => void
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
  const { language, t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const library = versesSharingCategory(verses, categoryIds, currentId)
  const passages = crossReferencesFor(reference)
  const hasReference = reference.trim().length > 0

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    closeRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  let libraryMessage: string | null = null
  if (categoryIds.length === 0) libraryMessage = t('relatedNeedCategory')
  else if (library.length === 0) libraryMessage = t('relatedLibraryEmpty')

  let scriptureMessage: string | null = null
  if (!hasReference) scriptureMessage = t('relatedNeedReference')
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
          {passages.length > 0 ? (
            <ul className="related-list">
              {passages.map((passage) => {
                const label = formatPassage(language, passage)
                return (
                  <li key={label} className="related-row">
                    <span className="related-ref">{label}</span>
                    <button
                      type="button"
                      className="button button-small button-ghost"
                      disabled={locked}
                      aria-label={t('addReference', { reference: label })}
                      onClick={() => onAddReference(label)}
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
