import { useEffect, useMemo, useState } from 'react'
import { CategoryManager } from './components/CategoryManager'
import { ChapterPicker } from './components/ChapterPicker'
import { ChapterReader } from './components/ChapterReader'
import { LanguagePicker } from './components/LanguagePicker'
import { ReadHome } from './components/ReadHome'
import { VerseForm } from './components/VerseForm'
import { VerseList } from './components/VerseList'
import { filterVerses } from './data/filter'
import type { Passage } from './data/types'
import { useLibrary } from './hooks/useLibrary'
import { useLanguage } from './i18n/useLanguage'
import { BOOKS } from './scripture/books'
import { formatPassage, type PassageRef } from './scripture/passages'
import { useListen } from './speech/useListen'

type Shell =
  | { kind: 'read' }
  | { kind: 'book'; bookIndex: number }
  | { kind: 'chapter'; bookIndex: number; chapter: number; verse: number | null }
  | { kind: 'saved' }
  | { kind: 'categories'; returnTo: 'read' | 'saved' }

type View =
  | Shell
  | {
      kind: 'edit'
      verseId: string | null
      prefillReference?: string
      prefillText?: string
      returnTo: Shell
    }

export default function App() {
  const library = useLibrary()
  const { language, t } = useLanguage()
  const [view, setView] = useState<View>({ kind: 'read' })
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

  const bookIndex = view.kind === 'book' || view.kind === 'chapter' ? view.bookIndex : null
  const bookName = bookIndex === null ? '' : BOOKS[bookIndex].names[language]

  let title = t('appTitle')
  if (view.kind === 'book') title = bookName
  if (view.kind === 'chapter') title = `${bookName} ${view.chapter}`
  if (view.kind === 'saved') title = t('saved')
  if (view.kind === 'categories') title = t('categoriesTitle')
  if (view.kind === 'edit') title = editingVerse ? t('editTitle') : t('newTitle')

  useEffect(() => {
    document.title = title
  }, [title])

  function followSpoken(passage: PassageRef) {
    setView((current) => {
      if (
        current.kind === 'chapter' &&
        current.bookIndex === passage.bookIndex &&
        current.chapter === passage.chapter
      ) {
        return current
      }
      return {
        kind: 'chapter',
        bookIndex: passage.bookIndex,
        chapter: passage.chapter,
        verse: null,
      }
    })
  }

  const listen = useListen(language, followSpoken)

  function goBack() {
    listen.stop()
    if (view.kind === 'book' || view.kind === 'saved') setView({ kind: 'read' })
    if (view.kind === 'chapter') setView({ kind: 'book', bookIndex: view.bookIndex })
    if (view.kind === 'categories') setView(view.returnTo === 'saved' ? { kind: 'saved' } : { kind: 'read' })
    if (view.kind === 'edit') setView(view.returnTo)
  }

  let backLabel = t('backHome')
  if (view.kind === 'categories' && view.returnTo === 'saved') backLabel = t('backSaved')
  if (view.kind === 'edit' && view.returnTo.kind === 'saved') backLabel = t('backSaved')
  if (view.kind === 'edit' && view.returnTo.kind === 'chapter') {
    backLabel = `← ${BOOKS[view.returnTo.bookIndex].names[language]} ${view.returnTo.chapter}`
  }

  function openPassage(passage: Passage) {
    setView({
      kind: 'chapter',
      bookIndex: passage.bookIndex,
      chapter: passage.chapter,
      verse: passage.verse,
    })
  }

  return (
    <div className="app">
      <header className="top">
        <div className="title-block">
          {view.kind === 'read' ? null : (
            <button type="button" className="back" onClick={goBack}>
              {backLabel}
            </button>
          )}
          <h1 className="brand">{title}</h1>
          {view.kind === 'read' ? (
            <>
              <p className="credit">Designed by Freddy Jara-Almonte.</p>
              <p className="tagline">{t('tagline')}</p>
              <LanguagePicker />
            </>
          ) : (
            <LanguagePicker />
          )}
        </div>
        {view.kind === 'read' ? (
          <button
            type="button"
            className="button button-ghost"
            onClick={() => {
              listen.stop()
              setView({ kind: 'saved' })
            }}
          >
            {t('saved')}
          </button>
        ) : null}
        {view.kind === 'saved' ? (
          <button
            type="button"
            className="button button-ghost"
            onClick={() => {
              listen.stop()
              setView({ kind: 'categories', returnTo: 'saved' })
            }}
          >
            {t('categories')}
          </button>
        ) : null}
      </header>

      {library.status === 'loading' && (view.kind === 'saved' || view.kind === 'edit' || view.kind === 'categories') ? (
        <p className="status" role="status">
          {t('opening')}
        </p>
      ) : null}

      {library.status === 'error' && (view.kind === 'saved' || view.kind === 'edit' || view.kind === 'categories') ? (
        <div className="status">
          <p>{t('openFailed')}</p>
          <button type="button" className="button" onClick={() => void library.reload()}>
            {t('tryAgain')}
          </button>
        </div>
      ) : null}

      {view.kind === 'read' ? (
        <main>
          <ReadHome
            verses={library.verses}
            onOpenBook={(next) => setView({ kind: 'book', bookIndex: next })}
            onOpenPassage={(nextBook, chapter, verse) =>
              setView({ kind: 'chapter', bookIndex: nextBook, chapter, verse })
            }
            onOpenSaved={(verseId) => {
              listen.stop()
              setView({ kind: 'edit', verseId, returnTo: { kind: 'read' } })
            }}
            onOpenCategories={() => {
              listen.stop()
              setView({ kind: 'categories', returnTo: 'read' })
            }}
          />
        </main>
      ) : null}

      {view.kind === 'book' ? (
        <main>
          <ChapterPicker
            bookIndex={view.bookIndex}
            onOpenChapter={(chapter) =>
              setView({ kind: 'chapter', bookIndex: view.bookIndex, chapter, verse: null })
            }
          />
        </main>
      ) : null}

      {view.kind === 'chapter' ? (
        <main>
          <ChapterReader
            key={`${language}:${view.bookIndex}:${view.chapter}`}
            bookIndex={view.bookIndex}
            chapter={view.chapter}
            selectedVerse={view.verse}
            saved={library.verses}
            onSelectVerse={(verse) => setView({ ...view, verse })}
            onOpenPassage={(passage) => {
              listen.stop()
              openPassage(passage)
            }}
            onChapter={(chapter) => {
              listen.stop()
              setView({ kind: 'chapter', bookIndex: view.bookIndex, chapter, verse: null })
            }}
            onSave={(passage, text) => {
              listen.stop()
              setView({
                kind: 'edit',
                verseId: null,
                prefillReference: formatPassage(language, passage),
                prefillText: text,
                returnTo: view,
              })
            }}
            onEditSaved={(verseId) => {
              listen.stop()
              setView({ kind: 'edit', verseId, returnTo: view })
            }}
            listen={listen}
          />
        </main>
      ) : null}

      {library.status === 'ready' && view.kind === 'saved' ? (
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
              onOpenVerse={(verseId) => {
                listen.stop()
                setView({ kind: 'edit', verseId, returnTo: { kind: 'saved' } })
              }}
            />
          </main>
          <div className="dock">
            <button
              type="button"
              className="button button-block"
              onClick={() => {
                listen.stop()
                setView({ kind: 'edit', verseId: null, returnTo: { kind: 'saved' } })
              }}
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
              <button type="button" className="button" onClick={() => setView(view.returnTo)}>
                {t('backToVerses')}
              </button>
            </div>
          ) : (
            <VerseForm
              key={`${editingVerse?.id ?? 'new'}:${view.prefillReference ?? ''}:${view.prefillText ?? ''}`}
              verse={editingVerse}
              initialReference={editingVerse ? undefined : view.prefillReference}
              initialText={editingVerse ? undefined : view.prefillText}
              verses={library.verses}
              categories={library.categories}
              onSave={library.saveVerse}
              onDelete={library.deleteVerse}
              onCreateCategory={library.createCategory}
              onDone={() => setView(view.returnTo)}
              onOpenVerse={(verseId) => setView({ kind: 'edit', verseId, returnTo: view.returnTo })}
              onAddReference={(reference, text) =>
                setView({
                  kind: 'edit',
                  verseId: null,
                  prefillReference: reference,
                  prefillText: text,
                  returnTo: view.returnTo,
                })
              }
              onReadPassage={(passage) => {
                listen.stop()
                openPassage(passage)
              }}
              listen={listen}
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
