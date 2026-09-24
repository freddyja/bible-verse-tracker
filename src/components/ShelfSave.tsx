import { useEffect, useId, useState } from 'react'
import type { FormEvent } from 'react'
import { categoryDisplayName, findCategoryByTypedName } from '../data/categoryLabel'
import { getVoiceNote } from '../data/db'
import { LibraryError } from '../data/errors'
import { normalizeCategoryName } from '../data/names'
import type { Category, Passage, Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import type { MessageKey } from '../i18n/messages'
import { formatPassage, parseReference } from '../scripture/passages'
import { VoiceNoteControl } from './VoiceNoteControl'

export type ShelfDraft = {
  note: string
  categoryIds: string[]
  voiceBlob: Blob | null
  voiceReady: boolean
  voiceDirty: boolean
}

type ShelfSaveProps = {
  passage: Passage
  text: string
  saved: Verse | null
  /** Unsaved edits from the verse form, when this sheet sits on top of it. */
  draft?: ShelfDraft
  categories: Category[]
  onSave: (draft: VerseDraft, id: string | undefined, voice: VoiceNoteUpdate) => Promise<void>
  onCreateCategory: (name: string) => Promise<Category>
  onRecordingChange?: (recording: boolean) => void
  onKept?: () => void
  domId?: string
}

function errorText(caught: unknown, t: (key: MessageKey) => string, fallback: MessageKey): string {
  if (caught instanceof LibraryError) return t(caught.code)
  return t(fallback)
}

export function ShelfSave({
  passage,
  text,
  saved,
  draft,
  categories,
  onSave,
  onCreateCategory,
  onRecordingChange,
  onKept,
  domId,
}: ShelfSaveProps) {
  const { language, t } = useLanguage()
  const categoryFieldId = useId()
  const label = (category: Category) => categoryDisplayName(category, t)
  const reference = formatPassage(language, passage)
  const [note, setNote] = useState(draft?.note ?? saved?.note ?? '')
  const [categoryIds, setCategoryIds] = useState<string[]>(draft?.categoryIds ?? saved?.categoryIds ?? [])
  const [newCategory, setNewCategory] = useState('')
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(draft?.voiceBlob ?? null)
  const [voiceTouched, setVoiceTouched] = useState(draft?.voiceDirty ?? false)
  const [voiceReady, setVoiceReady] = useState(draft ? draft.voiceReady : saved === null)
  const [recording, setRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [kept, setKept] = useState(false)
  const verseId = saved?.id

  useEffect(() => {
    if (draft || !verseId) return
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
  }, [draft, verseId])

  function toggleCategory(id: string) {
    setKept(false)
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
    const existing = findCategoryByTypedName(categories, name)
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
    if (!text.trim()) {
      setError(t('textRequired'))
      return
    }
    if (recording) {
      setError(t('stopThenSave'))
      return
    }
    const voice: VoiceNoteUpdate =
      voiceTouched || draft?.voiceDirty
        ? voiceBlob
          ? { kind: 'replace', blob: voiceBlob }
          : { kind: 'remove' }
        : { kind: 'keep' }
    setBusy(true)
    try {
      await onSave(
        {
          reference,
          text,
          note,
          categoryIds,
          passage,
        },
        saved?.id,
        voice,
      )
      setKept(true)
      setError(null)
      setBusy(false)
      onKept?.()
    } catch (caught) {
      setError(errorText(caught, t, 'couldNotSave'))
      setBusy(false)
    }
  }

  return (
    <form className="shelf-save" id={domId} onSubmit={(event) => void handleSubmit(event)}>
      <p className="related-ref">{reference}</p>
      <h3 className="shelf-title">{saved ? t('yourNote') : t('saveThisVerse')}</h3>
      <label className="field">
        <span className="label">
          {t('why')} <span className="hint">{t('optional')}</span>
        </span>
        <textarea
          className="note-input"
          value={note}
          onChange={(event) => {
            setNote(event.target.value)
            setKept(false)
          }}
          placeholder={t('notePlaceholder')}
          rows={3}
        />
      </label>
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
                <span>{label(category)}</span>
              </label>
            ))}
          </div>
        )}
        <div className="inline-add">
          <label className="sr-only" htmlFor={categoryFieldId}>
            {t('newCategory')}
          </label>
          <input
            id={categoryFieldId}
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
          <button type="button" className="button button-ghost" disabled={busy} onClick={() => void handleCreateCategory()}>
            {t('add')}
          </button>
        </div>
      </fieldset>
      {voiceReady ? (
        <VoiceNoteControl
          blob={voiceBlob}
          disabled={busy}
          onChange={(next) => {
            setVoiceBlob(next)
            setVoiceTouched(true)
            setKept(false)
          }}
          onRecordingChange={(next) => {
            setRecording(next)
            onRecordingChange?.(next)
            if (next) setKept(false)
          }}
        />
      ) : (
        <p className="field-note">{t('openingVoice')}</p>
      )}
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      {kept ? <p className="field-note">{t('shelfSaved')}</p> : null}
      <button type="submit" className="button button-block" disabled={busy || !voiceReady || recording}>
        {t('saveVerse')}
      </button>
      {recording ? <p className="field-note">{t('stopThenSave')}</p> : null}
    </form>
  )
}

export type ShelfKeep = {
  text: string
  saved: Verse | null
  verses: readonly Verse[]
  draft?: ShelfDraft
  categories: Category[]
  onSave: ShelfSaveProps['onSave']
  onCreateCategory: ShelfSaveProps['onCreateCategory']
  onRecordingChange?: (recording: boolean) => void
  onKept?: () => void
}

/** The save step for the verse this study sheet is about. */
export function StudyKeep({ reference, keep }: { reference: string; keep: ShelfKeep }) {
  const parsed = parseReference(reference)
  if (!parsed || !keep.text.trim()) return null
  return (
    <ShelfSave
      passage={parsed}
      text={keep.text}
      saved={keep.saved}
      draft={keep.draft}
      categories={keep.categories}
      onSave={keep.onSave}
      onCreateCategory={keep.onCreateCategory}
      onRecordingChange={keep.onRecordingChange}
      onKept={keep.onKept}
    />
  )
}

