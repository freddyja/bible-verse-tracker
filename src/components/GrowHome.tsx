import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  CORNERSTONES,
  FACTS,
  PRACTICES,
  PUZZLES,
  TRIVIA,
  forToday,
  pickCopy,
  type Cornerstone,
} from '../grow/content'
import { FruitBoard, FruitDetail, type FruitShelf } from './FruitPath'
import { fruitById, fruitLabel, FRUITS } from '../grow/fruit'
import { useGrow } from '../hooks/useGrow'
import type { Language, MessageKey } from '../i18n/messages'
import { useLanguage } from '../i18n/useLanguage'
import { BOOKS } from '../scripture/books'
import { dailyVerse, localDayNumber } from '../scripture/daily'
import { loadVerse } from '../scripture/api'
import { formatPassage } from '../scripture/passages'

export type GrowNested = {
  active: boolean
  title: string
  back: () => void
}

type GrowHomeProps = {
  versionId: string
  shelf: FruitShelf
  onOpenPassage: (bookIndex: number, chapter: number, verse: number) => void
  onNestedChange: (nested: GrowNested) => void
}

type Segment = 'planning' | 'practice'

type Place =
  | { kind: 'home' }
  | { kind: 'practice' }
  | { kind: 'cornerstones' }
  | { kind: 'cornerstone'; id: string }
  | { kind: 'gratitude' }
  | { kind: 'trivia' }
  | { kind: 'game' }
  | { kind: 'fact' }
  | { kind: 'pray' }
  | { kind: 'encourage' }
  | { kind: 'purpose' }
  | { kind: 'goals' }
  | { kind: 'habits' }
  | { kind: 'fruit'; id: string }

