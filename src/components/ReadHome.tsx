import { useEffect, useId, useState } from 'react'
import { filterVerses } from '../data/filter'
import type { Verse } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import { searchScripture, searchTopics, type ScriptureHit, type TopicGroup } from '../scripture/api'
import { BOOKS, NEW_TESTAMENT_INDEX } from '../scripture/books'
import { formatPassage, formatPassageRange, matchBook, parseReference } from '../scripture/passages'
import { titleCaseTopic } from '../scripture/topics'
import { ScriptureText } from './ScriptureText'
import { VerseOfTheDay } from './VerseOfTheDay'

type SearchMode = 'word' | 'topics'

const SEARCH_MODE_KEY = 'bible-verse-tracker.search-mode'

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
  onOpenBook: (bookIndex: number) => void
  onOpenPassage: (bookIndex: number, chapter: number, verse: number) => void
  onOpenSaved: (verseId: string) => void
  onOpenCategories: () => void
}

export function ReadHome({
  verses,
  onOpenBook,
  onOpenPassage,
  onOpenSaved,
  onOpenCategories,
}: ReadHomeProps) {
  const { language, versionId, versionName, t } = useLanguage()
  const modeLabelId = useId()
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<SearchMode>(readSearchMode)
  const [loaded, setLoaded] = useState<{ key: string; hits: ScriptureHit[]; groups: TopicGroup[] } | null>(null)
  const trimmed = query.trim()
  const direct = trimmed ? parseReference(trimmed) : null
  const bookMatch = trimmed && !direct ? matchBook(trimmed) : null
  const saved = trimmed ? filterVerses(verses, trimmed, null).slice(0, 8) : []
  const searchKey = trimmed && !direct && bookMatch === null ? `${mode}:${versionId}:${trimmed}` : ''
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
          ? searchTopics(versionId, trimmed).then((next) => ({ hits: [] as ScriptureHit[], groups: next }))
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
  }, [searchKey, versionId, trimmed, mode])

  function chooseMode(next: SearchMode) {
    setMode(next)
    storeSearchMode(next)
  }

  const oldBooks = BOOKS.slice(0, NEW_TESTAMENT_INDEX)
  const newBooks = BOOKS.slice(NEW_TESTAMENT_INDEX)

  return (
    <div className="read-home">
      {trimmed ? null : <VerseOfTheDay onOpen={onOpenPassage} />}
      <label className="search">
        <span className="sr-only">{t('searchScripture')}</span>
        <input
          type="search"
          value={query}
          placeholder={mode === 'topics' ? t('searchTopicsPlaceholder') : t('searchScripturePlaceholder')}
          onChange={(event) => setQuery(event.target.value)}
          enterKeyHint="search"
        />
      </label>
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
              {groups.map((group) => (
                <section key={group.name}>
                  <h2 className="related-heading">{titleCaseTopic(group.name)}</h2>
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
              <p className="field-note">{t('topicsSource')}</p>
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
          <BookGroup title={t('oldTestament')} books={oldBooks} offset={0} language={language} onOpen={onOpenBook} />
          <BookGroup
            title={t('newTestament')}
            books={newBooks}
            offset={NEW_TESTAMENT_INDEX}
            language={language}
            onOpen={onOpenBook}
          />
          <p className="scripture-note">{t('scriptureNote', { version: versionName })}</p>
          <button type="button" className="text-button" onClick={onOpenCategories}>
            {t('categories')}
          </button>
        </>
      )}
    </div>
  )
}

function BookGroup({
  title,
  books,
  offset,
  language,
  onOpen,
}: {
  title: string
  books: readonly { names: Record<'en' | 'es' | 'pt', string> }[]
  offset: number
  language: 'en' | 'es' | 'pt'
  onOpen: (bookIndex: number) => void
}) {
  return (
    <section className="book-group">
      <h2>{title}</h2>
      <div className="book-grid">
        {books.map((book, index) => (
          <button key={book.names.en} type="button" className="book-link" onClick={() => onOpen(offset + index)}>
            {book.names[language]}
          </button>
        ))}
      </div>
    </section>
  )
}
