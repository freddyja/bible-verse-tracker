import { useEffect, useState } from 'react'
import type { Verse } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import { loadBook, relatedPassages, type ScriptureHit } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import { formatPassage, parseReference, samePassage, type PassageRef } from '../scripture/passages'

type ChapterReaderProps = {
  bookIndex: number
  chapter: number
  selectedVerse: number | null
  saved: readonly Verse[]
  onSelectVerse: (verse: number | null) => void
  onOpenPassage: (passage: PassageRef) => void
  onSave: (passage: PassageRef, text: string) => void
  onEditSaved: (verseId: string) => void
  onChapter: (chapter: number) => void
}

function savedMatch(verses: readonly Verse[], passage: PassageRef): Verse | undefined {
  return verses.find((verse) => {
    if (
      verse.passage &&
      verse.passage.bookIndex === passage.bookIndex &&
      verse.passage.chapter === passage.chapter &&
      verse.passage.verse === passage.verse
    ) {
      return true
    }
    const parsed = parseReference(verse.reference)
    return parsed ? samePassage(parsed, passage) : false
  })
}

export function ChapterReader({
  bookIndex,
  chapter,
  selectedVerse,
  saved,
  onSelectVerse,
  onOpenPassage,
  onSave,
  onEditSaved,
  onChapter,
}: ChapterReaderProps) {
  const { language, t } = useLanguage()
  const [verses, setVerses] = useState<string[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [related, setRelated] = useState<{ verse: number; rows: ScriptureHit[] } | null>(null)
  const book = BOOKS[bookIndex]
  const passage =
    selectedVerse === null ? null : { bookIndex, chapter, verse: selectedVerse }

  useEffect(() => {
    let cancelled = false
    loadBook(language, bookIndex)
      .then((chapters) => {
        if (!cancelled) setVerses(chapters[chapter - 1] ?? [])
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [language, bookIndex, chapter])

  useEffect(() => {
    if (selectedVerse === null) return
    const verse = selectedVerse
    let cancelled = false
    relatedPassages(language, { bookIndex, chapter, verse })
      .then((rows) => {
        if (!cancelled) setRelated({ verse, rows })
      })
      .catch(() => {
        if (!cancelled) setRelated({ verse, rows: [] })
      })
    return () => {
      cancelled = true
    }
  }, [language, bookIndex, chapter, selectedVerse])

  useEffect(() => {
    if (!selectedVerse || !verses) return
    document.getElementById(`verse-${selectedVerse}`)?.scrollIntoView({ block: 'center' })
  }, [selectedVerse, bookIndex, chapter, language, verses])

  const relatedRows = related && related.verse === selectedVerse ? related.rows : null
  const previous = chapter > 1 ? chapter - 1 : null
  const next = chapter < book.chapters ? chapter + 1 : null
  const kept = passage ? savedMatch(saved, passage) : undefined

  return (
    <article className="reader">
      <p className="tap-hint">{t('tapHint')}</p>
      {failed ? <p className="empty">{t('chapterFailed')}</p> : null}
      {verses === null && !failed ? <p className="status">{t('openingChapter')}</p> : null}
      {verses ? (
        <div className="scripture">
          {verses.map((text, index) => {
            const number = index + 1
            const current = { bookIndex, chapter, verse: number }
            const selected = selectedVerse === number
            const already = savedMatch(saved, current)
            return (
              <div key={number} id={`verse-${number}`} className={selected ? 'verse-block selected' : 'verse-block'}>
                <button
                  type="button"
                  className="verse-line"
                  aria-expanded={selected}
                  onClick={() => onSelectVerse(selected ? null : number)}
                >
                  <sup>{number}</sup>
                  <span>{text}</span>
                  {already ? <span className="saved-mark">{t('savedBadge')}</span> : null}
                </button>
                {selected ? (
                  <section className="study-panel" aria-label={t('relatedVerses')}>
                    <h2>{t('relatedVerses')}</h2>
                    {relatedRows === null ? <p className="field-note">{t('relatedLoading')}</p> : null}
                    {relatedRows && relatedRows.length === 0 ? (
                      <p className="field-note">{t('relatedScriptureEmpty')}</p>
                    ) : null}
                    {relatedRows && relatedRows.length > 0 ? (
                      <ul className="related-list">
                        {relatedRows.map((row) => (
                          <li key={formatPassage(language, row)}>
                            <button type="button" className="related-open" onClick={() => onOpenPassage(row)}>
                              <span className="related-ref">{formatPassage(language, row)}</span>
                              <span className="related-snippet scripture-snippet">{row.text}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {kept ? (
                      <div className="kept">
                        <p className="related-ref">{t('yourNote')}</p>
                        {kept.note ? <p className="note">{kept.note}</p> : <p className="field-note">{t('savedBadge')}</p>}
                        <button type="button" className="button button-ghost" onClick={() => onEditSaved(kept.id)}>
                          {t('editNote')}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="button button-block"
                        onClick={() => onSave(current, text)}
                      >
                        {t('saveThisVerse')}
                      </button>
                    )}
                  </section>
                ) : null}
              </div>
            )
          })}
        </div>
      ) : null}
      <div className="chapter-nav">
        {previous ? (
          <button type="button" className="button button-ghost" onClick={() => onChapter(previous)}>
            {t('prevChapter')}
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button type="button" className="button button-ghost" onClick={() => onChapter(next)}>
            {t('nextChapter')}
          </button>
        ) : null}
      </div>
      </article>
  )
}
