import { BOOKS } from '../scripture/books'
import { useLanguage } from '../i18n/useLanguage'

type ChapterPickerProps = {
  bookIndex: number
  onOpenChapter: (chapter: number) => void
}

export function ChapterPicker({ bookIndex, onOpenChapter }: ChapterPickerProps) {
  const { t } = useLanguage()
  const book = BOOKS[bookIndex]
  const chapters = Array.from({ length: book.chapters }, (_, index) => index + 1)

  return (
    <section>
      <h2 className="related-heading">{t('chapters')}</h2>
      <div className="chapter-grid">
        {chapters.map((chapter) => (
          <button key={chapter} type="button" className="chapter-link" onClick={() => onOpenChapter(chapter)}>
            {chapter}
          </button>
        ))}
      </div>
    </section>
  )
}
