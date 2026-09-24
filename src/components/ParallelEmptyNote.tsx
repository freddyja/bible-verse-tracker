import { useLanguage } from '../i18n/useLanguage'

type ParallelEmptyNoteProps = {
  onShowRelated?: () => void
}

export function ParallelEmptyNote({ onShowRelated }: ParallelEmptyNoteProps) {
  const { t } = useLanguage()
  return (
    <div className="parallel-empty">
      <p className="field-note">{t('parallelEmpty')}</p>
      <p className="field-note">{t('parallelEmptyWhy')}</p>
      {onShowRelated ? (
        <button
          type="button"
          className="button button-small button-ghost"
          aria-controls="related-verses"
          onClick={onShowRelated}
        >
          {t('parallelSeeRelated')}
        </button>
      ) : (
        <p className="field-note">{t('parallelEmptyRelated', { related: t('relatedVerses') })}</p>
      )}
    </div>
  )
}
