import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { buildHandout } from '../sermon/build'
import { handoutDocx } from '../sermon/docx'
import { handoutFileName, handoutText } from '../sermon/plain'
import type { SermonBlock, SermonDepth, SermonHandout, SermonLang } from '../sermon/types'

const ORDER: readonly SermonLang[] = ['en', 'es', 'pt']

const COLUMN_NAME: Record<SermonLang, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
}

type LegacyDocument = Document & {
  webkitFullscreenElement?: Element | null
  webkitExitFullscreen?: () => void
}

type LegacyElement = HTMLElement & {
  webkitRequestFullscreen?: () => void
}

function activeFullscreen(): Element | null {
  return document.fullscreenElement ?? (document as LegacyDocument).webkitFullscreenElement ?? null
}

function ShortColumn({ language, block }: { language: SermonLang; block: SermonBlock }) {
  return (
    <section className="sermon-block" lang={language}>
      <p className="sermon-lang">{COLUMN_NAME[language]}</p>
      <h2 className="sermon-ref">{block.reference}</h2>
      <p className="sermon-quote">{block.quote}</p>
      <p className="sermon-punch">{block.punch}</p>
      <p>{block.context}</p>
      <p>{block.application}</p>
      <p className="sermon-challenge">{block.challenge}</p>
      <p>{block.charge}</p>
      <h3 className="sermon-questions-label">{block.questionsLabel}</h3>
      <ol className="sermon-questions">
        {block.questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ol>
    </section>
  )
}

function FullColumn({
  language,
  block,
  labels,
}: {
  language: SermonLang
  block: SermonBlock
  labels: {
    title: string
    bigIdea: string
    openingHook: string
    passage: string
    context: string
    point: string
    application: string
    invitation: string
    closingPrayer: string
  }
}) {
  return (
    <section className="sermon-block sermon-block-full" lang={language}>
      <p className="sermon-lang">{COLUMN_NAME[language]}</p>
      <p className="sermon-section-label">{labels.title}</p>
      <h2 className="sermon-ref">{block.title}</h2>
      <p className="sermon-section-label">{labels.bigIdea}</p>
      <p className="sermon-punch">{block.bigIdea}</p>
      <p className="sermon-section-label">{labels.openingHook}</p>
      <p>{block.openingHook}</p>
      <p className="sermon-section-label">{labels.passage}</p>
      <h3 className="sermon-ref">{block.reference}</h3>
      <p className="sermon-quote">{block.quote}</p>
      <p className="sermon-section-label">{labels.context}</p>
      <p>{block.context}</p>
      {(block.points ?? []).map((point, index) => (
        <div key={`${point.heading}-${index}`} className="sermon-point">
          <p className="sermon-section-label">
            {labels.point} {index + 1}
          </p>
          <p className="sermon-punch">{point.heading}</p>
          <p>
            {point.thought}
            {point.crossRef ? ` (${point.crossRef})` : null}
          </p>
        </div>
      ))}
      <p className="sermon-section-label">{labels.application}</p>
      <p>{block.application}</p>
      <p className="sermon-section-label">{labels.invitation}</p>
      <p className="sermon-challenge">{block.invitation}</p>
      <p className="sermon-section-label">{labels.closingPrayer}</p>
      <p>{block.closingPrayer}</p>
      <h3 className="sermon-questions-label">{block.questionsLabel}</h3>
      <ol className="sermon-questions">
        {block.questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ol>
    </section>
  )
}

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // Some browsers refuse the async clipboard and still allow the older copy.
  }
  try {
    const field = document.createElement('textarea')
    field.value = value
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.left = '-9999px'
    document.body.append(field)
    field.select()
    const ok = document.execCommand('copy')
    field.remove()
    return ok
  } catch {
    return false
  }
}

