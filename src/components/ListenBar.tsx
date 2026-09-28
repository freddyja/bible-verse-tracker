import { useLanguage } from '../i18n/useLanguage'
import type { ListenController } from '../speech/useListen'

function SpeakerIcon() {
  return (
    <svg className="listen-speaker" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M3 9.5v5h3.8L12 19V5L6.8 9.5H3z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M15.5 9.2a3.6 3.6 0 0 1 0 5.6M18.2 6.6a7 7 0 0 1 0 10.8"
      />
    </svg>
  )
}

type ListenBarProps = {
  listen: ListenController
  statusText: string | null
  canVerse: boolean
  canChapter: boolean
  canContinue: boolean
  note?: string
  onVerse: () => void
  onChapter: () => void
  onContinue: () => void
}

export function ListenBar({
  listen,
  statusText,
  canVerse,
  canChapter,
  canContinue,
  note,
  onVerse,
  onChapter,
  onContinue,
}: ListenBarProps) {
  const { t } = useLanguage()
  const active = listen.status !== 'idle'
  const controls = listen.supported

  return (
    <div className="listen-bar" role="group" aria-label={t('listen')}>
      <p className="listen-label">{t('listen')}</p>
      {controls ? null : <p className="field-note">{t('listenUnavailable')}</p>}
      {controls && active ? (
        <div className="listen-actions">
          <p className="listen-status" aria-live="polite">
            {listen.status === 'paused' ? t('listenPaused') : t('listening')}
            {statusText ? ` · ${statusText}` : ''}
          </p>
          {listen.status === 'playing' ? (
            <button type="button" className="button button-small" onClick={listen.pause}>
              {t('listenPause')}
            </button>
          ) : (
            <button type="button" className="button button-small" onClick={listen.resume}>
              {t('listenResume')}
            </button>
          )}
          <button type="button" className="button button-ghost button-small" onClick={listen.stop}>
            {t('stop')}
          </button>
        </div>
      ) : null}
      {controls && !active ? (
        <div className="listen-actions">
          <button type="button" className="button button-small" disabled={!canVerse} onClick={onVerse}>
            {t('listenVerse')}
          </button>
          <button type="button" className="button button-small" disabled={!canChapter} onClick={onChapter}>
            {t('listenChapter')}
          </button>
          <button type="button" className="button button-small" disabled={!canContinue} onClick={onContinue}>
            <SpeakerIcon />
            {t('listenContinue')}
          </button>
        </div>
      ) : null}
      {listen.refused && !active ? <p className="field-note">{t('listenRefused')}</p> : null}
      {note && !active ? <p className="field-note">{note}</p> : null}
    </div>
  )
}
