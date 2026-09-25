import { BOOKS } from '../scripture/books'
import { useLanguage } from '../i18n/useLanguage'
import { TABLET_QUERY, useMediaQuery } from '../hooks/useMediaQuery'

type ReadChromeProps = {
  bookIndex: number
  chapter: number | null
  onChangeBook: (bookIndex: number) => void
  onChangeChapter: (chapter: number) => void
  onStep?: (direction: 1 | -1) => void
}

export function ReadChrome({ bookIndex, chapter, onChangeBook, onChangeChapter, onStep }: ReadChromeProps) {
  const tablet = useMediaQuery(TABLET_QUERY)
  const { language, t } = useLanguage()
  const book = BOOKS[bookIndex]
  if (!tablet || !book) return null

  const chapters = Array.from({ length: book.chapters }, (_, index) => index + 1)

  return (
    <nav className="read-chrome" aria-label={t('jumpReading')}>
      <label className="read-jump">
        <span>{t('jumpBook')}</span>
        <select
          aria-label={t('jumpBook')}
          value={bookIndex}
          onChange={(event) => onChangeBook(Number(event.target.value))}
        >
          {BOOKS.map((item, index) => (
            <option key={item.id} value={index}>
              {item.names[language]}
            </option>
          ))}
        </select>
      </label>
      <label className="read-jump read-jump-chapter">
        <span>{t('jumpChapter')}</span>
        <select
          aria-label={t('jumpChapter')}
          value={chapter ?? ''}
          onChange={(event) => {
            const next = Number(event.target.value)
            if (next) onChangeChapter(next)
          }}
        >
          {chapter === null ? <option value="">{t('jumpChapter')}</option> : null}
          {chapters.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </label>
      {onStep ? (
        <div className="read-chrome-nav">
          <button type="button" onClick={() => onStep(-1)} disabled={bookIndex === 0 && chapter === 1}>
            {t('prevChapter')}
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            disabled={bookIndex === BOOKS.length - 1 && chapter === book.chapters}
          >
            {t('nextChapter')}
          </button>
        </div>
      ) : null}
    </nav>
  )
}
