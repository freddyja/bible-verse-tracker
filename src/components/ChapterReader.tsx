import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { verseForPassage } from '../data/matchVerse'
import type { Category, Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import { ListenBar } from './ListenBar'
import { LexiconBody } from './LexiconPanel'
import { MeaningBody } from './MeaningNote'
import { ScriptureText } from './ScriptureText'
import { ShelfSave } from './ShelfSave'
import { BookArt } from './BookArt'
import type { ListenController } from '../speech/useListen'
import { loadBook, parallelPassages, relatedPassages, type ParallelHit, type ScriptureHit } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import { chapterStep } from '../scripture/canon'
import { formatPassage, formatPassageRange, samePassage, type PassageRef } from '../scripture/passages'

type Slice = {
  bookIndex: number
  chapter: number
  verses: string[]
}

const WINDOW = 18

type ChapterReaderProps = {
  startBook: number
  startChapter: number
  startVerse: number | null
  saved: readonly Verse[]
  categories: Category[]
  onOpenPassage: (passage: PassageRef) => void
  onSaveVerse: (draft: VerseDraft, id: string | undefined, voice: VoiceNoteUpdate) => Promise<void>
  onCreateCategory: (name: string) => Promise<Category>
  onShowChapters: () => void
  onVisible: (bookIndex: number, chapter: number) => void
  listen: ListenController
}

function verseDomId(bookIndex: number, chapter: number, verse: number): string {
  return `v-${bookIndex}-${chapter}-${verse}`
}

function chapterDomId(bookIndex: number, chapter: number): string {
  return `c-${bookIndex}-${chapter}`
}

function hasSlice(list: readonly Slice[], bookIndex: number, chapter: number): boolean {
  return list.some((slice) => slice.bookIndex === bookIndex && slice.chapter === chapter)
}

export function ChapterReader({
  startBook,
  startChapter,
  startVerse,
  saved,
  categories,
  onOpenPassage,
  onSaveVerse,
  onCreateCategory,
  onShowChapters,
  onVisible,
  listen,
}: ChapterReaderProps) {
  const { language, versionId, t } = useLanguage()
  const [slices, setSlices] = useState<Slice[]>([])
  const [failed, setFailed] = useState(false)
  const [armed, setArmed] = useState(false)
  const [moreFailed, setMoreFailed] = useState(false)
  const [selected, setSelected] = useState<PassageRef | null>(
    startVerse === null ? null : { bookIndex: startBook, chapter: startChapter, verse: startVerse },
  )
  const [related, setRelated] = useState<{ key: string; rows: ScriptureHit[] } | null>(null)
  const [parallelKey, setParallelKey] = useState<string | null>(null)
  const [parallel, setParallel] = useState<{ key: string; rows: ParallelHit[] } | null>(null)
  const [meaningKey, setMeaningKey] = useState<string | null>(null)
  const [shelfAim, setShelfAim] = useState<{ key: string; passage: PassageRef } | null>(null)
  const [lexiconKey, setLexiconKey] = useState<string | null>(null)
  const [focused, setFocused] = useState({ bookIndex: startBook, chapter: startChapter })
  const slicesRef = useRef(slices)
  const focusedRef = useRef(focused)
  const loadingRef = useRef(false)
  const shiftRef = useRef(0)
  const prependedRef = useRef(false)
  const allowPrepend = useRef(false)
  const onVisibleRef = useRef(onVisible)
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const endReached = slices.length > 0 && chapterStep(slices[slices.length - 1].bookIndex, slices[slices.length - 1].chapter, 1) === null

  useEffect(() => {
    slicesRef.current = slices
  }, [slices])

  useEffect(() => {
    focusedRef.current = focused
  }, [focused])

  useEffect(() => {
    onVisibleRef.current = onVisible
  }, [onVisible])

  useLayoutEffect(() => {
    let shift = shiftRef.current
    shiftRef.current = 0
    if (prependedRef.current) {
      prependedRef.current = false
      const first = slices[0]
      shift += first ? (document.getElementById(chapterDomId(first.bookIndex, first.chapter))?.offsetHeight ?? 0) : 0
    }
    if (shift !== 0) window.scrollBy(0, shift)
  }, [slices])

  useEffect(() => {
    let cancelled = false
    loadBook(versionId, startBook)
      .then((chapters) => {
        if (cancelled) return
        const verses = chapters[startChapter - 1]
        if (!verses) {
          setFailed(true)
          return
        }
        setSlices([{ bookIndex: startBook, chapter: startChapter, verses }])
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [versionId, startBook, startChapter])

  useEffect(() => {
    if (slices.length === 0 || armed) return
    const target = startVerse
      ? document.getElementById(verseDomId(startBook, startChapter, startVerse))
      : document.getElementById(chapterDomId(startBook, startChapter))
    target?.scrollIntoView({ block: startVerse ? 'center' : 'start' })
    const frame = window.requestAnimationFrame(() => {
      setArmed(true)
      if (window.scrollY > 80) allowPrepend.current = true
    })
    return () => window.cancelAnimationFrame(frame)
  }, [slices, armed, startBook, startChapter, startVerse])

  useEffect(() => {
    if (!armed) return
    const onScroll = () => {
      if (window.scrollY > 80) allowPrepend.current = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [armed])

  function frontHeight(list: readonly Slice[], count: number): number {
    let height = 0
    for (let index = 0; index < count; index += 1) {
      const slice = list[index]
      height += document.getElementById(chapterDomId(slice.bookIndex, slice.chapter))?.offsetHeight ?? 0
    }
    return height
  }

  const append = useCallback(async () => {
    if (loadingRef.current) return
    const last = slicesRef.current[slicesRef.current.length - 1]
    if (!last) return
    const following = chapterStep(last.bookIndex, last.chapter, 1)
    if (!following || hasSlice(slicesRef.current, following.bookIndex, following.chapter)) return
    loadingRef.current = true
    setMoreFailed(false)
    try {
      const chapters = await loadBook(versionId, following.bookIndex)
      const verses = chapters[following.chapter - 1]
      const slice = verses ? { bookIndex: following.bookIndex, chapter: following.chapter, verses } : null
      if (!slice) {
        setMoreFailed(true)
        return
      }
      const current = slicesRef.current
      if (hasSlice(current, slice.bookIndex, slice.chapter)) return
      let queued = [...current, slice]
      if (queued.length > WINDOW) {
        const extra = queued.length - WINDOW
        const focus = focusedRef.current
        const focusAt = queued.findIndex(
          (item) => item.bookIndex === focus.bookIndex && item.chapter === focus.chapter,
        )
        if (focusAt < 0 || focusAt >= extra) {
          shiftRef.current -= frontHeight(current, extra)
          queued = queued.slice(extra)
        }
      }
      slicesRef.current = queued
      setSlices(queued)
    } catch {
      setMoreFailed(true)
    } finally {
      loadingRef.current = false
    }
  }, [versionId])

  const prepend = useCallback(async () => {
    if (!allowPrepend.current || loadingRef.current || window.scrollY > 180) return
    const first = slicesRef.current[0]
    if (!first) return
    const previous = chapterStep(first.bookIndex, first.chapter, -1)
    if (!previous || hasSlice(slicesRef.current, previous.bookIndex, previous.chapter)) return
    loadingRef.current = true
    setMoreFailed(false)
    try {
      const chapters = await loadBook(versionId, previous.bookIndex)
      const verses = chapters[previous.chapter - 1]
      const slice = verses ? { bookIndex: previous.bookIndex, chapter: previous.chapter, verses } : null
      if (!slice) {
        setMoreFailed(true)
        return
      }
      const current = slicesRef.current
      if (hasSlice(current, slice.bookIndex, slice.chapter)) return
      const next = [slice, ...current]
      prependedRef.current = true
      const kept = next.length > WINDOW ? next.slice(0, WINDOW) : next
      slicesRef.current = kept
      setSlices(kept)
    } catch {
      setMoreFailed(true)
    } finally {
      loadingRef.current = false
    }
  }, [versionId])

  useEffect(() => {
    if (!armed) return
    const node = bottomRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void append()
      },
      { rootMargin: '900px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [armed, slices, append])

  useEffect(() => {
    if (!armed) return
    const node = topRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void prepend()
      },
      { rootMargin: '240px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [armed, slices, prepend])

  useEffect(() => {
    if (slices.length === 0) return
    const nodes = document.querySelectorAll<HTMLElement>('.scroll-chapter')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRect.height - a.intersectionRect.height)[0]
        if (!visible) return
        const element = visible.target as HTMLElement
        const bookIndex = Number(element.dataset.book)
        const chapter = Number(element.dataset.chapter)
        if (!Number.isFinite(bookIndex) || !Number.isFinite(chapter)) return
        setFocused((current) =>
          current.bookIndex === bookIndex && current.chapter === chapter ? current : { bookIndex, chapter },
        )
        onVisibleRef.current(bookIndex, chapter)
      },
      { rootMargin: '-18% 0px -40% 0px', threshold: 0 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [slices])

  useEffect(() => {
    if (parallelKey === null || selected === null) return
    const key = `${selected.bookIndex}:${selected.chapter}:${selected.verse}`
    if (parallelKey !== key) return
    let cancelled = false
    parallelPassages(versionId, selected)
      .then((rows) => {
        if (!cancelled) setParallel({ key, rows })
      })
      .catch(() => {
        if (!cancelled) setParallel({ key, rows: [] })
      })
    return () => {
      cancelled = true
    }
  }, [versionId, selected, parallelKey])

  useEffect(() => {
    if (selected === null) return
    const key = `${selected.bookIndex}:${selected.chapter}:${selected.verse}`
    let cancelled = false
    relatedPassages(versionId, selected)
      .then((rows) => {
        if (!cancelled) setRelated({ key, rows })
      })
      .catch(() => {
        if (!cancelled) setRelated({ key, rows: [] })
      })
    return () => {
      cancelled = true
    }
  }, [versionId, selected])

  useEffect(() => {
    const target = listen.passage
    if (!target || listen.status === 'idle' || slices.length === 0) return
    if (hasSlice(slices, target.bookIndex, target.chapter)) {
      document.getElementById(verseDomId(target.bookIndex, target.chapter, target.verse))?.scrollIntoView({
        block: 'center',
      })
      return
    }
    const last = slices[slices.length - 1]
    const first = slices[0]
    const place = target.bookIndex * 1000 + target.chapter
    if (place > last.bookIndex * 1000 + last.chapter) void append()
    else if (place < first.bookIndex * 1000 + first.chapter) void prepend()
  }, [listen.passage, listen.status, slices, append, prepend])

  const focusedSlice = slices.find((slice) => slice.bookIndex === focused.bookIndex && slice.chapter === focused.chapter)
  const listenPassage =
    selected ??
    (focusedSlice ? { bookIndex: focused.bookIndex, chapter: focused.chapter, verse: 1 } : null)
  const listenText = listenPassage
    ? slices.find((slice) => slice.bookIndex === listenPassage.bookIndex && slice.chapter === listenPassage.chapter)
        ?.verses[listenPassage.verse - 1]
    : undefined
  const spokenLabel =
    listen.passage && listen.status !== 'idle' ? formatPassage(language, listen.passage) : null
  const relatedKey = selected ? `${selected.bookIndex}:${selected.chapter}:${selected.verse}` : ''
  const relatedRows = related && related.key === relatedKey ? related.rows : null
  const parallelOpen = parallelKey !== null && parallelKey === relatedKey
  const parallelRows = parallelOpen && parallel && parallel.key === relatedKey ? parallel.rows : null
  const meaningOpen = meaningKey !== null && meaningKey === relatedKey
  const lexiconOpen = lexiconKey !== null && lexiconKey === relatedKey
  const shelfPassage = shelfAim && shelfAim.key === relatedKey ? shelfAim.passage : null

  return (
    <article className="reader">
      <div className="reader-tools">
        <p className="tap-hint">{t('scrollHint')}</p>
        <button type="button" className="text-button" onClick={onShowChapters}>
          {t('chapters')}
        </button>
      </div>
      <p className="tap-hint">{t('tapHint')}</p>
      {failed ? null : (
        <ListenBar
          supported={listen.supported}
          status={listen.status}
          statusText={spokenLabel}
          canVerse={selected !== null}
          canChapter={listenPassage !== null && listenText !== undefined}
          canContinue={listenPassage !== null && listenText !== undefined}
          notice={listen.refused ? t('listenRefused') : undefined}
          onVerse={() => {
            if (!selected || !listenText) return
            listen.start('verse', selected, listenText)
          }}
          onChapter={() => {
            if (!listenPassage || !listenText) return
            listen.start('chapter', listenPassage, listenText)
          }}
          onContinue={() => {
            if (!listenPassage || !listenText) return
            listen.start('continue', listenPassage, listenText)
          }}
          onPause={listen.pause}
          onResume={listen.resume}
          onStop={listen.stop}
        />
      )}
      {failed ? <p className="empty">{t('chapterFailed')}</p> : null}
      {slices.length === 0 && !failed ? <p className="status">{t('openingChapter')}</p> : null}
      <div ref={topRef} className="scroll-sentinel" />
      {slices.map((slice) => {
        const book = BOOKS[slice.bookIndex]
        const name = book.names[language]
        return (
          <section
            key={`${slice.bookIndex}-${slice.chapter}`}
            id={chapterDomId(slice.bookIndex, slice.chapter)}
            className="scroll-chapter"
            data-book={slice.bookIndex}
            data-chapter={slice.chapter}
          >
            {slice.chapter === 1 ? (
              <header className="book-open">
                <BookArt bookId={book.id} />
                <h2>{name}</h2>
              </header>
            ) : (
              <h2 className="scroll-chapter-label">
                {name} {slice.chapter}
              </h2>
            )}
            <div className="scripture">
              {slice.verses.map((text, index) => {
                if (!text.trim()) return null
                const number = index + 1
                const current = { bookIndex: slice.bookIndex, chapter: slice.chapter, verse: number }
                const isSelected =
                  selected !== null &&
                  selected.bookIndex === current.bookIndex &&
                  selected.chapter === current.chapter &&
                  selected.verse === current.verse
                const speaking =
                  listen.status !== 'idle' &&
                  listen.passage !== null &&
                  listen.passage.bookIndex === current.bookIndex &&
                  listen.passage.chapter === current.chapter &&
                  listen.passage.verse === current.verse
                const already = verseForPassage(saved, current)
                const formPassage = shelfPassage ?? current
                const listed =
                  (parallel?.key === relatedKey ? parallel.rows : []).find((row) => samePassage(row, formPassage)) ??
                  (related?.key === relatedKey ? related.rows : []).find((row) => samePassage(row, formPassage))
                const formText = samePassage(formPassage, current) ? text : (listed?.text ?? '')
                return (
                  <div
                    key={number}
                    id={verseDomId(slice.bookIndex, slice.chapter, number)}
                    className={['verse-block', isSelected ? 'selected' : '', speaking ? 'speaking' : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <button
                      type="button"
                      className="verse-line"
                      aria-expanded={isSelected}
                      aria-current={speaking ? 'true' : undefined}
                      onClick={() => setSelected(isSelected ? null : current)}
                    >
                      <sup>{number}</sup>
                      <ScriptureText bookIndex={slice.bookIndex} chapter={slice.chapter} verse={number} text={text} />
                      {already ? <span className="saved-mark">{t('savedBadge')}</span> : null}
                    </button>
                    {isSelected ? (
                      <section className="study-panel">
                        <button
                          type="button"
                          className="button button-related button-block"
                          aria-expanded={parallelOpen}
                          onClick={() => setParallelKey(parallelOpen ? null : relatedKey)}
                        >
                          {t('parallelPassages')}
                        </button>
                        {parallelOpen ? (
                          <div className="parallel-block">
                            {parallelRows === null ? <p className="field-note">{t('parallelLoading')}</p> : null}
                            {parallelRows && parallelRows.length === 0 ? (
                              <p className="field-note">{t('parallelEmpty')}</p>
                            ) : null}
                            {parallelRows && parallelRows.length > 0 ? (
                              <ul className="related-list">
                                {parallelRows.map((row) => {
                                  const label = formatPassageRange(language, row)
                                  const aimed = shelfPassage !== null && samePassage(shelfPassage, row)
                                  return (
                                    <li key={label} className="related-row">
                                      <button type="button" className="related-open" onClick={() => onOpenPassage(row)}>
                                        <span className="related-ref">{label}</span>
                                        <ScriptureText
                                          bookIndex={row.bookIndex}
                                          chapter={row.chapter}
                                          verse={row.verse}
                                          text={row.text}
                                          className="related-snippet scripture-snippet"
                                        />
                                      </button>
                                      <button
                                        type="button"
                                        className="button button-small button-ghost"
                                        aria-expanded={aimed}
                                        aria-label={t('saveReference', { reference: label })}
                                        onClick={() => {
                                          setShelfAim(aimed ? null : { key: relatedKey, passage: row })
                                          document.getElementById('shelf-save')?.scrollIntoView({ block: 'nearest' })
                                        }}
                                      >
                                        {verseForPassage(saved, row) ? t('savedBadge') : t('save')}
                                      </button>
                                    </li>
                                  )
                                })}
                              </ul>
                            ) : null}
                          </div>
                        ) : null}
                        <button
                          type="button"
                          className="button button-related button-block"
                          aria-expanded={lexiconOpen}
                          onClick={() => setLexiconKey(lexiconOpen ? null : relatedKey)}
                        >
                          {t('lexicon')}
                        </button>
                        {lexiconOpen && selected ? (
                          <div className="meaning-block">
                            <LexiconBody
                              bookIndex={selected.bookIndex}
                              chapter={selected.chapter}
                              verse={selected.verse}
                            />
                          </div>
                        ) : null}
                        <button
                          type="button"
                          className="button button-related button-block"
                          aria-expanded={meaningOpen}
                          onClick={() => setMeaningKey(meaningOpen ? null : relatedKey)}
                        >
                          {t('meaning')}
                        </button>
                        {meaningOpen && selected ? (
                          <div className="meaning-block">
                            <MeaningBody
                              bookIndex={selected.bookIndex}
                              chapter={selected.chapter}
                              verse={selected.verse}
                            />
                          </div>
                        ) : null}
                        <h2>{t('relatedVerses')}</h2>
                        {relatedRows === null ? <p className="field-note">{t('relatedLoading')}</p> : null}
                        {relatedRows && relatedRows.length === 0 ? (
                          <p className="field-note">{t('relatedScriptureEmpty')}</p>
                        ) : null}
                        {relatedRows && relatedRows.length > 0 ? (
                          <ul className="related-list">
                            {relatedRows.map((row) => {
                              const label = formatPassage(language, row)
                              const aimed = shelfPassage !== null && samePassage(shelfPassage, row)
                              return (
                                <li key={label} className="related-row">
                                  <button type="button" className="related-open" onClick={() => onOpenPassage(row)}>
                                    <span className="related-ref">{label}</span>
                                    <ScriptureText
                                      bookIndex={row.bookIndex}
                                      chapter={row.chapter}
                                      verse={row.verse}
                                      text={row.text}
                                      className="related-snippet scripture-snippet"
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    className="button button-small button-ghost"
                                    aria-expanded={aimed}
                                    aria-label={t('saveReference', { reference: label })}
                                    onClick={() => {
                                      setShelfAim(aimed ? null : { key: relatedKey, passage: row })
                                      document.getElementById('shelf-save')?.scrollIntoView({ block: 'nearest' })
                                    }}
                                  >
                                    {verseForPassage(saved, row) ? t('savedBadge') : t('save')}
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        ) : null}
                        {shelfPassage && !samePassage(shelfPassage, current) ? (
                          <button type="button" className="text-button" onClick={() => setShelfAim(null)}>
                            {t('shelfThisVerse')}
                          </button>
                        ) : null}
                        <ShelfSave
                          key={`${formPassage.bookIndex}-${formPassage.chapter}-${formPassage.verse}`}
                          domId="shelf-save"
                          passage={formPassage}
                          text={formText}
                          saved={verseForPassage(saved, formPassage) ?? null}
                          categories={categories}
                          onSave={onSaveVerse}
                          onCreateCategory={onCreateCategory}
                          onRecordingChange={(next) => {
                            if (next) listen.stop()
                          }}
                        />
                      </section>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
      <div ref={bottomRef} className="scroll-sentinel" />
      {moreFailed ? (
        <p className="empty">
          {t('chapterFailed')}{' '}
          <button type="button" className="text-button" onClick={() => void append()}>
            {t('tryAgain')}
          </button>
        </p>
      ) : null}
      {endReached ? <p className="scripture-end">{t('scriptureEnd')}</p> : null}
    </article>
  )
}
