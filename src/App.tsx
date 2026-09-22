import { useMemo, useState } from 'react'
import { CategoryManager } from './components/CategoryManager'
import { LanguagePicker } from './components/LanguagePicker'
import { VerseForm } from './components/VerseForm'
import { VerseList } from './components/VerseList'
import { filterVerses } from './data/filter'
import { useLibrary } from './hooks/useLibrary'
import { useLanguage } from './i18n/useLanguage'

type View =
  | { kind: 'list' }
  | { kind: 'edit'; verseId: string | null; prefillReference?: string }
  | { kind: 'categories' }

export default function App() {
  const library = useLibrary()
  const { t } = useLanguage()
  const [view, setView] = useState<View>({ kind: 'list' })
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  const activeCategoryId =
    categoryId !== null && library.categories.some((category) => category.id === categoryId)
      ? categoryId
      : null

  const visibleVerses = useMemo(
    () => filterVerses(library.verses, query, activeCategoryId),
    [library.verses, query, activeCategoryId],
  )

  const editingVerse =
    view.kind === 'edit' && view.verseId
      ? (library.verses.find((verse) => verse.id === view.verseId) ?? null)
      : null

  let title = t('appTitle')
  if (view.kind === 'categories') title = t('categoriesTitle')
  if (view.kind === 'edit') title = editingVerse ? t('editTitle') : t('newTitle')

  return (
    <div className="app">
      <header className="top">
        <div className="title-block">
          {view.kind === 'list' ? null : (
            <button type="button" className="back" onClick={() => setView({ kind: 'list' })}>
              {t('back')}
            </button>
          )}
          <h1 className="brand">{title}</h1>
          {view.kind === 'list' ? (
            <>
              <p className="credit">Designed by Freddy Jara-Almonte.</p>
              <p className="tagline">{t('tagline')}</p>
              <LanguagePicker />
            </>
          ) : null}
        </div>
        {view.kind === 'list' ? (
          <button
            type="button"
            className="button button-ghost"
            onClick={() => setView({ kind: 'categories' })}
          >
            {t('categories')}
          </button>
        ) : (
          <LanguagePicker />
        )}
      </header>

      {library.status === 'loading' ? (
        <p className="status" role="status">
          {t('opening')}
        </p>
      ) : null}

      {library.status === 'error' ? (
        <div className="status">
          <p>{t('openFailed')}</p>
          <button type="button" className="button" onClick={() => void library.reload()}>
            {t('tryAgain')}
          </button>
        </div>
      ) : null}

      {library.status === 'ready' && view.kind === 'list' ? (
        <>
          <main>
            <VerseList
              verses={visibleVerses}
              categories={library.categories}
              voiceNoteIds={library.voiceNoteIds}
              totalCount={library.verses.length}
              query={query}
              categoryId={activeCategoryId}
              onQueryChange={setQuery}
              onCategoryChange={setCategoryId}
              onOpenVerse={(verseId) => setView({ kind: 'edit', verseId })}
            />
          </main>
          <div className="dock">
            <button
              type="button"
              className="button button-block"
              onClick={() => setView({ kind: 'edit', verseId: null })}
            >
              {t('saveDock')}
            </button>
            <p className="privacy">{t('privacy')}</p>
          </div>
        </>
      ) : null}

      {library.status === 'ready' && view.kind === 'edit' ? (
        <main>
          {view.verseId && !editingVerse ? (
            <div className="status">
              <p>{t('verseGone')}</p>
              <button type="button" className="button" onClick={() => setView({ kind: 'list' })}>
                {t('backToVerses')}
              </button>
            </div>
          ) : (
            <VerseForm
              key={`${editingVerse?.id ?? 'new'}:${view.prefillReference ?? ''}`}
              verse={editingVerse}
              initialReference={editingVerse ? undefined : view.prefillReference}
              verses={library.verses}
              categories={library.categories}
              onSave={library.saveVerse}
              onDelete={library.deleteVerse}
              onCreateCategory={library.createCategory}
              onDone={() => setView({ kind: 'list' })}
              onOpenVerse={(verseId) => setView({ kind: 'edit', verseId })}
              onAddReference={(reference) =>
                setView({ kind: 'edit', verseId: null, prefillReference: reference })
              }
            />
          )}
        </main>
      ) : null}

      {library.status === 'ready' && view.kind === 'categories' ? (
        <main>
          <CategoryManager
            categories={library.categories}
            onCreate={library.createCategory}
            onRename={library.renameCategory}
            onDelete={library.deleteCategory}
          />
        </main>
      ) : null}
    </div>
  )
}
