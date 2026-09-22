import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { loadVerse } from '../scripture/api'
import { dailyPhoto, dailyVerse, greetingKey } from '../scripture/daily'
import { formatPassage } from '../scripture/passages'
import { versionById } from '../scripture/versions'

const READER_NAME = 'Freddy'

type VerseOfTheDayProps = {
  onOpen: (bookIndex: number, chapter: number, verse: number) => void
}

export function VerseOfTheDay({ onOpen }: VerseOfTheDayProps) {
  const { language, versionId, t } = useLanguage()
  const now = new Date()
  const passage = dailyVerse(now)
  const photo = `${import.meta.env.BASE_URL}votd/${dailyPhoto(now)}`
  const abbr = versionById(versionId)?.abbr ?? ''
  const reference = formatPassage(language, passage)
  const [text, setText] = useState('')

  useEffect(() => {
    let cancelled = false
    loadVerse(versionId, passage.bookIndex, passage.chapter, passage.verse)
      .then((next) => {
        if (!cancelled) setText(next?.trim() ?? '')
      })
      .catch(() => {
        if (!cancelled) setText('')
      })
    return () => {
      cancelled = true
    }
  }, [versionId, passage.bookIndex, passage.chapter, passage.verse])

  const verseSize = text.length > 220 ? '1.22rem' : text.length > 140 ? '1.38rem' : '1.62rem'

  return (
    <section className="votd">
      <p className="votd-greeting">{t(greetingKey(now), { name: READER_NAME })}</p>
      <button
        type="button"
        className="votd-card"
        style={{ ['--votd-photo' as string]: `url("${photo}")` }}
        onClick={() => onOpen(passage.bookIndex, passage.chapter, passage.verse)}
      >
        <span className="votd-kicker">{t('verseOfTheDay')}</span>
        <span className="votd-ref">
          {reference} {abbr}
        </span>
        <span className="votd-text" style={{ fontSize: verseSize }}>
          {text}
        </span>
      </button>
    </section>
  )
}
