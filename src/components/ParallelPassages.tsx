import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/useLanguage'
import { parallelPassages, type ParallelHit } from '../scripture/api'
import { formatPassageRange, parseReference, type PassageRef } from '../scripture/passages'
import { ScriptureText } from './ScriptureText'

type ParallelPassagesProps = {
  reference: string
  locked: boolean
  onClose: () => void
  onReadPassage: (passage: PassageRef) => void
}

export function ParallelPassages({ reference, locked, onClose, onReadPassage }: ParallelPassagesProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { language, versionId, t } = useLanguage()
  const hasReference = reference.trim().length > 0
  const [loaded, setLoaded] = useState<{ key: string; rows: ParallelHit[] } | null>(null)
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
    parallelPassages(versionId, next)
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

  let message: string | null = null
  if (!hasReference || !parsed) message = hasReference ? t('parallelEmpty') : t('parallelNeedReference')
  else if (passages === null) message = t('parallelLoading')
  else if (passages.length === 0) message = t('parallelEmpty')

  return createPortal(
    <dialog
      ref={dialogRef}
      className="dialog related-sheet"
      aria-labelledby="parallel-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="related-head">
        <h2 id="parallel-title" className="dialog-title">
          {t('parallelPassages')}
        </h2>
        <button ref={closeRef} type="button" className="text-button" onClick={onClose}>
          {t('close')}
        </button>
      </div>
      <div className="related-body">
        {locked ? <p className="field-note">{t('stopThenSave')}</p> : null}
        {message ? <p className="field-note">{message}</p> : null}
        {passages && passages.length > 0 ? (
          <ul className="related-list">
            {passages.map((passage) => {
              const label = formatPassageRange(language, passage)
              return (
                <li key={label} className="related-row">
                  <button
                    type="button"
                    className="related-open"
                    disabled={locked}
                    onClick={() => onReadPassage(passage)}
                  >
                    <span className="related-ref">{label}</span>
                    <ScriptureText
                      bookIndex={passage.bookIndex}
                      chapter={passage.chapter}
                      verse={passage.verse}
                      text={passage.text}
                      className="related-snippet scripture-snippet"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </dialog>,
    document.body,
  )
}
