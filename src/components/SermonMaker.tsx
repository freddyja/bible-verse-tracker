import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { buildHandout } from '../sermon/build'
import { handoutDocx } from '../sermon/docx'
import { handoutFileName, handoutText } from '../sermon/plain'
import type { SermonHandout, SermonLang } from '../sermon/types'

const ORDER: readonly SermonLang[] = ['en', 'es', 'pt']

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
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')
  const [handout, setHandout] = useState<SermonHandout | null>(null)
  const [working, setWorking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

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
      setHandout(await buildHandout(clean, audience))
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
      <button type="button" className="button" disabled={working} onClick={() => void generate()}>
        {working ? t('sermonWorking') : t('sermonGenerate')}
      </button>
      {error ? <p className="field-note">{error}</p> : null}
      {handout ? (
        <article className="sermon-sheet">
          {ORDER.map((language) => {
            const block = handout.blocks[language]
            return (
              <section key={language} className="sermon-block" lang={language}>
                <h2 className="sermon-ref">{block.reference}</h2>
                <p className="sermon-quote">{block.quote}</p>
                <p className="sermon-punch">{block.punch}</p>
                <p>{block.context}</p>
                <p>{block.application}</p>
                <p>{block.challenge}</p>
                <p>{block.charge}</p>
                <h3 className="sermon-questions-label">{block.questionsLabel}</h3>
                <ol className="sermon-questions">
                  <li>{block.questions[0]}</li>
                  <li>{block.questions[1]}</li>
                </ol>
              </section>
            )
          })}
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
