import { useEffect, useId, useRef, useState } from 'react'
import { filterVerses } from '../data/filter'
import type { Verse } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import { FRUITS, fruitLabel } from '../grow/fruit'
import { searchScripture, searchTopics, type ScriptureHit, type TopicGroup } from '../scripture/api'
import { BOOKS, NEW_TESTAMENT_INDEX, type Book, type Testament } from '../scripture/books'
import { CANON_SECTIONS, type SectionIcon } from '../scripture/sections'
import { formatPassage, formatPassageRange, matchBook, parseReference } from '../scripture/passages'
import { titleCaseTopic } from '../scripture/topics'
import { ScriptureText } from './ScriptureText'

type SearchMode = 'word' | 'topics'

const SEARCH_MODE_KEY = 'bible-verse-tracker.search-mode'
const CANON_PHOTO: Record<Testament, string> = {
  ot: 'canyon.jpg',
  nt: 'forest.jpg',
}

function readSearchMode(): SearchMode {
  try {
    return localStorage.getItem(SEARCH_MODE_KEY) === 'word' ? 'word' : 'topics'
  } catch {
    return 'topics'
  }
}

function storeSearchMode(mode: SearchMode) {
  try {
    localStorage.setItem(SEARCH_MODE_KEY, mode)
  } catch {
    // The search still works for this visit when storage is blocked.
  }
}

type ReadHomeProps = {
  verses: readonly Verse[]
  planToday: { range: string; onRead: () => void } | null
  topicsToken: number
  onTopicsReady: () => void
  onOpenBook: (bookIndex: number) => void
  onOpenPassage: (bookIndex: number, chapter: number, verse: number) => void
  onOpenSaved: (verseId: string) => void
  onOpenCategories: () => void
}

