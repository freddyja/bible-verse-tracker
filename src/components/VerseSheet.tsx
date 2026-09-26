import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { verseForPassage } from '../data/matchVerse'
import type { Category, Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import type { MessageKey } from '../i18n/messages'
import { parallelPassages, relatedPassages, type ParallelHit, type ScriptureHit } from '../scripture/api'
import { formatPassage, formatPassageRange, samePassage, type PassageRef } from '../scripture/passages'
import { LexiconBody } from './LexiconPanel'
import { MeaningBody } from './MeaningNote'
import { ParallelEmptyNote } from './ParallelEmptyNote'
import { ScriptureText } from './ScriptureText'
import { ShelfSave } from './ShelfSave'

type Tool = 'related' | 'parallel' | 'study' | 'lexicon' | 'save'

type VerseSheetProps = {
  passage: PassageRef
  text: string
  saved: readonly Verse[]
  categories: Category[]
  listenSupported: boolean
  onListen: () => void
  onClose: () => void
  onOpenPassage: (passage: PassageRef) => void
  onSaveVerse: (draft: VerseDraft, id: string | undefined, voice: VoiceNoteUpdate) => Promise<void>
  onCreateCategory: (name: string) => Promise<Category>
  onRecordingChange?: (recording: boolean) => void
  onDictateStart?: () => void
  initialTool?: Tool | null
  variant?: 'sheet' | 'pane'
}

const DRILL: { id: Exclude<Tool, 'save'>; label: MessageKey; hint: MessageKey }[] = [
  { id: 'related', label: 'relatedVerses', hint: 'toolRelatedHint' },
  { id: 'parallel', label: 'parallelPassages', hint: 'toolParallelHint' },
  { id: 'study', label: 'meaning', hint: 'toolStudyHint' },
  { id: 'lexicon', label: 'lexicon', hint: 'toolLexiconHint' },
]

export function VerseSheet({
  passage,
  text,
  saved,
  categories,
  listenSupported,
  onListen,
  onClose,
  onOpenPassage,
  onSaveVerse,
  onCreateCategory,
  onRecordingChange,
  onDictateStart,
  initialTool = null,
  variant = 'sheet',
}: VerseSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<Tool | null>(null)
  const { language, versionId, t } = useLanguage()
  const [tool, setTool] = useState<Tool | null>(initialTool)
  const [shelfAim, setShelfAim] = useState<PassageRef | null>(null)
  const [related, setRelated] = useState<{ key: string; rows: ScriptureHit[] } | null>(null)
  const [parallel, setParallel] = useState<{ key: string; rows: ParallelHit[] } | null>(null)
  const passageKey = `${passage.bookIndex}:${passage.chapter}:${passage.verse}`
  const loadKey = `${versionId}:${passageKey}`
  const reference = formatPassage(language, passage)
  const already = verseForPassage(saved, passage)

  useEffect(() => {
    if (variant !== 'sheet') return
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    closeRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [variant])

  useEffect(() => {
    if (variant !== 'pane') return
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (tool) {
        returnFocus.current = tool
        setTool(null)
        return
      }
      onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [variant, tool, onClose])

  useEffect(() => {
    if (tool !== 'related') return
    let cancelled = false
    relatedPassages(versionId, passage)
      .then((rows) => {
        if (!cancelled) setRelated({ key: loadKey, rows })
      })
      .catch(() => {
        if (!cancelled) setRelated({ key: loadKey, rows: [] })
      })
    return () => {
      cancelled = true
    }
  }, [versionId, passage, loadKey, tool])

  useEffect(() => {
    if (tool !== 'parallel') return
    let cancelled = false
    parallelPassages(versionId, passage)
      .then((rows) => {
        if (!cancelled) setParallel({ key: loadKey, rows })
      })
      .catch(() => {
        if (!cancelled) setParallel({ key: loadKey, rows: [] })
      })
    return () => {
      cancelled = true
    }
  }, [versionId, passage, loadKey, tool])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    if (tool !== null) {
      panelRef.current?.focus()
      return
    }
    const id = returnFocus.current
    if (!id) return
    returnFocus.current = null
    document.getElementById(`verse-tool-${id}`)?.focus()
  }, [tool])

  function openTool(next: Tool) {
    setTool(next)
  }

  function closeTool() {
    returnFocus.current = tool
    setTool(null)
  }

  const relatedRows = related?.key === loadKey ? related.rows : null
  const parallelRows = parallel?.key === loadKey ? parallel.rows : null
  const aim = shelfAim && !samePassage(shelfAim, passage) ? shelfAim : null
  const formPassage = aim ?? passage
  const aimedRow =
    (parallelRows ?? []).find((row) => samePassage(row, formPassage)) ??
    (relatedRows ?? []).find((row) => samePassage(row, formPassage))
  const formText = samePassage(formPassage, passage) ? text : (aimedRow?.text ?? '')

  function keepPassage(target: PassageRef) {
    setShelfAim(samePassage(target, passage) ? null : target)
    openTool('save')
  }

  const toolTitle =
    tool === 'related'
      ? t('relatedVerses')
      : tool === 'parallel'
        ? t('parallelPassages')
        : tool === 'study'
          ? t('meaning')
          : tool === 'lexicon'
            ? t('lexicon')
            : tool === 'save'
              ? already && !aim
                ? t('yourNote')
                : t('saveThisVerse')
              : ''

  const body = (
    <>
      <div className="related-head">
        <div className="verse-sheet-title">
          {tool !== null ? (
            <button type="button" className="text-button verse-sheet-back" onClick={closeTool}>
              {t('verseToolsBack')}
            </button>
          ) : null}
          <h2 id="verse-sheet-title" className="dialog-title">
            {reference}
          </h2>
          {tool === null ? (
            <p className="verse-sheet-snippet">
              <ScriptureText bookIndex={passage.bookIndex} chapter={passage.chapter} verse={passage.verse} text={text} />
            </p>
          ) : null}
        </div>
        <button
          ref={closeRef}
          type="button"
          className={variant === 'pane' ? 'pane-close' : 'text-button'}
          onClick={onClose}
        >
          {variant === 'pane' ? (
            <span className="pane-close-x" aria-hidden="true">
              ×
            </span>
          ) : null}
          {t('close')}
        </button>
      </div>

      <div ref={bodyRef} className="related-body">
        {tool === null ? (
          <ul className="verse-tools">
            {DRILL.map((row) => (
              <li key={row.id}>
                <button
                  id={`verse-tool-${row.id}`}
                  type="button"
                  className="verse-tool"
                  onClick={() => openTool(row.id)}
                >
                  <span className="verse-tool-copy">
                    <span className="verse-tool-label">{t(row.label)}</span>
                    <span className="verse-tool-hint">{t(row.hint)}</span>
                  </span>
                  <span className="verse-tool-go" aria-hidden="true">
                    ›
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button
                id="verse-tool-listen"
                type="button"
                className="verse-tool"
                disabled={!listenSupported}
                onClick={() => {
                  onListen()
                  onClose()
                }}
              >
                <span className="verse-tool-copy">
                  <span className="verse-tool-label">{t('listenVerse')}</span>
                  <span className="verse-tool-hint">
                    {listenSupported ? t('toolListenHint') : t('listenUnavailable')}
                  </span>
                </span>
              </button>
            </li>
            <li>
              <button id="verse-tool-save" type="button" className="verse-tool" onClick={() => openTool('save')}>
                <span className="verse-tool-copy">
                  <span className="verse-tool-label">{already ? t('yourNote') : t('saveThisVerse')}</span>
                  <span className="verse-tool-hint">
                    {already ? `${t('savedBadge')} · ${t('toolSaveHint')}` : t('toolSaveHint')}
                  </span>
                </span>
                <span className="verse-tool-go" aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          </ul>
        ) : null}

        {tool === 'related' ? (
          <section className="verse-tool-panel" aria-labelledby="related-verses">
            <h3 id="related-verses" ref={panelRef} tabIndex={-1} className="related-heading verse-panel-title">
              {t('relatedVerses')}
            </h3>
            {relatedRows === null ? <p className="field-note">{t('relatedLoading')}</p> : null}
            {relatedRows && relatedRows.length === 0 ? <p className="field-note">{t('relatedScriptureEmpty')}</p> : null}
            {relatedRows && relatedRows.length > 0 ? (
              <ul className="related-list">
                {relatedRows.map((row) => {
                  const label = formatPassage(language, row)
                  return (
                    <li key={label} className="related-row">
                      <button type="button" className="related-open" onClick={() => onOpenPassage(row)}>
                        <span className="related-ref">{label}</span>
                        <ScriptureText
                          bookIndex={row.bookIndex}
                          chapter={row.chapter}
                          verse={row.verse}
                          text={row.text}
                          className="related-snippet scripture-snippet"
                        />
                      </button>
                      <button
                        type="button"
                        className="button button-small button-ghost"
                        aria-label={t('saveReference', { reference: label })}
                        onClick={() => keepPassage(row)}
                      >
                        {verseForPassage(saved, row) ? t('savedBadge') : t('save')}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </section>
        ) : null}

        {tool === 'parallel' ? (
          <section className="verse-tool-panel" aria-labelledby="parallel-panel-title">
            <h3 id="parallel-panel-title" ref={panelRef} tabIndex={-1} className="related-heading verse-panel-title">
              {t('parallelPassages')}
            </h3>
            {parallelRows === null ? <p className="field-note">{t('parallelLoading')}</p> : null}
            {parallelRows && parallelRows.length === 0 ? (
              <ParallelEmptyNote onShowRelated={() => openTool('related')} />
            ) : null}
            {parallelRows && parallelRows.length > 0 ? (
              <ul className="related-list">
                {parallelRows.map((row) => {
                  const label = formatPassageRange(language, row)
                  return (
                    <li key={label} className="related-row">
                      <button type="button" className="related-open" onClick={() => onOpenPassage(row)}>
                        <span className="related-ref">{label}</span>
                        <ScriptureText
                          bookIndex={row.bookIndex}
                          chapter={row.chapter}
                          verse={row.verse}
                          text={row.text}
                          className="related-snippet scripture-snippet"
                        />
                      </button>
                      <button
                        type="button"
                        className="button button-small button-ghost"
                        aria-label={t('saveReference', { reference: label })}
                        onClick={() => keepPassage(row)}
                      >
                        {verseForPassage(saved, row) ? t('savedBadge') : t('save')}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </section>
        ) : null}

        {tool === 'study' ? (
          <section className="verse-tool-panel" aria-labelledby="study-panel-title">
            <h3 id="study-panel-title" ref={panelRef} tabIndex={-1} className="related-heading verse-panel-title">
              {t('meaning')}
            </h3>
            <div className="meaning-block">
              <MeaningBody bookIndex={passage.bookIndex} chapter={passage.chapter} verse={passage.verse} />
            </div>
          </section>
        ) : null}

        {tool === 'lexicon' ? (
          <section className="verse-tool-panel" aria-labelledby="lexicon-panel-title">
            <h3 id="lexicon-panel-title" ref={panelRef} tabIndex={-1} className="related-heading verse-panel-title">
              {t('lexicon')}
            </h3>
            <div className="meaning-block">
              <LexiconBody bookIndex={passage.bookIndex} chapter={passage.chapter} verse={passage.verse} />
            </div>
          </section>
        ) : null}

        {tool === 'save' ? (
          <section className="verse-tool-panel" aria-labelledby="save-panel-title">
            <h3 id="save-panel-title" ref={panelRef} tabIndex={-1} className="related-heading verse-panel-title">
              {toolTitle}
            </h3>
            {aim ? (
              <button type="button" className="text-button" onClick={() => setShelfAim(null)}>
                {t('shelfThisVerse')}
              </button>
            ) : null}
            <ShelfSave
              key={`${formPassage.bookIndex}-${formPassage.chapter}-${formPassage.verse}`}
              passage={formPassage}
              text={formText}
              saved={verseForPassage(saved, formPassage) ?? null}
              categories={categories}
              onSave={onSaveVerse}
              onCreateCategory={onCreateCategory}
              onRecordingChange={onRecordingChange}
              onDictateStart={onDictateStart}
            />
          </section>
        ) : null}
      </div>
    </>
  )

  if (variant === 'pane') {
    return (
      <section id="verse-sheet" className="study-pane verse-sheet" aria-labelledby="verse-sheet-title">
        {body}
      </section>
    )
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      id="verse-sheet"
      className="dialog related-sheet verse-sheet"
      aria-labelledby="verse-sheet-title"
      onCancel={(event) => {
        event.preventDefault()
        if (tool) {
          closeTool()
          return
        }
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {body}
    </dialog>,
    document.body,
  )
}
