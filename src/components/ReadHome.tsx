import { useEffect, useState } from 'react'
import { filterVerses } from '../data/filter'
import type { Verse } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import { searchScripture, type ScriptureHit } from '../scripture/api'
import { BOOKS, NEW_TESTAMENT_INDEX } from '../scripture/books'
import { formatPassage, matchBook, parseReference } from '../scripture/passages'

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
  const { language, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [loaded, setLoaded] = useState<{ key: string; hits: ScriptureHit[] } | null>(null)
  const trimmed = query.trim()
  const direct = trimmed ? parseReference(trimmed) : null
  const bookMatch = trimmed && !direct ? matchBook(trimmed) : null
  const saved = trimmed ? filterVerses(verses, trimmed, null).slice(0, 8) : []
  const searchKey = trimmed && !direct && bookMatch === null ? `${language}:${trimmed}` : ''
  const hits = loaded?.key === searchKey ? loaded.hits : []
  const searching = searchKey !== '' && loaded?.key !== searchKey

  useEffect(() => {
    if (!searchKey) return
    let cancelled = false
    const timer = window.setTimeout(() => {
      searchScripture(language, trimmed)
        .then((next) => {
          if (!cancelled) setLoaded({ key: searchKey, hits: next })
        })
        .catch(() => {
          if (!cancelled) setLoaded({ key: searchKey, hits: [] })
        })
    }, 180)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [searchKey, language, trimmed])

  const oldBooks = BOOKS.slice(0, NEW_TESTAMENT_INDEX)
  const newBooks = BOOKS.slice(NEW_TESTAMENT_INDEX)

  return (
    <div className="read-home">
      <label className="search">
        <span className="sr-only">{t('searchScripture')}</span>
        <input
          type="search"
          value={query}
          placeholder={t('searchScripturePlaceholder')}
          onChange={(event) => setQuery(event.target.value)}
          enterKeyHint="search"
        />
      </label>

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
          {searching ? <p className="field-note">{t('searchingScripture')}</p> : null}
          {!direct && bookMatch === null && !searching && hits.length === 0 ? (
            <p className="empty">{t('noScriptureMatches')}</p>
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
                      <span className="related-snippet">{hit.text}</span>
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
          <p className="scripture-note">{t('scriptureNote')}</p>
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
