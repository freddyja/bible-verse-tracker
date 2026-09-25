import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CategoryManager } from './components/CategoryManager'
import { ChapterPicker } from './components/ChapterPicker'
import { ChapterReader } from './components/ChapterReader'
import { DailyHome } from './components/DailyHome'
import { GrowHome, type GrowNested } from './components/GrowHome'
import { LanguagePicker } from './components/LanguagePicker'
import { PlanProgress } from './components/PlanProgress'
import { ReadHome } from './components/ReadHome'
import { ReadingOptions } from './components/ReadingOptions'
import { SettingsPanel } from './components/SettingsPanel'
import { TabBar, type TabId } from './components/TabBar'
import { VerseForm } from './components/VerseForm'
import { VerseList } from './components/VerseList'
import { RedLetterToggle } from './components/RedLetterToggle'
import { VersionPicker } from './components/VersionPicker'
import { filterVerses } from './data/filter'
import type { Passage } from './data/types'
import { useLibrary } from './hooks/useLibrary'
import { useReadingPlan } from './hooks/useReadingPlan'
import { useLanguage } from './i18n/useLanguage'
import { BOOKS } from './scripture/books'
import { dailyVerse } from './scripture/daily'
import { formatPlanSpan, type PlanDay } from './scripture/readingPlan'
import { type PassageRef } from './scripture/passages'
import { useListen } from './speech/useListen'

type ChapterView = {
  kind: 'chapter'
  bookIndex: number
  chapter: number
  verse: number | null
  startBook: number
  startChapter: number
  startVerse: number | null
}

type ReadPlace = { kind: 'home' } | { kind: 'book'; bookIndex: number } | ChapterView

type Panel = null | 'settings' | 'options' | 'plan'

type EditReturn = { kind: 'saved' } | { kind: 'daily' } | { kind: 'read' } | ChapterView

type View =
  | { kind: 'tabs' }
  | { kind: 'categories' }
  | {
      kind: 'edit'
      verseId: string | null
      prefillReference?: string
      prefillText?: string
      returnTo: EditReturn
    }

