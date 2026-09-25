import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { verseForPassage } from '../data/matchVerse'
import type { Category, Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'
import { ListenBar } from './ListenBar'
import { ScriptureText } from './ScriptureText'
import { BookArt } from './BookArt'
import { VerseSheet } from './VerseSheet'
import type { ListenController } from '../speech/useListen'
import { loadBook } from '../scripture/api'
import { BOOKS } from '../scripture/books'
import { chapterStep } from '../scripture/canon'
import { formatPassage, type PassageRef } from '../scripture/passages'

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
  const [picked, setPicked] = useState<PassageRef | null>(
    startVerse === null ? null : { bookIndex: startBook, chapter: startChapter, verse: startVerse },
  )
  const [sheetOpen, setSheetOpen] = useState(false)
  const [explain, setExplain] = useState(false)
  const [chosen, setChosen] = useState<PassageRef[]>([])
  const [savingChosen, setSavingChosen] = useState(false)
  const pressTimer = useRef<number | null>(null)
  const suppressClick = useRef(false)
  const pressOrigin = useRef<{ x: number; y: number } | null>(null)
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
  const pickedInFocus =
    picked !== null &&
    focusedSlice !== undefined &&
    picked.bookIndex === focused.bookIndex &&
    picked.chapter === focused.chapter
  const chapterStart = pickedInFocus
    ? picked
    : focusedSlice
      ? { bookIndex: focused.bookIndex, chapter: focused.chapter, verse: 1 }
      : null
  const chapterText = chapterStart
    ? slices.find((slice) => slice.bookIndex === chapterStart.bookIndex && slice.chapter === chapterStart.chapter)
        ?.verses[chapterStart.verse - 1]
    : undefined
  const pickedText = picked
    ? slices.find((slice) => slice.bookIndex === picked.bookIndex && slice.chapter === picked.chapter)?.verses[
        picked.verse - 1
      ]
    : undefined
  const spokenLabel =
    listen.passage && listen.status !== 'idle' ? formatPassage(language, listen.passage) : null
  const sheetText = sheetOpen ? pickedText : undefined

  function sameChosen(passage: PassageRef) {
    return chosen.some(
      (item) => item.bookIndex === passage.bookIndex && item.chapter === passage.chapter && item.verse === passage.verse,
    )
  }

  function toggleChosen(passage: PassageRef) {
    setChosen((list) =>
      list.some((item) => item.bookIndex === passage.bookIndex && item.chapter === passage.chapter && item.verse === passage.verse)
        ? list.filter(
            (item) =>
              item.bookIndex !== passage.bookIndex || item.chapter !== passage.chapter || item.verse !== passage.verse,
          )
        : [...list, passage],
    )
  }

  function clearPress() {
    if (pressTimer.current !== null) {
      window.clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
    pressOrigin.current = null
  }

  async function saveChosen() {
    setSavingChosen(true)
    try {
      for (const passage of chosen) {
        if (verseForPassage(saved, passage)) continue
        const text = slices
          .find((slice) => slice.bookIndex === passage.bookIndex && slice.chapter === passage.chapter)
          ?.verses[passage.verse - 1]?.trim()
        if (!text) continue
        await onSaveVerse(
          {
            reference: formatPassage(language, passage),
            text,
            note: '',
            categoryIds: [],
            passage,
          },
          undefined,
          { kind: 'keep' },
        )
      }
      setChosen([])
    } finally {
      setSavingChosen(false)
    }
  }

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
          canVerse={picked !== null && pickedText !== undefined}
          canChapter={chapterStart !== null && chapterText !== undefined}
          canContinue={chapterStart !== null && chapterText !== undefined}
          notice={listen.refused ? t('listenRefused') : undefined}
          onVerse={() => {
            if (!picked || pickedText === undefined) return
            listen.start('verse', picked, pickedText)
          }}
          onChapter={() => {
            if (!chapterStart || chapterText === undefined) return
            listen.start('chapter', chapterStart, chapterText)
          }}
          onContinue={() => {
            if (!chapterStart || chapterText === undefined) return
            listen.start('continue', chapterStart, chapterText)
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
                const isOpen =
                  sheetOpen &&
                  picked !== null &&
                  picked.bookIndex === current.bookIndex &&
                  picked.chapter === current.chapter &&
                  picked.verse === current.verse
                const speaking =
                  listen.status !== 'idle' &&
                  listen.passage !== null &&
                  listen.passage.bookIndex === current.bookIndex &&
                  listen.passage.chapter === current.chapter &&
                  listen.passage.verse === current.verse
                const already = verseForPassage(saved, current)
                const isPicked = sameChosen(current)
                return (
                  <div
                    key={number}
                    id={verseDomId(slice.bookIndex, slice.chapter, number)}
                    className={['verse-block', isOpen ? 'selected' : '', speaking ? 'speaking' : '', isPicked ? 'is-picked' : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <button
                      type="button"
                      className="verse-line"
                      aria-haspopup="dialog"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? 'verse-sheet' : undefined}
                      aria-current={speaking ? 'true' : undefined}
                      aria-pressed={chosen.length > 0 ? isPicked : undefined}
                      onPointerDown={(event) => {
                        pressOrigin.current = { x: event.clientX, y: event.clientY }
                        suppressClick.current = false
                        pressTimer.current = window.setTimeout(() => {
                          suppressClick.current = true
                          toggleChosen(current)
                          clearPress()
                        }, 450)
                      }}
                      onPointerMove={(event) => {
                        if (!pressOrigin.current) return
                        const dx = Math.abs(event.clientX - pressOrigin.current.x)
                        const dy = Math.abs(event.clientY - pressOrigin.current.y)
                        if (dx > 8 || dy > 8) clearPress()
                      }}
                      onPointerUp={clearPress}
                      onPointerCancel={clearPress}
                      onClick={() => {
                        if (suppressClick.current) {
                          suppressClick.current = false
                          return
                        }
                        if (chosen.length > 0) {
                          toggleChosen(current)
                          return
                        }
                        setExplain(false)
                        setPicked(current)
                        setSheetOpen(true)
                      }}
                    >
                      <sup>{number}</sup>
                      <ScriptureText bookIndex={slice.bookIndex} chapter={slice.chapter} verse={number} text={text} />
                      {already ? <span className="saved-mark">{t('savedBadge')}</span> : null}
                    </button>
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
      {chosen.length > 0 ? (
        <div className="select-bar" role="toolbar" aria-label={t('versesSelected', { count: chosen.length })}>
          <p className="select-count">{t('versesSelected', { count: chosen.length })}</p>
          <div className="select-actions">
            <button type="button" className="button button-small" disabled={savingChosen} onClick={() => void saveChosen()}>
              {t('save')}
            </button>
            <button
              type="button"
              className="button button-ghost button-small"
              onClick={() => {
                const passage = chosen[chosen.length - 1]
                if (!passage) return
                setExplain(true)
                setPicked(passage)
                setSheetOpen(true)
                setChosen([])
              }}
            >
              {t('explainVerse')}
            </button>
            <button type="button" className="text-button" onClick={() => setChosen([])}>
              {t('clearSelection')}
            </button>
          </div>
        </div>
      ) : null}
      {sheetOpen && picked && sheetText ? (
        <VerseSheet
          key={`${picked.bookIndex}-${picked.chapter}-${picked.verse}:${explain ? 'study' : 'menu'}`}
          initialTool={explain ? 'study' : null}
          passage={picked}
          text={sheetText}
          saved={saved}
          categories={categories}
          listenSupported={listen.supported}
          onListen={() => {
            if (pickedText === undefined) return
            listen.start('verse', picked, pickedText)
          }}
          onClose={() => {
            setSheetOpen(false)
            setExplain(false)
          }}
          onOpenPassage={onOpenPassage}
          onSaveVerse={onSaveVerse}
          onCreateCategory={onCreateCategory}
          onRecordingChange={(next) => {
            if (next) listen.stop()
          }}
        />
      ) : null}
    </article>
  )
}
