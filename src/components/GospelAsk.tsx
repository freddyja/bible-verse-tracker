import { useEffect, useRef, useState } from 'react'
import { answerGospel } from '../gospel/answer'
import { loadGospelTurns, saveGospelTurns } from '../gospel/history'
import type { GospelTurn } from '../gospel/types'
import { useLanguage } from '../i18n/useLanguage'
import { versionById } from '../scripture/versions'

type GospelAskProps = {
  onOpenPassage: (bookIndex: number, chapter: number, verse: number) => void
}

function turnId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function GospelAsk({ onOpenPassage }: GospelAskProps) {
  const { language, t, versionId } = useLanguage()
  const [turns, setTurns] = useState<GospelTurn[]>(() => loadGospelTurns())
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmClear, setConfirmClear] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const versionName = versionById(versionId)?.name ?? versionId

  useEffect(() => {
    saveGospelTurns(turns)
  }, [turns])

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [turns.length, busy])

  async function ask(raw: string) {
    const question = raw.trim()
    if (!question || busy) return
    setBusy(true)
    setError(null)
    setConfirmClear(false)
    setDraft('')
    try {
      const answer = await answerGospel(question, language, versionId)
      setTurns((current) => [...current, { id: turnId(), question, answer, at: Date.now() }].slice(-30))
    } catch {
      setDraft(question)
      setError(t('gospelFailed'))
    } finally {
      setBusy(false)
    }
  }

  const starters = [
    t('gospelStarterGospel'),
    t('gospelStarterPrayer'),
    t('gospelStarterForgiveness'),
    t('gospelStarterFear'),
  ]

  return (
    <div className="gospel-ask">
      <p className="field-note">{t('gospelLead')}</p>
      <p className="field-note">{t('gospelSource', { version: versionName })}</p>
      <p className="field-note">{t('gospelDisclaimer')}</p>

      {turns.length === 0 ? (
        <div className="gospel-chips">
          <p className="gospel-try">{t('gospelTry')}</p>
          {starters.map((starter) => (
            <button key={starter} type="button" className="gospel-chip" disabled={busy} onClick={() => void ask(starter)}>
              {starter}
            </button>
          ))}
        </div>
      ) : (
        <div className="gospel-log" role="log" aria-label={t('gospelTitle')}>
          {turns.map((turn) => (
            <article key={turn.id} className="gospel-turn">
              <p className="gospel-user">
                <span className="gospel-kicker">{t('gospelYou')}</span>
                {turn.question}
              </p>
              <div className={turn.answer.kind === 'care' || turn.answer.kind === 'refuse' ? 'gospel-answer gospel-answer-care' : 'gospel-answer'}>
                <p className="gospel-kicker">{t('gospelScripture')}</p>
                <p className="gospel-intro">{turn.answer.intro}</p>
                {turn.answer.verses.map((verse) => (
                  <blockquote key={`${turn.id}:${verse.bookIndex}:${verse.chapter}:${verse.verse}`} className="gospel-verse">
                    <p className="gospel-verse-text">{verse.text}</p>
                    <div className="gospel-verse-foot">
                      <cite>
                        {verse.reference} · {verse.version}
                      </cite>
                      <button
                        type="button"
                        className="button button-ghost button-small"
                        aria-label={t('gospelReadVerse', { reference: verse.reference })}
                        onClick={() => onOpenPassage(verse.bookIndex, verse.chapter, verse.verse)}
                      >
                        {t('gospelRead')}
                      </button>
                    </div>
                  </blockquote>
                ))}
                <p className="gospel-closing">{turn.answer.closing}</p>
              </div>
            </article>
          ))}
          <div ref={endRef} />
        </div>
      )}

      {turns.length > 0 ? (
        confirmClear ? (
          <div className="gospel-clear">
            <p className="field-note">{t('gospelClearAsk')}</p>
            <div className="gospel-actions">
              <button
                type="button"
                className="button button-ghost"
                onClick={() => {
                  setTurns([])
                  setConfirmClear(false)
                  setError(null)
                }}
              >
                {t('gospelClearYes')}
              </button>
              <button type="button" className="button button-ghost" onClick={() => setConfirmClear(false)}>
                {t('cancel')}
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="button button-ghost gospel-clear-button" onClick={() => setConfirmClear(true)}>
            {t('gospelClear')}
          </button>
        )
      ) : null}

      <form
        className="gospel-compose"
        onSubmit={(event) => {
          event.preventDefault()
          void ask(draft)
        }}
      >
        <label className="sr-only" htmlFor="gospel-question">
          {t('gospelTitle')}
        </label>
        <input
          id="gospel-question"
          type="text"
          value={draft}
          maxLength={280}
          placeholder={t('gospelPlaceholder')}
          disabled={busy}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="button" disabled={busy || draft.trim().length === 0} aria-busy={busy}>
          {t('gospelSend')}
        </button>
      </form>
      {busy ? (
        <p className="field-note" role="status">
          {t('gospelWorking')}
        </p>
      ) : null}
      {error ? (
        <p className="field-note" role="status">
          {error}
        </p>
      ) : null}
    </div>
  )
}
