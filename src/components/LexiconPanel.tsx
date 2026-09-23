import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/useLanguage'
import { BOOKS } from '../scripture/books'
import { lexiconEntry, lexiconFor, peekLexiconEntry, type LexiconEntry, type LexiconWord } from '../scripture/api'
import { parseReference } from '../scripture/passages'

type LexiconBodyProps = {
  bookIndex: number
  chapter: number
  verse: number
}

function scriptOf(word: LexiconWord, testament: 'ot' | 'nt'): 'greek' | 'hebrew' | 'aramaic' {
  if (word.aramaic) return 'aramaic'
  return testament === 'nt' ? 'greek' : 'hebrew'
}

function WordDetail({
  word,
  entry,
  onRelated,
}: {
  word: LexiconWord | null
  entry: LexiconEntry | null
  onRelated: (id: string) => void
}) {
  const { t } = useLanguage()
  const strong = entry?.id ?? word?.strong ?? ''
  const lemma = entry?.lemma || word?.surface || ''
  const transliteration = entry?.transliteration || word?.transliteration || ''
  const hebrew = strong.startsWith('H') || word?.aramaic === true
  const definition = entry?.definition ?? ''
  const showDefinition = definition.length > 0 && definition !== entry?.gloss && definition !== word?.gloss
  const related = (entry?.related ?? [])
    .map((id) => peekLexiconEntry(id))
    .filter((item): item is LexiconEntry => item !== null)

  return (
    <div className="lex-detail">
      <p className="lex-lemma" lang={hebrew ? 'hbo' : 'grc'} dir={hebrew ? 'rtl' : 'ltr'}>
        {lemma}
      </p>
      {transliteration ? <p className="lex-translit">{transliteration}</p> : null}
      {strong ? <p className="lex-strong">{t('lexiconStrong', { id: strong })}</p> : null}
      {word?.gloss ? (
        <p className="lex-verse-gloss">
          <span className="meaning-about-label">{t('lexiconInVerse')}</span> {word.gloss}
        </p>
      ) : null}
      {entry?.gloss && entry.gloss !== word?.gloss ? <p className="lex-gloss-line">{entry.gloss}</p> : null}
      {showDefinition ? (
        <div className="meaning-text" lang="en">
          {definition.split(/\n+/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {!entry ? <p className="field-note">{t('lexiconNoEntry')}</p> : null}
      {related.length > 0 ? (
        <div className="lex-related">
          <p className="meaning-about-label">{t('lexiconRelated')}</p>
          <ul className="lex-words">
            {related.map((item) => (
              <li key={item.id}>
                <button type="button" className="lex-word" onClick={() => onRelated(item.id)}>
                  <span className="lex-surface" lang={item.id.startsWith('H') ? 'hbo' : 'grc'} dir={item.id.startsWith('H') ? 'rtl' : 'ltr'}>
                    {item.lemma}
                  </span>
                  <span className="lex-mini">{item.gloss}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export function LexiconBody({ bookIndex, chapter, verse }: LexiconBodyProps) {
  const { language, t } = useLanguage()
  const testament = BOOKS[bookIndex]?.testament ?? 'ot'
  const key = `${bookIndex}:${chapter}:${verse}`
  const [loaded, setLoaded] = useState<{ key: string; words: LexiconWord[] } | null>(null)
  const [selection, setSelection] = useState<{ key: string; index: number | null; relatedId: string | null }>({
    key: '',
    index: null,
    relatedId: null,
  })
  const [entry, setEntry] = useState<{ key: string; entry: LexiconEntry | null } | null>(null)
  const words = loaded?.key === key ? loaded.words : null
  const pending = loaded?.key !== key
  const open = selection.key === key ? selection.index : null
  const relatedId = selection.key === key ? selection.relatedId : null

  useEffect(() => {
    let cancelled = false
    lexiconFor({ bookIndex, chapter, verse })
      .then((next) => {
        if (!cancelled) setLoaded({ key, words: next })
      })
      .catch(() => {
        if (!cancelled) setLoaded({ key, words: [] })
      })
    return () => {
      cancelled = true
    }
  }, [bookIndex, chapter, verse, key])

  const activeWord = open !== null ? words?.[open] ?? null : null
  const activeId = relatedId ?? activeWord?.strong ?? ''

  useEffect(() => {
    if (!activeId) return
    let cancelled = false
    lexiconEntry(activeId)
      .then((next) => {
        if (!cancelled) setEntry({ key: activeId, entry: next })
      })
      .catch(() => {
        if (!cancelled) setEntry({ key: activeId, entry: null })
      })
    return () => {
      cancelled = true
    }
  }, [activeId])

  if (pending) return <p className="field-note">{t('lexiconLoading')}</p>
  if (!words || words.length === 0) {
    return (
      <>
        <p className="field-note">{t('lexiconEmpty')}</p>
        <LexiconAbout />
      </>
    )
  }

  const scripts = new Set(words.map((word) => scriptOf(word, testament)))
  let heading = t('lexiconGreek')
  if (scripts.has('aramaic') && scripts.has('hebrew')) heading = t('lexiconHebrewAramaic')
  else if (scripts.has('aramaic')) heading = t('lexiconAramaic')
  else if (scripts.has('hebrew')) heading = t('lexiconHebrew')
  const shownEntry = entry?.key === activeId ? entry.entry : null
  const entryPending = activeId.length > 0 && entry?.key !== activeId

  return (
    <div className="lex-panel">
      {language !== 'en' ? <p className="field-note">{t('lexiconEnglish')}</p> : null}
      <p className="meaning-about-label">{heading}</p>
      <ul className="lex-words">
        {words.map((word, index) => {
          const script = scriptOf(word, testament)
          const selected = open === index && !relatedId
          return (
            <li key={`${word.strong}-${index}`}>
              <button
                type="button"
                className={selected ? 'lex-word selected' : 'lex-word'}
                aria-expanded={selected}
                onClick={() => {
                  setSelection({ key, index: selected ? null : index, relatedId: null })
                }}
              >
                <span className="lex-surface" lang={script === 'greek' ? 'grc' : script === 'aramaic' ? 'arc' : 'hbo'} dir={script === 'greek' ? 'ltr' : 'rtl'}>
                  {word.surface}
                </span>
                {word.transliteration ? <span className="lex-mini">{word.transliteration}</span> : null}
                <span className="lex-mini">{word.strong}</span>
                {word.gloss ? <span className="lex-mini">{word.gloss}</span> : null}
              </button>
            </li>
          )
        })}
      </ul>
      {activeWord || relatedId ? (
        entryPending ? (
          <p className="field-note">{t('lexiconLoading')}</p>
        ) : (
          <WordDetail
            word={relatedId ? null : activeWord}
            entry={shownEntry}
            onRelated={(id) => setSelection({ key, index: open, relatedId: id })}
          />
        )
      ) : null}
      <LexiconAbout />
    </div>
  )
}

function LexiconAbout() {
  const { t } = useLanguage()
  return (
    <footer className="meaning-about">
      <p className="meaning-about-label">{t('lexiconAbout')}</p>
      <p>{t('lexiconSource')}</p>
    </footer>
  )
}

type LexiconNoteProps = {
  reference: string
  locked: boolean
  onClose: () => void
}

export function LexiconNote({ reference, locked, onClose }: LexiconNoteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { t } = useLanguage()
  const hasReference = reference.trim().length > 0
  const parsed = hasReference ? parseReference(reference) : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    closeRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialogRef}
      className="dialog related-sheet"
      aria-labelledby="lexicon-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="related-head">
        <h2 id="lexicon-title" className="dialog-title">
          {t('lexicon')}
        </h2>
        <button ref={closeRef} type="button" className="text-button" onClick={onClose}>
          {t('close')}
        </button>
      </div>
      <div className="related-body">
        {locked ? <p className="field-note">{t('stopThenSave')}</p> : null}
        {!hasReference ? <p className="field-note">{t('lexiconNeedReference')}</p> : null}
        {hasReference && !parsed ? <p className="field-note">{t('lexiconEmpty')}</p> : null}
        {parsed ? <LexiconBody bookIndex={parsed.bookIndex} chapter={parsed.chapter} verse={parsed.verse} /> : null}
      </div>
    </dialog>,
    document.body,
  )
}
