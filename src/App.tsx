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
import { RedLetterToggle } from './components/RedLetterToggle'
import { VersionPicker } from './components/VersionPicker'

type ChapterView = {
  kind: 'chapter'
  bookIndex: number
  chapter: number
  verse: number | null
  startBook: number
  startChapter: number
  startVerse: number | null
}

type Shell =
  | { kind: 'read' }
  | { kind: 'book'; bookIndex: number }
  | ChapterView
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
  const { language, versionId, t } = useLanguage()
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

  function openAt(bookIndex: number, chapter: number, verse: number | null): ChapterView {
    return {
      kind: 'chapter',
      bookIndex,
      chapter,
      verse,
      startBook: bookIndex,
      startChapter: chapter,
      startVerse: verse,
    }
  }

  function followSpoken(passage: PassageRef) {
    setView((current) => {
      if (current.kind === 'chapter') {
        if (current.bookIndex === passage.bookIndex && current.chapter === passage.chapter) return current
        return { ...current, bookIndex: passage.bookIndex, chapter: passage.chapter }
      }
      return openAt(passage.bookIndex, passage.chapter, passage.verse)
    })
  }

  const listen = useListen(language, versionId, followSpoken)

  function goBack() {
    listen.stop()
    if (view.kind === 'book' || view.kind === 'saved') setView({ kind: 'read' })
    if (view.kind === 'chapter') setView({ kind: 'book', bookIndex: view.bookIndex })
    if (view.kind === 'categories') setView(view.returnTo === 'saved' ? { kind: 'saved' } : { kind: 'read' })
    if (view.kind === 'edit') setView(view.returnTo)
  }

  let backLabel = t('backHome')
  if (view.kind === 'chapter') backLabel = `← ${BOOKS[view.bookIndex].names[language]}`
  if (view.kind === 'categories' && view.returnTo === 'saved') backLabel = t('backSaved')
  if (view.kind === 'edit' && view.returnTo.kind === 'saved') backLabel = t('backSaved')
  if (view.kind === 'edit' && view.returnTo.kind === 'chapter') {
    backLabel = `← ${BOOKS[view.returnTo.bookIndex].names[language]} ${view.returnTo.chapter}`
  }

  function openPassage(passage: Passage) {
    listen.stop()
    setView(openAt(passage.bookIndex, passage.chapter, passage.verse))
  }

  return (
    <div className="app">
      <header className="mast">
        <div className="top">
          <div className="title-block">
            {view.kind === 'read' ? null : (
              <button type="button" className="back" onClick={goBack}>
                {backLabel}
              </button>
            )}
            <h1 className="brand">{title}</h1>
            {view.kind === 'read' ? (
              <>
                <p className="credit">{t('designedBy')}</p>
                <p className="tagline">{t('tagline')}</p>
              </>
            ) : null}
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
        </div>
        <VersionPicker hint={view.kind === 'read'} />
        {view.kind === 'read' ? (
          <>
            <LanguagePicker hint />
            <RedLetterToggle hint />
          </>
        ) : (
          <LanguagePicker />
        )}
        {view.kind === 'chapter' ? <RedLetterToggle /> : null}
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
            onOpenPassage={(nextBook, chapter, verse) => {
              listen.stop()
              setView(openAt(nextBook, chapter, verse))
            }}
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
            onOpenChapter={(chapter) => {
              listen.stop()
              setView(openAt(view.bookIndex, chapter, null))
            }}
          />
        </main>
      ) : null}

      {view.kind === 'chapter' ? (
        <main>
          <ChapterReader
            key={`${versionId}:${view.startBook}:${view.startChapter}:${view.startVerse ?? 0}`}
            startBook={view.startBook}
            startChapter={view.startChapter}
            startVerse={view.startVerse}
            saved={library.verses}
            onOpenPassage={openPassage}
            onShowChapters={() => {
              listen.stop()
              setView({ kind: 'book', bookIndex: view.bookIndex })
            }}
            onVisible={(bookIndex, chapter) =>
              setView((current) => {
                if (current.kind !== 'chapter') return current
                if (current.bookIndex === bookIndex && current.chapter === chapter) return current
                return { ...current, bookIndex, chapter }
              })
            }
            onSave={(passage, text) => {
              listen.stop()
              setView({
                kind: 'edit',
                verseId: null,
                prefillReference: formatPassage(language, passage),
                prefillText: text,
                returnTo: openAt(passage.bookIndex, passage.chapter, passage.verse),
              })
            }}
            onEditSaved={(verseId) => {
              listen.stop()
              setView({
                kind: 'edit',
                verseId,
                returnTo: openAt(view.bookIndex, view.chapter, null),
              })
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
