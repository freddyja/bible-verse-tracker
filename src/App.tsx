import { useMemo, useState } from 'react'
import { CategoryManager } from './components/CategoryManager'
import { VerseForm } from './components/VerseForm'
import { VerseList } from './components/VerseList'
import { filterVerses } from './data/filter'
import { useLibrary } from './hooks/useLibrary'

type View =
  | { kind: 'list' }
  | { kind: 'edit'; verseId: string | null }
  | { kind: 'categories' }

export default function App() {
  const library = useLibrary()
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

  let title = 'Verse Tracker'
  if (view.kind === 'categories') title = 'Categories'
  if (view.kind === 'edit') title = editingVerse ? 'Edit verse' : 'Save a verse'

  return (
    <div className="app">
      <header className="top">
        <div className="title-block">
          {view.kind === 'list' ? null : (
            <button type="button" className="back" onClick={() => setView({ kind: 'list' })}>
              ← Verses
            </button>
          )}
          <h1 className="brand">{title}</h1>
          {view.kind === 'list' ? (
            <>
              <p className="credit">Designed by Freddy Jara-Almonte.</p>
              <p className="tagline">A private place for verses that stay with you.</p>
            </>
          ) : null}
        </div>
        {view.kind === 'list' ? (
          <button
            type="button"
            className="button button-ghost"
            onClick={() => setView({ kind: 'categories' })}
          >
            Categories
          </button>
        ) : null}
      </header>

      {library.status === 'loading' ? (
        <p className="status" role="status">
          Opening your verses…
        </p>
      ) : null}

      {library.status === 'error' ? (
        <div className="status">
          <p>Your verses could not be opened on this device.</p>
          <button type="button" className="button" onClick={() => void library.reload()}>
            Try again
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
              Save a verse
            </button>
            <p className="privacy">On this device only. Clearing this site’s data removes them.</p>
          </div>
        </>
      ) : null}

      {library.status === 'ready' && view.kind === 'edit' ? (
        <main>
          {view.verseId && !editingVerse ? (
            <div className="status">
              <p>That verse is no longer on this device.</p>
              <button type="button" className="button" onClick={() => setView({ kind: 'list' })}>
                Back to verses
              </button>
            </div>
          ) : (
            <VerseForm
              key={editingVerse?.id ?? 'new'}
              verse={editingVerse}
              categories={library.categories}
              onSave={library.saveVerse}
              onDelete={library.deleteVerse}
              onCreateCategory={library.createCategory}
              onDone={() => setView({ kind: 'list' })}
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
