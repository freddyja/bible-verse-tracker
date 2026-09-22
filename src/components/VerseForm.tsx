import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { getVoiceNote } from '../data/db'
import { LibraryError } from '../data/errors'
import { categoryNamesMatch, normalizeCategoryName } from '../data/names'
import type { Category, Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { ConfirmDialog } from './ConfirmDialog'
import { VoiceNoteControl } from './VoiceNoteControl'

type VerseFormProps = {
  verse: Verse | null
  categories: Category[]
  onSave: (draft: VerseDraft, id: string | undefined, voice: VoiceNoteUpdate) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onCreateCategory: (name: string) => Promise<Category>
  onDone: () => void
}

export function VerseForm({
  verse,
  categories,
  onSave,
  onDelete,
  onCreateCategory,
  onDone,
}: VerseFormProps) {
  const [reference, setReference] = useState(verse?.reference ?? '')
  const [text, setText] = useState(verse?.text ?? '')
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
      setError('Give the category a name.')
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
      setError(caught instanceof LibraryError ? caught.message : 'Could not add that category.')
    } finally {
      setBusy(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!reference.trim()) {
      setError('Add a reference.')
      return
    }
    if (!text.trim()) {
      setError('Add the verse text.')
      return
    }
    if (recording) {
      setError('Stop the voice note, then save.')
      return
    }

    const voice: VoiceNoteUpdate = !voiceTouched
      ? { kind: 'keep' }
      : voiceBlob
        ? { kind: 'replace', blob: voiceBlob }
        : { kind: 'remove' }

    setBusy(true)
    try {
      await onSave({ reference, text, note, categoryIds }, verse?.id, voice)
      onDone()
    } catch (caught) {
      setError(caught instanceof LibraryError ? caught.message : 'Could not save this verse.')
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
      setError('Could not delete this verse.')
      setBusy(false)
      setConfirmingDelete(false)
    }
  }

  return (
    <form className="editor" onSubmit={(event) => void handleSubmit(event)}>
      <label className="field">
        <span className="label">Reference</span>
        <input
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          placeholder="John 3:16, or any wording you use"
          autoComplete="off"
          autoCapitalize="words"
          spellCheck={false}
          required
          autoFocus
        />
      </label>

      <label className="field">
        <span className="label">Verse</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="The words you want to keep"
          rows={6}
          required
        />
      </label>

      <label className="field">
        <span className="label">
          Why it hit you <span className="hint">Optional</span>
        </span>
        <textarea
          className="note-input"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="A few words for later"
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
        <p className="field-note">Opening voice note…</p>
      )}

      <fieldset className="field">
        <legend className="label">Categories</legend>
        {categories.length === 0 ? (
          <p className="field-note">No categories yet. Add one below if you want.</p>
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
            New category
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
            placeholder="New category"
            autoComplete="off"
          />
          <button
            type="button"
            className="button button-ghost"
            disabled={busy}
            onClick={() => void handleCreateCategory()}
          >
            Add
          </button>
        </div>
      </fieldset>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="button button-block" disabled={busy || !voiceReady || recording}>
        Save verse
      </button>
      {recording ? <p className="field-note">Stop the voice note, then save.</p> : null}

      {verse ? (
        <button
          type="button"
          className="button button-danger button-block"
          disabled={busy}
          onClick={() => setConfirmingDelete(true)}
        >
          Delete verse
        </button>
      ) : null}

      {confirmingDelete ? (
        <ConfirmDialog
          title="Delete this verse?"
          message="This removes the verse and its voice note from this device."
          confirmLabel="Delete verse"
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => void handleDelete()}
        />
      ) : null}
    </form>
  )
}
