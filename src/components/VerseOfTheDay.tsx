import { useEffect, useState } from 'react'
import type { Language } from '../i18n/messages'
import { useLanguage } from '../i18n/useLanguage'
import { loadVerse } from '../scripture/api'
import { dailyPhoto, dailyVerse, daysAgo, greetingKey } from '../scripture/daily'
import { formatPassage } from '../scripture/passages'
import { versionById } from '../scripture/versions'
import { ScriptureText } from './ScriptureText'

const READER_NAME = 'Freddy'
const PAST_PAGE = 12
const PAST_LIMIT = 90

function dateLabel(language: Language, offset: number, date: Date, yesterday: string): string {
  if (offset === 1) return yesterday
  return new Intl.DateTimeFormat(language, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

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
  const [pastOpen, setPastOpen] = useState(false)
  const [pastCount, setPastCount] = useState(PAST_PAGE)
  const [pastText, setPastText] = useState<Record<number, string>>({})

  useEffect(() => {
    if (!pastOpen) return
    let cancelled = false
    const today = new Date()
    const jobs = Array.from({ length: pastCount }, (_, index) => {
      const offset = index + 1
      const day = daysAgo(offset, today)
      const pick = dailyVerse(day)
      return loadVerse(versionId, pick.bookIndex, pick.chapter, pick.verse).then((next) => ({
        offset,
        text: next?.trim() ?? '',
      }))
    })
    Promise.all(jobs)
      .then((loaded) => {
        if (cancelled) return
        const next: Record<number, string> = {}
        for (const row of loaded) next[row.offset] = row.text
        setPastText(next)
      })
      .catch(() => {
        if (!cancelled) setPastText({})
      })
    return () => {
      cancelled = true
    }
  }, [pastOpen, pastCount, versionId])

  const today = new Date()
  const pastDays = Array.from({ length: pastCount }, (_, index) => {
    const offset = index + 1
    const date = daysAgo(offset, today)
    const pick = dailyVerse(date)
    return { offset, date, pick }
  })

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
          <ScriptureText bookIndex={passage.bookIndex} chapter={passage.chapter} verse={passage.verse} text={text} />
        </span>
      </button>
      <div className="votd-past">
        <button
          type="button"
          className="button button-ghost votd-past-toggle"
          aria-expanded={pastOpen}
          onClick={() => setPastOpen((open) => !open)}
        >
          {pastOpen ? t('hidePastVerses') : t('pastVerses')}
        </button>
        {pastOpen ? (
          <>
            <ul className="votd-history" aria-label={t('pastVerses')}>
              {pastDays.map(({ offset, date, pick }) => {
                const body = pastText[offset] ?? ''
                return (
                  <li key={offset}>
                    <button
                      type="button"
                      className="votd-past-row"
                      onClick={() => onOpen(pick.bookIndex, pick.chapter, pick.verse)}
                    >
                      <span
                        className="votd-thumb"
                        style={{
                          backgroundImage: `url("${import.meta.env.BASE_URL}votd/${dailyPhoto(date)}")`,
                        }}
                        aria-hidden="true"
                      />
                      <span className="votd-past-copy">
                        <span className="votd-past-date">
                          {dateLabel(language, offset, date, t('yesterday'))}
                        </span>
                        <span className="votd-past-ref">
                          {formatPassage(language, pick)} {abbr}
                        </span>
                        <ScriptureText
                          bookIndex={pick.bookIndex}
                          chapter={pick.chapter}
                          verse={pick.verse}
                          text={body}
                          className="votd-past-snippet"
                          limit={120}
                        />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            {pastCount < PAST_LIMIT ? (
              <button
                type="button"
                className="text-button votd-earlier"
                onClick={() => setPastCount((count) => Math.min(PAST_LIMIT, count + PAST_PAGE))}
              >
                {t('earlierDays')}
              </button>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}