function BackIcon() {
  return (
    <svg className="back-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.5 6.5 9 12l5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg className="gear-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M19.4 13.1a7.7 7.7 0 0 0 .05-2.2l1.7-1.3-1.6-2.8-2 .8a7.6 7.6 0 0 0-1.9-1.1l-.3-2.1h-3.2l-.3 2.1a7.6 7.6 0 0 0-1.9 1.1l-2-.8-1.6 2.8 1.7 1.3a7.7 7.7 0 0 0 0 2.2l-1.7 1.3 1.6 2.8 2-.8c.6.45 1.2.82 1.9 1.1l.3 2.1h3.2l.3-2.1c.7-.28 1.3-.65 1.9-1.1l2 .8 1.6-2.8-1.7-1.3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function App() {
  const library = useLibrary()
  const reading = useReadingPlan()
  const { language, setVersion, versionId, t } = useLanguage()
  const [tab, setTab] = useState<TabId>('daily')
  const [topicsToken, setTopicsToken] = useState(0)
  const clearTopics = useCallback(() => setTopicsToken(0), [])
  const [growKey, setGrowKey] = useState(0)
  const [growPlace, setGrowPlace] = useState({ active: false, title: '' })
  const growBack = useRef<() => void>(() => {})
  const [panel, setPanel] = useState<Panel>(null)
  const [panelFrom, setPanelFrom] = useState<Panel>(null)
  const [read, setRead] = useState<ReadPlace>({ kind: 'home' })
  const [view, setView] = useState<View>({ kind: 'tabs' })
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

  const bookIndex = read.kind === 'book' || read.kind === 'chapter' ? read.bookIndex : null
  const bookName = bookIndex === null ? '' : BOOKS[bookIndex].names[language]

  let title = t('brandName')
  if (panel === 'settings') title = t('settingsTitle')
  else if (panel === 'options') title = t('readingOptions')
  else if (panel === 'plan') title = t('planProgressTitle')
  else if (view.kind === 'categories') title = t('categoriesTitle')
  else if (view.kind === 'edit') title = editingVerse ? t('editTitle') : t('newTitle')
  else if (tab === 'daily') title = t('navDaily')
  else if (tab === 'read' && read.kind === 'home') title = t('navRead')
  else if (tab === 'read' && read.kind === 'book') title = bookName
  else if (tab === 'read' && read.kind === 'chapter') title = `${bookName} ${read.chapter}`
  else if (tab === 'grow') title = growPlace.active && growPlace.title ? growPlace.title : t('navGrow')
  else if (tab === 'saved') title = t('navSaved')

  useEffect(() => {
    const dailyHub = view.kind === 'tabs' && panel === null && tab === 'daily'
    document.title = dailyHub ? t('brandName') : title
  }, [title, view.kind, panel, tab, t])

  function openAt(nextBook: number, chapter: number, verse: number | null): ChapterView {
    return {
      kind: 'chapter',
      bookIndex: nextBook,
      chapter,
      verse,
      startBook: nextBook,
      startChapter: chapter,
      startVerse: verse,
    }
  }

  function followSpoken(passage: PassageRef) {
    setTab('read')
    setPanel(null)
    setView({ kind: 'tabs' })
    setRead((current) => {
      if (current.kind === 'chapter') {
        if (current.bookIndex === passage.bookIndex && current.chapter === passage.chapter) return current
        return { ...current, bookIndex: passage.bookIndex, chapter: passage.chapter }
      }
      return openAt(passage.bookIndex, passage.chapter, passage.verse)
    })
  }

  const listen = useListen(language, versionId, followSpoken)

  function showTabs() {
    setPanel(null)
    setPanelFrom(null)
    setView({ kind: 'tabs' })
  }

  function openPanel(next: Panel, from: Panel = null) {
    listen.stop()
    setView({ kind: 'tabs' })
    setPanelFrom(from)
    setPanel(next)
  }

  function showReadingHome() {
    listen.stop()
    setPanel(null)
    setPanelFrom(null)
    setView({ kind: 'tabs' })
    setRead({ kind: 'home' })
    setTab('read')
  }

  function selectTab(next: TabId) {
    listen.stop()
    setPanel(null)
    setPanelFrom(null)
    setView({ kind: 'tabs' })
    if (next === 'read' && tab === 'read' && read.kind !== 'home') setRead({ kind: 'home' })
    if (next === 'grow' && tab === 'grow') setGrowKey((current) => current + 1)
    setTab(next)
  }

  function openPassage(passage: Passage) {
    listen.stop()
    setTab('read')
    setPanel(null)
    setView({ kind: 'tabs' })
    setRead(openAt(passage.bookIndex, passage.chapter, passage.verse))
  }

  function readPlanDay(day: PlanDay) {
    if (reading.plan) setVersion(reading.plan.versionId)
    listen.stop()
    setTab('read')
    setPanel(null)
    setPanelFrom(null)
    setView({ kind: 'tabs' })
    setRead(openAt(day.start.bookIndex, day.start.chapter, null))
  }

  const showTabBar = view.kind === 'tabs'
  const onDaily = view.kind === 'tabs' && panel === null && tab === 'daily'
  const onReadSurface = view.kind === 'tabs' && panel === null && tab === 'read'
  const onGrow = view.kind === 'tabs' && panel === null && tab === 'grow'
  const showGear = view.kind === 'tabs' && panel !== 'settings'
  const growNested = onGrow && growPlace.active
  const showBack = panel !== null || view.kind !== 'tabs' || (onReadSurface && read.kind !== 'home') || growNested

  const onGrowNested = useCallback((next: GrowNested) => {
    growBack.current = next.back
    setGrowPlace((current) =>
      current.active === next.active && current.title === next.title ? current : { active: next.active, title: next.title },
    )
  }, [])

  function goBack() {
    listen.stop()
    if (growNested) {
      growBack.current()
      return
    }
    if (panel === 'options' || panel === 'plan') {
      setPanel(panelFrom)
      setPanelFrom(null)
      return
    }
    if (panel) {
      setPanel(null)
      setPanelFrom(null)
      return
    }
    if (view.kind === 'categories' || view.kind === 'edit') {
      if (view.kind === 'edit' && view.returnTo.kind === 'chapter') {
        setTab('read')
        setRead(view.returnTo)
      } else if (view.kind === 'edit' && view.returnTo.kind === 'daily') setTab('daily')
      else if (view.kind === 'edit' && view.returnTo.kind === 'saved') setTab('saved')
      else if (view.kind === 'edit') setTab('read')
      setView({ kind: 'tabs' })
      return
    }
    if (tab === 'read' && read.kind === 'chapter') setRead({ kind: 'book', bookIndex: read.bookIndex })
    else if (tab === 'read' && read.kind === 'book') setRead({ kind: 'home' })
  }

  const today = reading.currentDay
  const planToday =
    onReadSurface && read.kind === 'home' && today
      ? { range: formatPlanSpan(language, today), onRead: () => readPlanDay(today) }
      : null

  return (
    <div className={showTabBar ? 'app app-tabs' : 'app'}>
      <header
        className={[
          'mast',
          onReadSurface && read.kind === 'chapter' ? 'mast-chapter' : '',
          showBack ? 'mast-nested' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="top">
          <div className="title-block">
            {showBack ? (
              <button type="button" className="back" onClick={goBack}>
                <BackIcon />
                {t('navBack')}
              </button>
            ) : null}
            {onReadSurface && (read.kind === 'book' || read.kind === 'chapter') ? (
              <h1 className="brand">
                <nav className="crumb" aria-label={t('readingCrumb')}>
                  <button type="button" onClick={goBack}>
                    {read.kind === 'chapter' ? bookName : t('navRead')}
                  </button>
                  <span className="crumb-sep" aria-hidden="true">
                    ›
                  </span>
                  <span aria-current="page">{read.kind === 'chapter' ? read.chapter : bookName}</span>
                </nav>
              </h1>
            ) : (
              <h1 className={panel === 'options' ? 'brand sr-only' : 'brand'}>{title}</h1>
            )}
            {onDaily ? (
              <>
                <p className="credit">{t('designedBy')}</p>
                <p className="tagline">{t('tagline')}</p>
                <LanguagePicker />
              </>
            ) : null}
          </div>
          <div className="top-actions">
            {view.kind === 'tabs' && panel === null && tab === 'saved' ? (
              <button
                type="button"
                className="button button-ghost"
                onClick={() => {
                  listen.stop()
                  setView({ kind: 'categories' })
                }}
              >
                {t('categories')}
              </button>
            ) : null}
            {showGear ? (
              <button
                type="button"
                className="icon-button"
                aria-label={t('openSettings')}
                onClick={() => openPanel('settings')}
              >
                <GearIcon />
              </button>
            ) : null}
          </div>
        </div>
        {onReadSurface ? <VersionPicker /> : null}
        {onReadSurface && read.kind === 'chapter' ? <RedLetterToggle /> : null}
      </header>

      {library.status === 'loading' && (tab === 'saved' || view.kind === 'edit' || view.kind === 'categories') && panel === null ? (
        <p className="status" role="status">
          {t('opening')}
        </p>
      ) : null}

      {library.status === 'error' && (tab === 'saved' || view.kind === 'edit' || view.kind === 'categories') && panel === null ? (
        <div className="status">
          <p>{t('openFailed')}</p>
          <button type="button" className="button" onClick={() => void library.reload()}>
            {t('tryAgain')}
          </button>
        </div>
      ) : null}

      {view.kind === 'tabs' && panel === 'settings' ? (
        <main>
          <SettingsPanel
            hasPlan={reading.plan !== null}
            onReadingOptions={() => openPanel('options', 'settings')}
            onPlan={() => openPanel('plan', 'settings')}
          />
        </main>
      ) : null}

      {view.kind === 'tabs' && panel === 'options' ? (
        <main>
          <ReadingOptions
            plan={reading.plan}
            onSave={(pace, nextVersion) => {
              reading.saveOptions(pace, nextVersion)
              setVersion(nextVersion)
              setPanel(null)
              setPanelFrom(null)
              setTab('daily')
            }}
          />
        </main>
      ) : null}

      {view.kind === 'tabs' && panel === 'plan' && reading.plan ? (
        <main>
          <PlanProgress
            plan={reading.plan}
            days={reading.days}
            completedCount={reading.completedCount}
            currentDay={reading.currentDay}
            onToggle={reading.toggleDay}
            onRead={readPlanDay}
          />
        </main>
      ) : null}

      {onGrow ? (
        <main>
          <GrowHome
            key={growKey}
            versionId={versionId}
            onNestedChange={onGrowNested}
            onOpenPassage={(nextBook, chapter, verse) => {
              listen.stop()
              setTab('read')
              setRead(openAt(nextBook, chapter, verse))
            }}
          />
        </main>
      ) : null}

      {onDaily ? (
        <main>
          <DailyHome
            verses={library.verses}
            onOpenPassage={(nextBook, chapter, verse) => {
              listen.stop()
              setTab('read')
              setRead(openAt(nextBook, chapter, verse))
            }}
            onOpenSaved={(verseId) => {
              listen.stop()
              setView({ kind: 'edit', verseId, returnTo: { kind: 'daily' } })
            }}
            onSaveVerse={library.saveVerse}
            onOpenRead={showReadingHome}
            onOpenTopics={() => {
              showReadingHome()
              setTopicsToken((current) => current + 1)
            }}
            onOpenPlan={() => openPanel(reading.plan ? 'plan' : 'options')}
            onOpenGrow={() => selectTab('grow')}
            onOpenSavedTab={() => selectTab('saved')}
            onOpenListen={() => {
              const passage = dailyVerse()
              listen.stop()
              setPanel(null)
              setPanelFrom(null)
              setView({ kind: 'tabs' })
              setTab('read')
              setRead(openAt(passage.bookIndex, passage.chapter, passage.verse))
            }}
          />
        </main>
      ) : null}

      {onReadSurface && read.kind === 'home' ? (
        <main>
          <ReadHome
            verses={library.verses}
            planToday={planToday}
            topicsToken={topicsToken}
            onTopicsReady={clearTopics}
            onOpenBook={(next) => setRead({ kind: 'book', bookIndex: next })}
            onOpenPassage={(nextBook, chapter, verse) => {
              listen.stop()
              setRead(openAt(nextBook, chapter, verse))
            }}
            onOpenSaved={(verseId) => {
              listen.stop()
              setView({ kind: 'edit', verseId, returnTo: { kind: 'read' } })
            }}
            onOpenCategories={() => {
              listen.stop()
              setView({ kind: 'categories' })
            }}
          />
        </main>
      ) : null}

      {onReadSurface && read.kind === 'book' ? (
        <main>
          <ChapterPicker
            bookIndex={read.bookIndex}
            onOpenBook={(next) => {
              listen.stop()
              setRead({ kind: 'book', bookIndex: next })
            }}
            onOpenChapter={(chapter) => {
              listen.stop()
              setRead(openAt(read.bookIndex, chapter, null))
            }}
          />
        </main>
      ) : null}

      {onReadSurface && read.kind === 'chapter' ? (
        <main>
          <ChapterReader
            key={`${versionId}:${read.startBook}:${read.startChapter}:${read.startVerse ?? 0}`}
            startBook={read.startBook}
            startChapter={read.startChapter}
            startVerse={read.startVerse}
            saved={library.verses}
            categories={library.categories}
            onOpenPassage={openPassage}
            onSaveVerse={library.saveVerse}
            onCreateCategory={library.createCategory}
            onShowChapters={() => {
              listen.stop()
              setRead({ kind: 'book', bookIndex: read.bookIndex })
            }}
            onJump={(nextBook, chapter) => {
              listen.stop()
              setRead(openAt(nextBook, chapter, null))
            }}
            onVisible={(nextBook, chapter) =>
              setRead((current) => {
                if (current.kind !== 'chapter') return current
                if (current.bookIndex === nextBook && current.chapter === chapter) return current
                return { ...current, bookIndex: nextBook, chapter }
              })
            }
            listen={listen}
          />
        </main>
      ) : null}

      {library.status === 'ready' && view.kind === 'tabs' && panel === null && tab === 'saved' ? (
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
              <button type="button" className="button" onClick={showTabs}>
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
              onDone={() => {
                if (view.returnTo.kind === 'chapter') {
                  setTab('read')
                  setRead(view.returnTo)
                } else if (view.returnTo.kind === 'daily') setTab('daily')
                else if (view.returnTo.kind === 'saved') setTab('saved')
                else setTab('read')
                setView({ kind: 'tabs' })
              }}
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

      {showTabBar ? <TabBar tab={tab} onSelect={selectTab} /> : null}
    </div>
  )
}