export function SermonMaker() {
  const { t } = useLanguage()
  const sheetRef = useRef<HTMLElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')
  const [depth, setDepth] = useState<SermonDepth>('short')
  const [handout, setHandout] = useState<SermonHandout | null>(null)
  const [working, setWorking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [fullscreenOn, setFullscreenOn] = useState(false)
  const [fallback, setFallback] = useState(false)
  const presenting = fullscreenOn || fallback

  const sectionLabels = {
    title: t('sermonSectionTitle'),
    bigIdea: t('sermonSectionBigIdea'),
    openingHook: t('sermonSectionOpeningHook'),
    passage: t('sermonSectionPassage'),
    context: t('sermonSectionContext'),
    point: t('sermonSectionPoint'),
    application: t('sermonSectionApplication'),
    invitation: t('sermonSectionInvitation'),
    closingPrayer: t('sermonSectionClosingPrayer'),
  }

  async function generate() {
    const clean = topic.trim()
    if (!clean) {
      setError(t('sermonTopicRequired'))
      setHandout(null)
      return
    }
    setWorking(true)
    setError(null)
    setNotice(null)
    try {
      setHandout(await buildHandout(clean, audience, depth))
    } catch {
      setHandout(null)
      setError(t('sermonFailed'))
    } finally {
      setWorking(false)
    }
  }

  async function copyHandout() {
    if (!handout) return
    const ok = await copyText(handoutText(handout))
    setNotice(ok ? t('sermonCopied') : t('sermonCopyFailed'))
  }

  async function shareHandout() {
    if (!handout) return
    const text = handoutText(handout)
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: t('sermonShareTitle'), text })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
      }
    }
    await copyHandout()
  }

  useEffect(() => {
    if (!handout) return
    sheetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [handout])

  useEffect(() => {
    function sync() {
      setFullscreenOn(activeFullscreen() === boardRef.current)
    }
    document.addEventListener('fullscreenchange', sync)
    document.addEventListener('webkitfullscreenchange', sync)
    return () => {
      document.removeEventListener('fullscreenchange', sync)
      document.removeEventListener('webkitfullscreenchange', sync)
    }
  }, [])

  useEffect(() => {
    if (!fallback) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setFallback(false)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [fallback])

  async function present() {
    const node = boardRef.current
    if (!node) return
    if (fallback) {
      setFallback(false)
      return
    }
    if (activeFullscreen() === node) {
      try {
        screen.orientation?.unlock()
      } catch {
        // Unlock can throw when the browser never granted a lock.
      }
      if (document.exitFullscreen) await document.exitFullscreen()
      else (document as LegacyDocument).webkitExitFullscreen?.()
      return
    }
    const target = node as LegacyElement
    try {
      if (node.requestFullscreen) await node.requestFullscreen()
      else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen()
      else {
        setFallback(true)
        return
      }
      try {
        await screen.orientation?.lock('landscape')
      } catch {
        // A landscape lock needs a fullscreen gesture on some phones. The layout still turns with the device.
      }
    } catch {
      setFallback(true)
    }
  }

  function downloadHandout() {
    if (!handout) return
    const url = URL.createObjectURL(handoutDocx(handout))
    const link = document.createElement('a')
    link.href = url
    link.download = handoutFileName(handout.topic)
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1500)
  }

  return (
    <div className="editor sermon-maker">
      <p className="field-note">{t('sermonLead')}</p>
      <label className="field">
        <span className="label">{t('sermonTopic')}</span>
        <input
          type="text"
          value={topic}
          maxLength={80}
          placeholder={t('sermonTopicPlaceholder')}
          onChange={(event) => setTopic(event.target.value)}
        />
      </label>
      <label className="field">
        <span className="label">
          {t('sermonAudience')} <span className="hint">{t('optional')}</span>
        </span>
        <input
          type="text"
          value={audience}
          maxLength={80}
          placeholder={t('sermonAudiencePlaceholder')}
          onChange={(event) => setAudience(event.target.value)}
        />
      </label>
      <div className="sermon-depth-options" role="radiogroup" aria-label={t('sermonDepth')}>
        <button
          type="button"
          role="radio"
          className={
            depth === 'short'
              ? 'button button-ghost sermon-depth-toggle is-selected'
              : 'button button-ghost sermon-depth-toggle'
          }
          aria-checked={depth === 'short'}
          aria-pressed={depth === 'short'}
          onClick={() => setDepth('short')}
        >
          {t('sermonDepthShort')}
          {depth === 'short' ? (
            <span className="sermon-depth-check" aria-hidden="true">
              ✓
            </span>
          ) : null}
        </button>
        <button
          type="button"
          role="radio"
          className={
            depth === 'full'
              ? 'button button-ghost sermon-depth-toggle is-selected'
              : 'button button-ghost sermon-depth-toggle'
          }
          aria-checked={depth === 'full'}
          aria-pressed={depth === 'full'}
          onClick={() => setDepth('full')}
        >
          {t('sermonDepth')}
          {depth === 'full' ? (
            <span className="sermon-depth-check" aria-hidden="true">
              ✓
            </span>
          ) : null}
        </button>
      </div>
      <button type="button" className="button" disabled={working} onClick={() => void generate()}>
        {working ? t('sermonWorking') : t('sermonGenerate')}
      </button>
      {error ? <p className="field-note">{error}</p> : null}
      {handout ? (
        <article ref={sheetRef} className="sermon-sheet">
          <div className="sermon-actions">
            <button type="button" className="button" onClick={downloadHandout}>
              {t('sermonDownload')}
            </button>
            <button type="button" className="button button-ghost" onClick={() => void copyHandout()}>
              {t('sermonCopy')}
            </button>
            <button type="button" className="button button-ghost" onClick={() => void shareHandout()}>
              {t('sermonShare')}
            </button>
            <button
              type="button"
              className="button button-ghost"
              aria-pressed={presenting}
              onClick={() => void present()}
            >
              {presenting ? t('sermonClose') : t('sermonPresent')}
            </button>
          </div>
          <div
            ref={boardRef}
            className={fallback ? 'sermon-board is-fallback' : 'sermon-board'}
            role="region"
            aria-label={t('sermonBoard')}
          >
            <div className="sermon-present-bar">
              <button type="button" className="button button-ghost button-small" onClick={() => void present()}>
                {t('sermonClose')}
              </button>
            </div>
            <p className="sermon-rotate">{t('sermonRotate')}</p>
            {ORDER.map((language) =>
              handout.depth === 'full' ? (
                <FullColumn
                  key={language}
                  language={language}
                  block={handout.blocks[language]}
                  labels={sectionLabels}
                />
              ) : (
                <ShortColumn key={language} language={language} block={handout.blocks[language]} />
              ),
            )}
          </div>
          {notice ? (
            <p className="field-note" role="status">
              {notice}
            </p>
          ) : null}
          <p className="field-note">{t('sermonSource')}</p>
        </article>
      ) : null}
    </div>
  )
}
