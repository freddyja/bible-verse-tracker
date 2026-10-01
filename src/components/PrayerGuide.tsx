import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { anthropicKeyPresent, buildPrayerGuide } from '../prayer/build'
import { guidePlainText } from '../prayer/plain'
import { TEMPLATES } from '../prayer/templates'
import type { PrayerGuideCard } from '../prayer/types'

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // Fall through to execCommand.
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

export function PrayerGuide() {
  const { language, t } = useLanguage()
  const sheetRef = useRef<HTMLElement>(null)
  const [topic, setTopic] = useState('')
  const [guide, setGuide] = useState<PrayerGuideCard | null>(null)
  const [working, setWorking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const hasKey = anthropicKeyPresent()

  async function generate(nextTopic?: string) {
    const clean = (nextTopic ?? topic).trim()
    if (!clean) {
      setError(t('prayerTopicRequired'))
      setGuide(null)
      return
    }
    setTopic(clean)
    setWorking(true)
    setError(null)
    setNotice(null)
    try {
      const result = await buildPrayerGuide(clean, language)
      if (result.kind === 'no-key') {
        setGuide(null)
        setError(t('prayerCustomUnavailable'))
        return
      }
      if (result.kind === 'error') {
        setGuide(null)
        setError(result.message === 'empty' ? t('prayerTopicRequired') : t('prayerFailed'))
        return
      }
      setGuide(result.guide)
    } finally {
      setWorking(false)
    }
  }

  async function copyGuide() {
    if (!guide) return
    const ok = await copyText(guidePlainText(guide))
    setNotice(ok ? t('prayerCopied') : t('prayerCopyFailed'))
  }

  async function shareGuide() {
    if (!guide) return
    const text = guidePlainText(guide)
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: t('prayerShareTitle'), text })
        return
      } catch (shareError) {
        if (shareError instanceof DOMException && shareError.name === 'AbortError') return
      }
    }
    await copyGuide()
  }

  useEffect(() => {
    if (!guide) return
    sheetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [guide])

  return (
    <div className="editor prayer-guide">
      <p className="field-note">{t('prayerLead')}</p>
      <div className="prayer-chips" role="list">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            className="button button-ghost button-small prayer-chip"
            role="listitem"
            onClick={() => void generate(template.chip[language])}
          >
            {template.chip[language]}
          </button>
        ))}
      </div>
      <label className="field">
        <span className="label">{t('prayerTopic')}</span>
        <input
          type="text"
          value={topic}
          maxLength={80}
          placeholder={t('prayerTopicPlaceholder')}
          onChange={(event) => setTopic(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              void generate()
            }
          }}
        />
      </label>
      {!hasKey ? <p className="field-note">{t('prayerCustomHint')}</p> : null}
      <button type="button" className="button" disabled={working} onClick={() => void generate()}>
        {working ? t('prayerWorking') : t('prayerGenerate')}
      </button>
      {error ? <p className="field-note">{error}</p> : null}
      {guide ? (
        <article ref={sheetRef} className="prayer-sheet">
          <div className="prayer-actions">
            <button type="button" className="button button-ghost" onClick={() => void copyGuide()}>
              {t('prayerCopy')}
            </button>
            <button type="button" className="button button-ghost" onClick={() => void shareGuide()}>
              {t('prayerShare')}
            </button>
          </div>
          <div className="prayer-card" lang={language}>
            <header className="prayer-card-head">
              <p className="prayer-title-how">{guide.titleHow}</p>
              <h2 className="prayer-title-for">{guide.titleFor}</h2>
              <div className="prayer-tagline-wrap">
                <p className="prayer-tagline">{guide.tagline}</p>
              </div>
            </header>
            <div className="prayer-grid">
              {guide.items.map((item) => (
                <section key={item.n} className="prayer-item">
                  <p className="prayer-num">{String(item.n).padStart(2, '0')}</p>
                  <h3 className="prayer-heading">{item.heading}</h3>
                  <p className="prayer-text">{item.prayer}</p>
                  <p className="prayer-ref">{item.ref}</p>
                </section>
              ))}
            </div>
            <footer className="prayer-footer">
              <p className="prayer-footer-text">{guide.footer.prayer}</p>
              <p className="prayer-ref">{guide.footer.ref}</p>
            </footer>
            <p className="prayer-credit">{t('prayerCredit')}</p>
          </div>
          {notice ? (
            <p className="field-note" role="status">
              {notice}
            </p>
          ) : null}
        </article>
      ) : null}
    </div>
  )
}
