import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'

/** Public app address people can pass on. */
const APP_SHARE_URL = 'https://freddyja.github.io/bible-verse-tracker/'

function ShareIcon() {
  return (
    <svg className="gear-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 13.5V4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8.4 7.4 12 3.8l3.6 3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.2 10.5H6.2A1.7 1.7 0 0 0 4.5 12.2v6.1A1.7 1.7 0 0 0 6.2 20h11.6a1.7 1.7 0 0 0 1.7-1.7v-6.1a1.7 1.7 0 0 0-1.7-1.7h-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

async function copyLink(url: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
      return true
    }
  } catch {
    // A browser can refuse the async clipboard and still allow the older copy.
  }
  try {
    const field = document.createElement('textarea')
    field.value = url
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

export function ShareAppButton() {
  const { t } = useLanguage()
  const [notice, setNotice] = useState<string | null>(null)
  const timer = useRef(0)

  useEffect(() => {
    return () => window.clearTimeout(timer.current)
  }, [])

  function flash(message: string) {
    setNotice(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setNotice(null), 2200)
  }

  async function shareApp() {
    const title = t('shareAppTitle')
    const text = t('shareAppText')
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url: APP_SHARE_URL })
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
      }
    }
    const copied = await copyLink(APP_SHARE_URL)
    flash(copied ? t('shareAppCopied') : t('shareAppFailed'))
  }

  return (
    <>
      <button
        type="button"
        className="icon-button"
        aria-label={t('shareApp')}
        title={t('shareApp')}
        onClick={() => void shareApp()}
      >
        <ShareIcon />
      </button>
      {notice ? (
        <p className="share-toast" role="status">
          {notice}
        </p>
      ) : null}
    </>
  )
}