export function ReadHome({
  verses,
  planToday,
  topicsToken,
  onTopicsReady,
  onOpenBook,
  onOpenPassage,
  onOpenSaved,
  onOpenCategories,
}: ReadHomeProps) {
  const { language, versionId, versionName, t } = useLanguage()
  const modeLabelId = useId()
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [testament, setTestament] = useState<Testament>('nt')
  const [mode, setMode] = useState<SearchMode>(readSearchMode)
  const [appliedToken, setAppliedToken] = useState(0)
  if (topicsToken !== appliedToken) {
    setAppliedToken(topicsToken)
    if (topicsToken !== 0) setMode('topics')
  }
  const [loaded, setLoaded] = useState<{ key: string; hits: ScriptureHit[]; groups: TopicGroup[] } | null>(null)
  const trimmed = query.trim()
  const direct = trimmed ? parseReference(trimmed) : null
  const bookMatch = trimmed && !direct ? matchBook(trimmed) : null
  const saved = trimmed ? filterVerses(verses, trimmed, null).slice(0, 8) : []
  const searchKey = trimmed && !direct && bookMatch === null ? `${mode}:${versionId}:${language}:${trimmed}` : ''
  const payload = loaded?.key === searchKey ? loaded : null
  const hits = payload?.hits ?? []
  const groups = payload?.groups ?? []
  const searching = searchKey !== '' && payload === null

  useEffect(() => {
    if (!searchKey) return
    let cancelled = false
    const timer = window.setTimeout(() => {
      const run =
        mode === 'topics'
          ? searchTopics(versionId, trimmed, language).then((next) => ({ hits: [] as ScriptureHit[], groups: next }))
          : searchScripture(versionId, trimmed).then((next) => ({ hits: next, groups: [] as TopicGroup[] }))
      run
        .then((next) => {
          if (!cancelled) setLoaded({ key: searchKey, hits: next.hits, groups: next.groups })
        })
        .catch(() => {
          if (!cancelled) setLoaded({ key: searchKey, hits: [], groups: [] })
        })
    }, 180)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [searchKey, versionId, language, trimmed, mode])

  useEffect(() => {
    if (topicsToken === 0) return
    storeSearchMode('topics')
    searchRef.current?.focus()
    onTopicsReady()
  }, [topicsToken, onTopicsReady])

  function chooseMode(next: SearchMode) {
    setMode(next)
    storeSearchMode(next)
  }

  const sections = CANON_SECTIONS.filter((section) => section.testament === testament)
  const bookTotal = testament === 'nt' ? BOOKS.length - NEW_TESTAMENT_INDEX : NEW_TESTAMENT_INDEX
  const heroPhoto = `${import.meta.env.BASE_URL}votd/${CANON_PHOTO[testament]}`

  return (
    <div className="read-home">
      {trimmed || !planToday ? null : (
        <section className="gold-card plan-banner">
          <p className="votd-kicker">{t('planToday')}</p>
          <p className="plan-range">{planToday.range}</p>
          <button type="button" className="button" onClick={planToday.onRead}>
            {t('planRead')}
          </button>
        </section>
      )}
      <div className="canon-toolbar">
        <div className="testament-switch" role="tablist" aria-label={t('testamentSwitch')}>
          <button type="button" role="tab" aria-selected={testament === 'ot'} onClick={() => setTestament('ot')}>
            {t('oldShort')}
          </button>
          <button type="button" role="tab" aria-selected={testament === 'nt'} onClick={() => setTestament('nt')}>
            {t('newShort')}
          </button>
        </div>
        <label className="search">
          <span className="sr-only">{t('searchScripture')}</span>
          <input
            ref={searchRef}
            type="search"
            value={query}
            placeholder={mode === 'topics' ? t('searchTopicsPlaceholder') : t('searchScripturePlaceholder')}
            onChange={(event) => setQuery(event.target.value)}
            enterKeyHint="search"
          />
        </label>
      </div>
      <div className="search-mode" role="group" aria-labelledby={modeLabelId}>
        <span id={modeLabelId} className="sr-only">
          {t('searchModeLabel')}
        </span>
        <div className="lang-options">
          <button
            type="button"
            className="lang-option"
            aria-pressed={mode === 'word'}
            onClick={() => chooseMode('word')}
          >
            {t('searchModeWord')}
          </button>
          <button
            type="button"
            className="lang-option"
            aria-pressed={mode === 'topics'}
            onClick={() => chooseMode('topics')}
          >
            {t('searchModeTopics')}
          </button>
        </div>
      </div>
      <p className="field-note">{mode === 'topics' ? t('searchModeTopicsHint') : t('searchModeWordHint')}</p>

      {mode === 'topics' && !trimmed ? (
        <section className="fruit-themes" aria-labelledby="fruit-themes-title">
          <h2 id="fruit-themes-title" className="grow-kicker fruit-kicker">
            {t('growFruit')}
          </h2>
          <p className="field-note">{t('fruitThemesLead')}</p>
          <ul className="fruit-chips">
            {FRUITS.map((fruit) => (
              <li key={fruit.id}>
                <button type="button" className="fruit-chip" onClick={() => setQuery(fruitLabel(language, fruit))}>
                  {fruitLabel(language, fruit)}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {trimmed ? (
        <div className="search-results">
          {direct ? (
            <button
              type="button"
              className="result-open"
              onClick={() => onOpenPassage(direct.bookIndex, direct.chapter, direct.verse)}
            >
              <span className="related-ref">{formatPassage(language, direct)}</span>
              <span className="field-note">{t('openPassage')}</span>
            </button>
          ) : null}
          {bookMatch !== null ? (
            <button type="button" className="result-open" onClick={() => onOpenBook(bookMatch)}>
              <span className="related-ref">{BOOKS[bookMatch].names[language]}</span>
              <span className="field-note">{t('chapters')}</span>
            </button>
          ) : null}
          {searching ? (
            <p className="field-note">{mode === 'topics' ? t('searchingTopics') : t('searchingScripture')}</p>
          ) : null}
          {mode === 'word' && !direct && bookMatch === null && !searching && hits.length === 0 ? (
            <>
              <p className="empty">{t('noScriptureMatches')}</p>
              <p className="field-note">{t('noWordTryTopics')}</p>
            </>
          ) : null}
          {mode === 'topics' && !direct && bookMatch === null && !searching && groups.length === 0 ? (
            <>
              <p className="empty">{t('noTopicMatches')}</p>
              <p className="field-note">{t('noTopicTryWord')}</p>
            </>
          ) : null}
          {groups.length > 0 ? (
            <>
              {groups.map((group, index) => (
                <section key={group.fruit ? `fruit-${group.name}` : group.name}>
                  {group.fruit && !groups[index - 1]?.fruit ? (
                    <p className="grow-kicker fruit-kicker">{t('growFruit')}</p>
                  ) : null}
                  <h2 className="related-heading">{group.fruit ? group.name : titleCaseTopic(group.name)}</h2>
                  <ul className="related-list">
                    {group.hits.map((hit) => (
                      <li key={`${group.name}-${hit.bookIndex}-${hit.chapter}-${hit.verse}`}>
                        <button
                          type="button"
                          className="related-open"
                          onClick={() => onOpenPassage(hit.bookIndex, hit.chapter, hit.verse)}
                        >
                          <span className="related-ref">{formatPassageRange(language, hit)}</span>
                          <ScriptureText
                            bookIndex={hit.bookIndex}
                            chapter={hit.chapter}
                            verse={hit.verse}
                            text={hit.text}
                            className="related-snippet"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              {groups.some((group) => !group.fruit) ? <p className="field-note">{t('topicsSource')}</p> : null}
            </>
          ) : null}
          {hits.length > 0 ? (
            <section>
              <h2 className="related-heading">{t('scriptureMatches')}</h2>
              <ul className="related-list">
                {hits.map((hit) => (
                  <li key={`${hit.bookIndex}-${hit.chapter}-${hit.verse}`}>
                    <button
                      type="button"
                      className="related-open"
                      onClick={() => onOpenPassage(hit.bookIndex, hit.chapter, hit.verse)}
                    >
                      <span className="related-ref">{formatPassage(language, hit)}</span>
                      <ScriptureText
                        bookIndex={hit.bookIndex}
                        chapter={hit.chapter}
                        verse={hit.verse}
                        text={hit.text}
                        className="related-snippet"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {saved.length > 0 ? (
            <section>
              <h2 className="related-heading">{t('savedMatches')}</h2>
              <ul className="related-list">
                {saved.map((verse) => (
                  <li key={verse.id}>
                    <button type="button" className="related-open" onClick={() => onOpenSaved(verse.id)}>
                      <span className="related-ref">{verse.reference}</span>
                      <span className="related-snippet">{verse.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : (
        <>
          <header className="canon-hero" style={{ backgroundImage: `url("${heroPhoto}")` }}>
            <h2 className="canon-title">{testament === 'nt' ? t('newTestament') : t('oldTestament')}</h2>
            <p className="canon-count">
              <BooksMark />
              <span>{t('bookCount', { count: bookTotal })}</span>
            </p>
          </header>
          {sections.map((section) => (
            <BookGroup
              key={section.id}
              title={t(section.label)}
              icon={section.icon}
              books={BOOKS.slice(section.start, section.end)}
              offset={section.start}
              language={language}
              onOpen={onOpenBook}
            />
          ))}
          <p className="scripture-note">{t('scriptureNote', { version: versionName })}</p>
          <button type="button" className="text-button" onClick={onOpenCategories}>
            {t('categories')}
          </button>
        </>
      )}
    </div>
  )
}

function BooksMark() {
  return (
    <svg className="canon-count-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5.2h6c1 0 2 .5 2.5 1.3.5-.8 1.5-1.3 2.5-1.3H19V18h-3.2c-.9 0-1.8.3-2.3.9-.5-.6-1.4-.9-2.3-.9H5V5.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SectionMark({ icon }: { icon: SectionIcon }) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  return (
    <svg className="canon-section-icon" viewBox="0 0 24 24" aria-hidden="true">
      {icon === 'law' ? <path d="M6.5 4.8h4.4v14.4H6.5zM13.1 4.8h4.4v14.4h-4.4z" {...stroke} /> : null}
      {icon === 'history' ? (
        <>
          <circle cx="12" cy="6.2" r="2" {...stroke} />
          <path d="M8.2 19.8 10.4 13.2 8.2 11.6l2.6-3.2h2.6l2.4 3.4 2.4.8-1.4 2.4" {...stroke} />
        </>
      ) : null}
      {icon === 'wisdom' ? <path d="M7 16.5c1.2-4 3-6.2 5-8.5 2 2.3 3.8 4.5 5 8.5M8.2 16.5h7.6" {...stroke} /> : null}
      {icon === 'prophets' ? <path d="M12 4.5 14.2 10H20l-4.6 3.4L17.2 19 12 15.8 6.8 19l1.8-5.6L4 10h5.8z" {...stroke} /> : null}
      {icon === 'gospels' ? <path d="M6 6.5h8.2A2.8 2.8 0 0 1 17 9.3V19H8.2A2.2 2.2 0 0 0 6 21.2V6.5z" {...stroke} /> : null}
      {icon === 'letters' ? <path d="M4.8 7.2h14.4v10.2H4.8zM4.8 7.2 12 12.6l7.2-5.4" {...stroke} /> : null}
      {icon === 'revelation' ? <path d="M12 4.2 13.6 9H18.6L14.6 12l1.4 4.6L12 13.8 8 16.6 9.4 12 5.4 9h5z" {...stroke} /> : null}
    </svg>
  )
}

function BookGroup({
  title,
  icon,
  books,
  offset,
  language,
  onOpen,
}: {
  title: string
  icon: SectionIcon
  books: readonly Book[]
  offset: number
  language: 'en' | 'es' | 'pt'
  onOpen: (bookIndex: number) => void
}) {
  return (
    <section className="book-group">
      <h2 className="canon-section">
        <SectionMark icon={icon} />
        <span>{title}</span>
      </h2>
      <div className="book-grid">
        {books.map((book, index) => (
          <button key={book.id} type="button" className="book-link" onClick={() => onOpen(offset + index)}>
            <span className="book-abbr">{book.id.toUpperCase()}</span>
            <span className="book-name">{book.names[language]}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
