import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { getVoiceNote } from '../data/db'
import { LibraryError } from '../data/errors'
import { categoryNamesMatch, normalizeCategoryName } from '../data/names'
import type { Category, Passage, Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { parseReference } from '../scripture/passages'
import { useLanguage } from '../i18n/useLanguage'
import type { MessageKey } from '../i18n/messages'
import { ConfirmDialog } from './ConfirmDialog'
import { RelatedVerses } from './RelatedVerses'
import { VoiceNoteControl } from './VoiceNoteControl'

type VerseFormProps = {
  verse: Verse | null
  initialReference?: string
  initialText?: string
  verses: readonly Verse[]
  categories: Category[]
  onSave: (draft: VerseDraft, id: string | undefined, voice: VoiceNoteUpdate) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onCreateCategory: (name: string) => Promise<Category>
  onDone: () => void
  onOpenVerse: (verseId: string) => void
  onAddReference: (reference: string, text: string) => void
  onReadPassage: (passage: Passage) => void
}

function errorText(
  caught: unknown,
  t: (key: MessageKey) => string,
  fallback: MessageKey,
): string {
  if (caught instanceof LibraryError) return t(caught.code)
  return t(fallback)
}

export function VerseForm({
  verse,
  initialReference,
  initialText,
  verses,
  categories,
  onSave,
  onDelete,
  onCreateCategory,
  onDone,
  onOpenVerse,
  onAddReference,
  onReadPassage,
}: VerseFormProps) {
  const { t } = useLanguage()
  const [reference, setReference] = useState(verse?.reference ?? initialReference ?? '')
  const [text, setText] = useState(verse?.text ?? initialText ?? '')
  const [note, setNote] = useState(verse?.note ?? '')
  const [categoryIds, setCategoryIds] = useState<string[]>(verse?.categoryIds ?? [])
  const [newCategory, setNewCategory] = useState('')
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null)
  const [voiceTouched, setVoiceTouched] = useState(false)
  const [voiceReady, setVoiceReady] = useState(verse === null)
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [relatedOpen, setRelatedOpen] = useState(false)

  const verseId = verse?.id
  useEffect(() => {
    if (!verseId) return
    let cancelled = false
    getVoiceNote(verseId)
      .then((record) => {
        if (cancelled) return
        setVoiceBlob(record?.blob ?? null)
        setVoiceReady(true)
      })
      .catch(() => {
        if (!cancelled) setVoiceReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [verseId])

  function toggleCategory(id: string) {
    setCategoryIds((current) =>
      current.includes(id) ? current.filter((categoryId) => categoryId !== id) : [...current, id],
    )
  }

  async function handleCreateCategory() {
    const name = normalizeCategoryName(newCategory)
    if (!name) {
      setError(t('categoryNameRequired'))
      return
    }
    const existing = categories.find((category) => categoryNamesMatch(category.name, name))
    if (existing) {
      setCategoryIds((current) => (current.includes(existing.id) ? current : [...current, existing.id]))
      setNewCategory('')
      setError(null)
      return
    }

    setBusy(true)
    try {
      const created = await onCreateCategory(name)
      setCategoryIds((current) => [...current, created.id])
      setNewCategory('')
      setError(null)
    } catch (caught) {
      setError(errorText(caught, t, 'couldNotAddCategory'))
    } finally {
      setBusy(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!reference.trim()) {
      setError(t('referenceRequired'))
      return
    }
    if (!text.trim()) {
      setError(t('textRequired'))
      return
    }
    if (recording) {
      setError(t('stopThenSave'))
      return
    }

    const voice: VoiceNoteUpdate = !voiceTouched
      ? { kind: 'keep' }
      : voiceBlob
        ? { kind: 'replace', blob: voiceBlob }
        : { kind: 'remove' }

    const parsed = parseReference(reference)
    setBusy(true)
    try {
      await onSave(
        {
          reference,
          text,
          note,
          categoryIds,
          ...(parsed ? { passage: parsed } : {}),
        },
        verse?.id,
        voice,
      )
      onDone()
    } catch (caught) {
      setError(errorText(caught, t, 'couldNotSave'))
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!verse) return
    setBusy(true)
    try {
      await onDelete(verse.id)
      onDone()
    } catch {
      setError(t('couldNotDeleteVerse'))
      setBusy(false)
      setConfirmingDelete(false)
    }
  }

  return (
    <form className="editor" onSubmit={(event) => void handleSubmit(event)}>
      <label className="field">
        <span className="label">{t('reference')}</span>
        <input
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          placeholder={t('referencePlaceholder')}
          autoComplete="off"
          autoCapitalize="words"
          spellCheck={false}
          required
          autoFocus
        />
      </label>

      <label className="field">
        <span className="label">{t('verse')}</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t('versePlaceholder')}
          rows={6}
          required
        />
      </label>

      <button
        type="button"
        className="button button-related button-block"
        aria-haspopup="dialog"
        onClick={() => setRelatedOpen(true)}
      >
        {t('relatedVerses')}
      </button>
      {parseReference(reference) ? (
        <button
          type="button"
          className="text-button"
          onClick={() => {
            const next = parseReference(reference)
            if (next) onReadPassage(next)
          }}
        >
          {t('readInScripture')}
        </button>
      ) : null}

      <label className="field">
        <span className="label">
          {t('why')} <span className="hint">{t('optional')}</span>
        </span>
        <textarea
          className="note-input"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t('notePlaceholder')}
          rows={3}
        />
      </label>

      {voiceReady ? (
        <VoiceNoteControl
          blob={voiceBlob}
          disabled={busy}
          onChange={(next) => {
            setVoiceBlob(next)
            setVoiceTouched(true)
          }}
          onRecordingChange={setRecording}
        />
      ) : (
        <p className="field-note">{t('openingVoice')}</p>
      )}

      <fieldset className="field">
        <legend className="label">{t('categoriesLegend')}</legend>
        {categories.length === 0 ? (
          <p className="field-note">{t('noCategoriesHint')}</p>
        ) : (
          <div className="check-list">
            {categories.map((category) => (
              <label key={category.id} className="check-row">
                <input
                  type="checkbox"
                  checked={categoryIds.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        )}

        <div className="inline-add">
          <label className="sr-only" htmlFor="new-category">
            {t('newCategory')}
          </label>
          <input
            id="new-category"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return
              event.preventDefault()
              void handleCreateCategory()
            }}
            placeholder={t('newCategory')}
            autoComplete="off"
          />
          <button
            type="button"
            className="button button-ghost"
            disabled={busy}
            onClick={() => void handleCreateCategory()}
          >
            {t('add')}
          </button>
        </div>
      </fieldset>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="button button-block" disabled={busy || !voiceReady || recording}>
        {t('saveVerse')}
      </button>
      {recording ? <p className="field-note">{t('stopThenSave')}</p> : null}

      {verse ? (
        <button
          type="button"
          className="button button-danger button-block"
          disabled={busy}
          onClick={() => setConfirmingDelete(true)}
        >
          {t('deleteVerse')}
        </button>
      ) : null}

      {confirmingDelete ? (
        <ConfirmDialog
          title={t('deleteTitle')}
          message={t('deleteMessage')}
          confirmLabel={t('deleteConfirm')}
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => void handleDelete()}
        />
      ) : null}

      {relatedOpen ? (
        <RelatedVerses
          reference={reference}
          categoryIds={categoryIds}
          verses={verses}
          currentId={verse?.id ?? null}
          locked={recording}
          onClose={() => setRelatedOpen(false)}
          onOpenVerse={onOpenVerse}
          onAddReference={onAddReference}
        />
      ) : null}
    </form>
  )
}
