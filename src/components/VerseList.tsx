import type { Category, Verse } from '../data/types'
import { useLanguage } from '../i18n/useLanguage'

type VerseListProps = {
  verses: Verse[]
  categories: Category[]
  voiceNoteIds: readonly string[]
  totalCount: number
  query: string
  categoryId: string | null
  onQueryChange: (query: string) => void
  onCategoryChange: (categoryId: string | null) => void
  onOpenVerse: (verseId: string) => void
}

export function VerseList({
  verses,
  categories,
  voiceNoteIds,
  totalCount,
  query,
  categoryId,
  onQueryChange,
  onCategoryChange,
  onOpenVerse,
}: VerseListProps) {
  const { t } = useLanguage()
  const activeCategory = categories.find((category) => category.id === categoryId) ?? null
  const categoriesById = new Map(categories.map((category) => [category.id, category]))
  const voices = new Set(voiceNoteIds)
  const trimmedQuery = query.trim()

  let emptyMessage = t('emptyNone')
  if (totalCount > 0 && activeCategory && trimmedQuery) {
    emptyMessage = t('emptySearchCategory', { name: activeCategory.name, query: trimmedQuery })
  } else if (totalCount > 0 && trimmedQuery) {
    emptyMessage = t('emptySearch', { query: trimmedQuery })
  } else if (totalCount > 0 && activeCategory) {
    emptyMessage = t('emptyCategory', { name: activeCategory.name })
  }

  return (
    <div className="list-screen">
      <label className="search">
        <span className="sr-only">{t('searchLabel')}</span>
        <input
          type="search"
          value={query}
          placeholder={t('searchPlaceholder')}
          onChange={(event) => onQueryChange(event.target.value)}
          enterKeyHint="search"
        />
      </label>

      <div className="chips" role="group" aria-label={t('filterLabel')}>
        <button
          type="button"
          className="chip"
          aria-pressed={categoryId === null}
          onClick={() => onCategoryChange(null)}
        >
          {t('all')}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="chip"
            aria-pressed={category.id === categoryId}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <p className="count" aria-live="polite">
        {verses.length === 1 ? t('countOne') : t('countMany', { count: verses.length })}
      </p>

      {verses.length === 0 ? (
        <p className="empty">{emptyMessage}</p>
      ) : (
        <ul className="verse-list">
          {verses.map((verse) => {
            const verseCategories = verse.categoryIds.flatMap((id) => {
              const category = categoriesById.get(id)
              return category ? [category] : []
            })
            const hasVoice = voices.has(verse.id)
            return (
              <li key={verse.id}>
                <article className="verse-card">
                  <button type="button" className="verse-open" onClick={() => onOpenVerse(verse.id)}>
                    <span className="reference">{verse.reference}</span>
                    <span className="verse-text">{verse.text}</span>
                    {verse.note ? <span className="note">{verse.note}</span> : null}
                  </button>
                  {verseCategories.length > 0 || hasVoice ? (
                    <div className="card-pills">
                      {hasVoice ? <span className="pill pill-static">{t('voicePill')}</span> : null}
                      {verseCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          className="pill"
                          onClick={() => onCategoryChange(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </article>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