function Glyph({ name }: { name: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  return (
    <svg className="grow-glyph" viewBox="0 0 24 24" aria-hidden="true">
      {name === 'walk' ? (
        <>
          <circle cx="14" cy="5" r="1.4" {...common} />
          <path d="M8 21l2.2-6.2L8 11.5 11 9l3 1.2 1.6 3.2" {...common} />
          <path d="M13.2 10.2L16 8.2" {...common} />
        </>
      ) : null}
      {name === 'temple' ? <path d="M4 20h16M6 20V10l6-5 6 5v10M10 20v-5h4v5" {...common} /> : null}
      {name === 'book' ? <path d="M6 5.5h5.2A2.8 2.8 0 0 1 14 8.3V19a2.2 2.2 0 0 0-2.2-2.2H6V5.5zM18 5.5h-5.2A2.8 2.8 0 0 0 10 8.3V19a2.2 2.2 0 0 1 2.2-2.2H18V5.5z" {...common} /> : null}
      {name === 'gear' ? (
        <>
          <circle cx="12" cy="12" r="3" {...common} />
          <path d="M12 4.5v2.2M12 17.3V19.5M4.5 12h2.2M17.3 12H19.5M6.7 6.7l1.6 1.6M15.7 15.7l1.6 1.6M17.3 6.7l-1.6 1.6M8.3 15.7l-1.6 1.6" {...common} />
        </>
      ) : null}
      {name === 'puzzle' ? <path d="M8 8h3.2a1.6 1.6 0 1 0 0-3.2H8V8zm0 0v8h8v-3.2a1.6 1.6 0 1 1 3.2 0V16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2" {...common} /> : null}
      {name === 'bulb' ? (
        <>
          <path d="M9 16.5h6M10 19h4" {...common} />
          <path d="M8.5 11a3.5 3.5 0 1 1 7 0c0 1.4-.7 2.3-1.5 3.1-.5.5-.8 1-.8 1.6h-2.4c0-.6-.3-1.1-.8-1.6-.8-.8-1.5-1.7-1.5-3.1z" {...common} />
        </>
      ) : null}
      {name === 'flame' ? <path d="M12 20c3.2 0 5-2.2 5-5.1 0-2.6-1.8-4.2-2.8-5.6-.4 1.3-1.1 1.8-1.7 1.8.2-2.2-.6-4.2-2.5-6.1 0 2.4-2.2 4.2-3.2 6.2C5.6 13.2 7 20 12 20z" {...common} /> : null}
      {name === 'target' ? (
        <>
          <circle cx="12" cy="12" r="7" {...common} />
          <circle cx="12" cy="12" r="3" {...common} />
          <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {name === 'cycle' ? <path d="M7 8.5A6.5 6.5 0 0 1 17.2 7M17 15.5A6.5 6.5 0 0 1 6.8 17" {...common} /> : null}
      {name === 'hands' ? <path d="M8 13V7.5a1.3 1.3 0 0 1 2.6 0V12M10.6 11.2V6.8a1.3 1.3 0 0 1 2.6 0V12M13.2 11.5V8.2a1.3 1.3 0 0 1 2.6 0V14c0 3-1.6 5-4.2 5-2.2 0-3.6-1.2-4.4-2.6L6 14.2a1.4 1.4 0 0 1 2.2-1.6L8 13" {...common} /> : null}
      {name === 'heart' ? <path d="M12 19s-6.2-3.8-6.2-8A3.4 3.4 0 0 1 12 8.6 3.4 3.4 0 0 1 18.2 11C18.2 15.2 12 19 12 19z" {...common} /> : null}
    </svg>
  )
}

function Row({
  icon,
  title,
  hint,
  badge,
  onClick,
}: {
  icon: string
  title: string
  hint: string
  badge?: string
  onClick: () => void
}) {
  return (
    <li>
      <button type="button" className="grow-row" onClick={onClick}>
        <span className="grow-ico">
          <Glyph name={icon} />
        </span>
        <span className="grow-row-copy">
          <strong>{title}</strong>
          <p>{hint}</p>
        </span>
        {badge ? <span className="grow-badge">{badge}</span> : null}
        <span className="grow-chevron" aria-hidden="true">
          ›
        </span>
      </button>
    </li>
  )
}

function Detail({ children }: { children: ReactNode }) {
  return <div className="grow-detail">{children}</div>
}

function composePurpose(language: string, who: string, love: string, serve: string): string {
  const w = who.trim()
  const l = love.trim()
  const s = serve.trim()
  if (language === 'es') return `Ante Dios, soy ${w}. Se me ha dado amar a ${l}. Este año espero servir así: ${s}.`
  if (language === 'pt') return `Diante de Deus, eu sou ${w}. Recebi para amar ${l}. Neste ano espero servir assim: ${s}.`
  return `Before God, I am ${w}. I am given to love ${l}. This year I hope to serve by ${s}.`
}

function placeTitle(place: Place, language: Language, t: (key: MessageKey) => string): string {
  if (place.kind === 'practice') return t('growTodayPractice')
  if (place.kind === 'cornerstones') return t('growCornerstones')
  if (place.kind === 'cornerstone') {
    const item = CORNERSTONES.find((entry) => entry.id === place.id) ?? CORNERSTONES[0]
    return pickCopy(language, item.title)
  }
  if (place.kind === 'gratitude') return t('growGratitude')
  if (place.kind === 'trivia') return t('growTrivia')
  if (place.kind === 'game') return t('growGame')
  if (place.kind === 'fact') return t('growFact')
  if (place.kind === 'pray') return t('growPray')
  if (place.kind === 'encourage') return t('growEncourage')
  if (place.kind === 'purpose') return t('growPurposeTitle')
  if (place.kind === 'goals') return t('growGoals')
  if (place.kind === 'habits') return t('growHabits')
  if (place.kind === 'fruit') return fruitLabel(language, fruitById(place.id) ?? FRUITS[0])
  return t('navGrow')
}

export function GrowHome({ versionId, shelf, onOpenPassage, onNestedChange }: GrowHomeProps) {
  const { language, t } = useLanguage()
  const grow = useGrow()
  const [segment, setSegment] = useState<Segment>('practice')
  const [place, setPlace] = useState<Place>({ kind: 'home' })
  const onNestedChangeRef = useRef(onNestedChange)
  const day = localDayNumber()
  const practice = forToday(PRACTICES)
  const fact = forToday(FACTS)
  const practiceDone = grow.store.practiceDoneDay === day

  useEffect(() => {
    onNestedChangeRef.current = onNestedChange
  }, [onNestedChange])

  const back = useCallback(() => {
    setPlace((current) => (current.kind === 'cornerstone' ? { kind: 'cornerstones' } : { kind: 'home' }))
  }, [])

  useEffect(() => {
    onNestedChangeRef.current({
      active: place.kind !== 'home',
      title: placeTitle(place, language, t),
      back,
    })
  }, [place, language, t, back])

  useEffect(() => {
    return () => onNestedChangeRef.current({ active: false, title: '', back: () => {} })
  }, [])

  if (place.kind === 'practice') {
    return (
      <Detail>
        <article className="gold-card grow-panel">
          <h3>{pickCopy(language, practice.title)}</h3>
          <p>{pickCopy(language, practice.body)}</p>
          <button
            type="button"
            className={practiceDone ? 'button button-ghost' : 'button button-block'}
            onClick={() => grow.setPracticeDone(day, !practiceDone)}
          >
            {practiceDone ? t('growDoneToday') : t('growMarkDone')}
          </button>
        </article>
      </Detail>
    )
  }

  if (place.kind === 'cornerstones') {
    return (
      <Detail>
        <p className="grow-note">{t('growCornerLead')}</p>
        <ul className="grow-list">
          {CORNERSTONES.map((item) => (
            <Row
              key={item.id}
              icon="temple"
              title={pickCopy(language, item.title)}
              hint={pickCopy(language, item.body)}
              onClick={() => setPlace({ kind: 'cornerstone', id: item.id })}
            />
          ))}
        </ul>
      </Detail>
    )
  }

  if (place.kind === 'cornerstone') {
    const item = CORNERSTONES.find((entry) => entry.id === place.id) ?? CORNERSTONES[0]
    return <CornerstoneDetail item={item!} />
  }

  if (place.kind === 'gratitude') {
    return (
      <Detail>
        <GratitudeJournal />
      </Detail>
    )
  }

  if (place.kind === 'trivia') {
    return (
      <Detail>
        <TriviaCard />
      </Detail>
    )
  }

  if (place.kind === 'game') {
    return (
      <Detail>
        <GameCard onOpenPassage={onOpenPassage} />
      </Detail>
    )
  }

  if (place.kind === 'fact') {
    return (
      <Detail>
        <article className="gold-card grow-panel">
          <p className="grow-verse">{pickCopy(language, fact)}</p>
        </article>
        <ul className="grow-facts">
          {FACTS.filter((item) => item !== fact).slice(0, 3).map((item) => (
            <li key={item.en}>{pickCopy(language, item)}</li>
          ))}
        </ul>
      </Detail>
    )
  }

  if (place.kind === 'pray' || place.kind === 'encourage') {
    return (
      <Detail>
        <DailyVerseUse
          mode={place.kind}
          versionId={versionId}
          onOpenPassage={onOpenPassage}
        />
      </Detail>
    )
  }

  if (place.kind === 'purpose') {
    return (
      <Detail>
        <PurposeForm />
      </Detail>
    )
  }

  if (place.kind === 'goals') {
    return (
      <Detail>
        <GoalsList />
      </Detail>
    )
  }

  if (place.kind === 'habits') {
    return (
      <Detail>
        <HabitsForm />
      </Detail>
    )
  }

  if (place.kind === 'fruit') {
    return <FruitDetail fruitId={place.id} versionId={versionId} shelf={shelf} onOpenPassage={onOpenPassage} />
  }

  return (
    <div className="grow">
      <div className="grow-switch" role="tablist" aria-label={t('navGrow')}>
        <button type="button" role="tab" aria-selected={segment === 'planning'} onClick={() => setSegment('planning')}>
          {t('growPlanning')}
        </button>
        <button type="button" role="tab" aria-selected={segment === 'practice'} onClick={() => setSegment('practice')}>
          {t('growPractice')}
        </button>
      </div>

      {segment === 'practice' ? (
        <>
          <FruitBoard onOpen={(id) => setPlace({ kind: 'fruit', id })} />
          <p className="grow-kicker">{t('growLive')}</p>
          <p className="grow-lead">{t('growLiveLead')}</p>
          <ul className="grow-list">
            <Row
              icon="walk"
              title={t('growTodayPractice')}
              hint={pickCopy(language, practice.title)}
              badge={practiceDone ? t('growDoneToday') : undefined}
              onClick={() => setPlace({ kind: 'practice' })}
            />
            <Row
              icon="temple"
              title={t('growCornerstones')}
              hint={t('growCornerstonesHint')}
              onClick={() => setPlace({ kind: 'cornerstones' })}
            />
            <Row
              icon="book"
              title={t('growGratitude')}
              hint={t('growGratitudeHint')}
              onClick={() => setPlace({ kind: 'gratitude' })}
            />
          </ul>
          <p className="grow-kicker">{t('growLearn')}</p>
          <p className="grow-lead">{t('growLearnLead')}</p>
          <ul className="grow-list">
            <Row icon="gear" title={t('growTrivia')} hint={t('growTriviaHint')} onClick={() => setPlace({ kind: 'trivia' })} />
            <Row icon="puzzle" title={t('growGame')} hint={t('growGameHint')} onClick={() => setPlace({ kind: 'game' })} />
            <Row icon="bulb" title={t('growFact')} hint={t('growFactHint')} onClick={() => setPlace({ kind: 'fact' })} />
          </ul>
          <p className="grow-kicker">{t('growLift')}</p>
          <p className="grow-lead">{t('growLiftLead')}</p>
          <ul className="grow-list">
            <Row icon="hands" title={t('growPray')} hint={t('growPrayHint')} onClick={() => setPlace({ kind: 'pray' })} />
            <Row
              icon="heart"
              title={t('growEncourage')}
              hint={t('growEncourageHint')}
              onClick={() => setPlace({ kind: 'encourage' })}
            />
          </ul>
        </>
      ) : (
        <PlanningHome
          statement={grow.store.purposeStatement}
          onPurpose={() => setPlace({ kind: 'purpose' })}
          onGoals={() => setPlace({ kind: 'goals' })}
          onHabits={() => setPlace({ kind: 'habits' })}
        />
      )}
    </div>
  )
}

function CornerstoneDetail({ item }: { item: Cornerstone }) {
  const { language } = useLanguage()
  return (
    <Detail>
      <article className="gold-card grow-panel">
        <p>{pickCopy(language, item.body)}</p>
        {item.source && pickCopy(language, item.source) ? (
          <p className="grow-source">{pickCopy(language, item.source)}</p>
        ) : null}
      </article>
    </Detail>
  )
}

function GratitudeJournal() {
  const { t, language } = useLanguage()
  const { store, addThanks, removeThanks } = useGrow()
  const [text, setText] = useState('')

  return (
    <>
      <form
        className="grow-add"
        onSubmit={(event) => {
          event.preventDefault()
          addThanks(text)
          setText('')
        }}
      >
        <label className="field">
          <span className="sr-only">{t('growGratitude')}</span>
          <input
            value={text}
            maxLength={280}
            placeholder={t('growThanksPlaceholder')}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <button type="submit" className="button" disabled={!text.trim()}>
          {t('growThanksAdd')}
        </button>
      </form>
      <p className="grow-note">{t('privacy')}</p>
      {store.gratitude.length === 0 ? <p className="empty">{t('growThanksEmpty')}</p> : null}
      <ul className="grow-entries">
        {store.gratitude.map((entry) => (
          <li key={entry.id}>
            <p>{entry.text}</p>
            <div className="grow-entry-meta">
              <time dateTime={new Date(entry.createdAt).toISOString()}>
                {new Date(entry.createdAt).toLocaleDateString(language)}
              </time>
              <button type="button" className="text-button" onClick={() => removeThanks(entry.id)}>
                {t('growThanksDelete')}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function TriviaCard() {
  const { language, t } = useLanguage()
  const { store, answerTrivia } = useGrow()
  const day = localDayNumber()
  const trivia = forToday(TRIVIA)
  const answered = store.triviaDay === day ? store.triviaChoice : null

  return (
    <article className="gold-card grow-panel">
      <h3>{pickCopy(language, trivia.prompt)}</h3>
      <div className="choice-list">
        {trivia.choices.map((choice, index) => {
          const selected = answered === index
          const right = answered !== null && index === trivia.answer
          const wrong = selected && index !== trivia.answer
          return (
            <button
              key={choice.en}
              type="button"
              className={right ? 'choice is-right' : wrong ? 'choice is-wrong' : 'choice'}
              disabled={answered !== null}
              onClick={() => answerTrivia(day, index)}
            >
              {pickCopy(language, choice)}
            </button>
          )
        })}
      </div>
      {answered !== null ? (
        <p className="grow-result">
          <strong>{answered === trivia.answer ? t('growTriviaCorrect') : t('growTriviaWrong')}</strong>{' '}
          {pickCopy(language, trivia.why)}
        </p>
      ) : null}
    </article>
  )
}

function GameCard({ onOpenPassage }: { onOpenPassage: GrowHomeProps['onOpenPassage'] }) {
  const { language, t } = useLanguage()
  const { store, answerGame } = useGrow()
  const day = localDayNumber()
  const puzzle = forToday(PUZZLES)
  const answered = store.gameDay === day ? store.gameChoice : null
  const bookIndex = BOOKS.findIndex((book) => book.id === puzzle.bookId)
  const reference = bookIndex >= 0 ? formatPassage(language, { bookIndex, chapter: puzzle.chapter, verse: puzzle.verse }) : ''
  const showWord = answered !== null

  return (
    <article className="gold-card grow-panel">
      <p className="grow-note">{t('growGameLead')}</p>
      <p className="gap-line">
        {puzzle.before} <span className="gap-blank">{showWord ? puzzle.answer : '____'}</span>
        {/^[,.;:]/.test(puzzle.after) ? puzzle.after : ` ${puzzle.after}`}
      </p>
      <p className="grow-source">{reference}</p>
      <div className="choice-list">
        {puzzle.choices.map((choice, index) => {
          const selected = answered === index
          const right = showWord && choice === puzzle.answer
          const wrong = selected && choice !== puzzle.answer
          return (
            <button
              key={choice}
              type="button"
              className={right ? 'choice is-right' : wrong ? 'choice is-wrong' : 'choice'}
              disabled={answered !== null}
              onClick={() => answerGame(day, index)}
            >
              {choice}
            </button>
          )
        })}
      </div>
      {answered !== null ? (
        <p className="grow-result">
          <strong>{puzzle.choices[answered] === puzzle.answer ? t('growGameRight') : t('growGameWrong')}</strong>
        </p>
      ) : null}
      {bookIndex >= 0 ? (
        <button type="button" className="button button-ghost" onClick={() => onOpenPassage(bookIndex, puzzle.chapter, puzzle.verse)}>
          {t('growOpenVerse')}
        </button>
      ) : null}
    </article>
  )
}

function DailyVerseUse({
  mode,
  versionId,
  onOpenPassage,
}: {
  mode: 'pray' | 'encourage'
  versionId: string
  onOpenPassage: GrowHomeProps['onOpenPassage']
}) {
  const { language, t } = useLanguage()
  const passage = useMemo(() => dailyVerse(), [])
  const [text, setText] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const reference = formatPassage(language, passage)
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  useEffect(() => {
    let live = true
    void loadVerse(versionId, passage.bookIndex, passage.chapter, passage.verse).then((value) => {
      if (live) setText(value)
    })
    return () => {
      live = false
    }
  }, [passage, versionId])

  async function share() {
    if (!text || !navigator.share) return
    try {
      await navigator.share({ title: reference, text: `${text}\n\n${reference}` })
    } catch {
      // The person closed the share sheet.
    }
  }

  async function copy() {
    if (!text || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(`${text}\n\n${reference}`)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className="gold-card grow-panel">
      <p className="grow-note">{mode === 'pray' ? t('growPrayBody') : t('growEncourageBody')}</p>
      <p className="grow-verse">{text ?? '…'}</p>
      <p className="grow-source">{reference}</p>
      <div className="grow-actions">
        <button
          type="button"
          className="button"
          onClick={() => onOpenPassage(passage.bookIndex, passage.chapter, passage.verse)}
        >
          {t('growOpenVerse')}
        </button>
        {mode === 'encourage' && canShare ? (
          <button type="button" className="button button-ghost" disabled={!text} onClick={() => void share()}>
            {t('shareVerse')}
          </button>
        ) : null}
        {mode === 'encourage' ? (
          <button type="button" className="button button-ghost" disabled={!text} onClick={() => void copy()}>
            {copied ? t('growCopied') : t('growCopy')}
          </button>
        ) : null}
      </div>
    </article>
  )
}

function PlanningHome({
  statement,
  onPurpose,
  onGoals,
  onHabits,
}: {
  statement: string
  onPurpose: () => void
  onGoals: () => void
  onHabits: () => void
}) {
  const { t } = useLanguage()
  return (
    <div className="grow-plan">
      <article className="gold-card grow-hero">
        <div className="grow-hero-title">
          <span className="grow-ico">
            <Glyph name="flame" />
          </span>
          <h2>{t('growPurposeTitle')}</h2>
        </div>
        <p>{statement ? statement : t('growPurposeLead')}</p>
        <div className="grow-inset">
          <p>{statement ? t('growPurposeSaved') : t('growPurposeCard')}</p>
        </div>
        <button type="button" className="button button-block" onClick={onPurpose}>
          {statement ? t('growPurposeEdit') : t('growPurposeButton')}
        </button>
      </article>
      <ul className="grow-list">
        <Row icon="target" title={t('growGoals')} hint={t('growGoalsHint')} onClick={onGoals} />
        <Row icon="cycle" title={t('growHabits')} hint={t('growHabitsHint')} onClick={onHabits} />
      </ul>
    </div>
  )
}

function PurposeForm() {
  const { language, t } = useLanguage()
  const { store, savePurpose } = useGrow()
  const [who, setWho] = useState(store.purposeWho)
  const [love, setLove] = useState(store.purposeLove)
  const [serve, setServe] = useState(store.purposeServe)
  const [statement, setStatement] = useState(store.purposeStatement)
  const [saved, setSaved] = useState(false)
  const ready = who.trim() && love.trim() && serve.trim()

  return (
    <form
      className="grow-form"
      onSubmit={(event) => {
        event.preventDefault()
        if (!ready) return
        const nextStatement = statement.trim() || composePurpose(language, who, love, serve)
        setStatement(nextStatement)
        savePurpose({ who, love, serve, statement: nextStatement })
        setSaved(true)
      }}
    >
      <label className="field">
        <span>{t('growPurposeQ1')}</span>
        <textarea value={who} maxLength={400} rows={2} onChange={(event) => setWho(event.target.value)} />
      </label>
      <label className="field">
        <span>{t('growPurposeQ2')}</span>
        <textarea value={love} maxLength={400} rows={2} onChange={(event) => setLove(event.target.value)} />
      </label>
      <label className="field">
        <span>{t('growPurposeQ3')}</span>
        <textarea value={serve} maxLength={400} rows={2} onChange={(event) => setServe(event.target.value)} />
      </label>
      <button
        type="button"
        className="button button-ghost"
        disabled={!ready}
        onClick={() => setStatement(composePurpose(language, who, love, serve))}
      >
        {t('growPurposeShape')}
      </button>
      <label className="field">
        <span>{t('growPurposeStatement')}</span>
        <textarea value={statement} maxLength={800} rows={4} onChange={(event) => setStatement(event.target.value)} />
      </label>
      <button type="submit" className="button button-block" disabled={!ready}>
        {t('growPurposeSave')}
      </button>
      {saved ? <p className="grow-note">{t('growHabitSaved')}</p> : null}
    </form>
  )
}

function GoalsList() {
  const { t } = useLanguage()
  const { store, addGoal, toggleGoal, removeGoal } = useGrow()
  const [text, setText] = useState('')

  return (
    <>
      <p className="grow-note">{t('privacy')}</p>
      <form
        className="grow-add"
        onSubmit={(event) => {
          event.preventDefault()
          addGoal(text)
          setText('')
        }}
      >
        <label className="field">
          <span className="sr-only">{t('growGoals')}</span>
          <input
            value={text}
            maxLength={160}
            placeholder={t('growGoalPlaceholder')}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <button type="submit" className="button" disabled={!text.trim()}>
          {t('growGoalAdd')}
        </button>
      </form>
      {store.goals.length === 0 ? <p className="empty">{t('growNoGoals')}</p> : null}
      <ul className="grow-entries">
        {store.goals.map((goal) => (
          <li key={goal.id} className={goal.done ? 'goal-row is-done' : 'goal-row'}>
            <button
              type="button"
              className={goal.done ? 'check-orb is-on' : 'check-orb'}
              aria-pressed={goal.done}
              aria-label={goal.done ? t('growGoalUndone') : t('growGoalDone')}
              onClick={() => toggleGoal(goal.id)}
            >
              {goal.done ? '✓' : ''}
            </button>
            <p>{goal.text}</p>
            <button type="button" className="text-button" onClick={() => removeGoal(goal.id)}>
              {t('growThanksDelete')}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

function HabitsForm() {
  const { t } = useLanguage()
  const { store, saveHabits } = useGrow()
  const [keep, setKeep] = useState(store.habitKeep)
  const [release, setRelease] = useState(store.habitRelease)
  const [saved, setSaved] = useState(false)

  return (
    <form
      className="grow-form"
      onSubmit={(event) => {
        event.preventDefault()
        saveHabits(keep, release)
        setSaved(true)
      }}
    >
      <p className="grow-note">{t('growHabitsHint')}</p>
      <label className="field">
        <span>{t('growHabitKeep')}</span>
        <textarea
          value={keep}
          maxLength={240}
          rows={3}
          onChange={(event) => {
            setKeep(event.target.value)
            setSaved(false)
          }}
        />
      </label>
      <label className="field">
        <span>{t('growHabitRelease')}</span>
        <textarea
          value={release}
          maxLength={240}
          rows={3}
          onChange={(event) => {
            setRelease(event.target.value)
            setSaved(false)
          }}
        />
      </label>
      <button type="submit" className="button button-block">
        {t('growHabitSave')}
      </button>
      {saved ? <p className="grow-note">{t('growHabitSaved')}</p> : null}
      <p className="grow-note">{t('privacy')}</p>
    </form>
  )
}
