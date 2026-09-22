import { useState } from 'react'
import type { FormEvent } from 'react'
import { LibraryError } from '../data/errors'
import type { Category } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import type { MessageKey } from '../i18n/messages'
import { ConfirmDialog } from './ConfirmDialog'

type CategoryManagerProps = {
  categories: Category[]
  onCreate: (name: string) => Promise<Category>
  onRename: (id: string, name: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

function errorText(
  caught: unknown,
  t: (key: MessageKey) => string,
  fallback: MessageKey,
): string {
  if (caught instanceof LibraryError) return t(caught.code)
  return t(fallback)
}

export function CategoryManager({ categories, onCreate, onRename, onDelete }: CategoryManagerProps) {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    try {
      await onCreate(name)
      setName('')
      setError(null)
    } catch (caught) {
      setError(errorText(caught, t, 'couldNotAddCategory'))
    } finally {
      setBusy(false)
    }
  }

  async function handleRename(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editingId) return
    setBusy(true)
    try {
      await onRename(editingId, editingName)
      setEditingId(null)
      setEditingName('')
      setError(null)
    } catch (caught) {
      setError(errorText(caught, t, 'couldNotRename'))
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(category: Category) {
    setBusy(true)
    try {
      await onDelete(category.id)
      setPendingDelete(null)
      setError(null)
    } catch {
      setError(t('couldNotDeleteCategory'))
      setPendingDelete(null)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="categories">
      <p className="lede">{t('categoryLede')}</p>

      <form className="add-row" onSubmit={(event) => void handleCreate(event)}>
        <label className="sr-only" htmlFor="category-name">
          {t('newCategory')}
        </label>
        <input
          id="category-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t('newCategory')}
          autoComplete="off"
          autoCapitalize="sentences"
        />
        <button type="submit" className="button" disabled={busy}>
          {t('add')}
        </button>
      </form>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      {categories.length === 0 ? (
        <p className="empty">{t('noCategories')}</p>
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} className="category-row">
              {editingId === category.id ? (
                <form className="rename-row" onSubmit={(event) => void handleRename(event)}>
                  <label className="sr-only" htmlFor={`rename-${category.id}`}>
                    {t('renameNamed', { name: category.name })}
                  </label>
                  <input
                    id={`rename-${category.id}`}
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="button button-small" disabled={busy}>
                    {t('save')}
                  </button>
                  <button
                    type="button"
                    className="button button-ghost button-small"
                    onClick={() => {
                      setEditingId(null)
                      setError(null)
                    }}
                  >
                    {t('cancel')}
                  </button>
                </form>
              ) : (
                <>
                  <span className="category-name">{category.name}</span>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => {
                        setEditingId(category.id)
                        setEditingName(category.name)
                        setError(null)
                      }}
                    >
                      {t('rename')}
                    </button>
                    <button
                      type="button"
                      className="text-button text-button-danger"
                      onClick={() => setPendingDelete(category)}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {pendingDelete ? (
        <ConfirmDialog
          title={t('deleteCategoryTitle', { name: pendingDelete.name })}
          message={t('deleteCategoryMessage')}
          confirmLabel={t('deleteCategoryConfirm')}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => void handleDelete(pendingDelete)}
        />
      ) : null}
    </section>
  )
}
