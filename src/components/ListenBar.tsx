import { useLanguage } from '../i18n/useLanguage'

type ListenBarProps = {
  supported: boolean
  status: 'idle' | 'playing' | 'paused'
  statusText: string | null
  canVerse: boolean
  canChapter: boolean
  canContinue: boolean
  note?: string
  notice?: string
  onVerse: () => void
  onChapter: () => void
  onContinue: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
}

export function ListenBar({
  supported,
  status,
  statusText,
  canVerse,
  canChapter,
  canContinue,
  note,
  notice,
  onVerse,
  onChapter,
  onContinue,
  onPause,
  onResume,
  onStop,
}: ListenBarProps) {
  const { t } = useLanguage()
  const active = status !== 'idle'

  return (
    <div className="listen-bar" role="group" aria-label={t('listen')}>
      <p className="listen-label">{t('listen')}</p>
      {supported ? null : <p className="field-note">{t('listenUnavailable')}</p>}
      {supported && active ? (
        <div className="listen-actions">
          {statusText ? (
            <p className="listen-status" aria-live="polite">
              {status === 'paused' ? t('listenPaused') : t('listening')}
              {statusText ? ` · ${statusText}` : ''}
            </p>
          ) : (
            <p className="listen-status" aria-live="polite">
              {status === 'paused' ? t('listenPaused') : t('listening')}
            </p>
          )}
          {status === 'playing' ? (
            <button type="button" className="button button-small" onClick={onPause}>
              {t('listenPause')}
            </button>
          ) : (
            <button type="button" className="button button-small" onClick={onResume}>
              {t('listenResume')}
            </button>
          )}
          <button type="button" className="button button-ghost button-small" onClick={onStop}>
            {t('stop')}
          </button>
        </div>
      ) : null}
      {supported && !active ? (
        <div className="listen-actions">
          <button type="button" className="button button-small" disabled={!canVerse} onClick={onVerse}>
            {t('listenVerse')}
          </button>
          <button type="button" className="button button-small" disabled={!canChapter} onClick={onChapter}>
            {t('listenChapter')}
          </button>
          <button type="button" className="button button-small" disabled={!canContinue} onClick={onContinue}>
            {t('listenContinue')}
          </button>
        </div>
      ) : null}
      {notice && !active ? <p className="field-note">{notice}</p> : null}
      {note && !active ? <p className="field-note">{note}</p> : null}
    </div>
  )
}
