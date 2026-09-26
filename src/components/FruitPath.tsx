import { useEffect, useState } from 'react'
import { verseForPassage } from '../data/matchVerse'
import { findCategoryByTypedName } from '../data/categoryLabel'
import type { Category, Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { pickCopy } from '../grow/content'
import { fruitById, fruitLabel, fruitRefs, FRUITS, type Fruit } from '../grow/fruit'
import { messages } from '../i18n/messages'
import { useLanguage } from '../i18n/useLanguage'
import { loadVerse } from '../scripture/api'
import { formatPassage, type PassageRef } from '../scripture/passages'
import { ShelfSave, type ShelfDraft } from './ShelfSave'

export type FruitShelf = {
  verses: readonly Verse[]
  categories: Category[]
  ready: boolean
  onSaveVerse: (draft: VerseDraft, id: string | undefined, voice: VoiceNoteUpdate) => Promise<void>
  onCreateCategory: (name: string) => Promise<Category>
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function FruitGlyph({ name }: { name: string }) {
  return (
    <svg className="grow-glyph" viewBox="0 0 24 24" aria-hidden="true">
      {name === 'heart' ? (
        <path d="M12 19s-6.2-3.8-6.2-8A3.4 3.4 0 0 1 12 8.6 3.4 3.4 0 0 1 18.2 11C18.2 15.2 12 19 12 19z" {...stroke} />
      ) : null}
      {name === 'joy' ? (
        <>
          <circle cx="12" cy="12" r="7" {...stroke} />
          <path d="M8.5 13.2c.8 1.4 2 2.1 3.5 2.1s2.7-.7 3.5-2.1" {...stroke} />
          <circle cx="9.2" cy="10" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="14.8" cy="10" r="0.7" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {name === 'dove' ? (
        <>
          <path d="M4.5 13.2c2.8-.8 4.4-2.8 5.8-4.8 1.2 2 3 3.2 6.2 3.6-2 .3-3.4 1.5-4.2 3.2" {...stroke} />
          <path d="M10.2 8.4c1.5-1.6 3.4-2.4 5.8-2.2" {...stroke} />
        </>
      ) : null}
      {name === 'hourglass' ? (
        <path d="M7 5h10M7 19h10M8 5c0 3.8 3 5 4 7-.9 1.8-4 3.1-4 7M16 5c0 3.8-3 5-4 7 .9 1.8 4 3.1 4 7" {...stroke} />
      ) : null}
      {name === 'hand' ? (
        <path
          d="M8 12.6V7.4a1.2 1.2 0 0 1 2.4 0V12M10.4 11V6.6a1.2 1.2 0 0 1 2.4 0V12M12.8 11.4V8a1.2 1.2 0 0 1 2.4 0v6.1c0 2.5-1.4 4.2-3.8 4.2-1.9 0-3.1-1-3.9-2.2l-1.2-2.4a1.3 1.3 0 0 1 2-1.4L8 12.6"
          {...stroke}
        />
      ) : null}
      {name === 'leaf' ? (
        <>
          <path d="M6 16.2C8 10 12 7 18 6c-1 6-4.2 10-10.2 12" {...stroke} />
          <path d="M8.6 14.6c2-2 4.2-3.4 6.6-4.2" {...stroke} />
        </>
      ) : null}
      {name === 'shield' ? (
        <path d="M12 4.5 18.2 7v5.2c0 3.4-2.4 5.8-6.2 7.3-3.8-1.5-6.2-3.9-6.2-7.3V7L12 4.5z" {...stroke} />
      ) : null}
      {name === 'lamb' ? (
        <>
          <ellipse cx="12" cy="14.2" rx="5" ry="3.2" {...stroke} />
          <circle cx="9" cy="10.4" r="1.5" {...stroke} />
          <circle cx="12" cy="9.3" r="1.6" {...stroke} />
          <circle cx="15" cy="10.4" r="1.5" {...stroke} />
          <path d="M9.4 16.8v1.8M14.6 16.8v1.8" {...stroke} />
        </>
      ) : null}
      {name === 'crown' ? <path d="M5 16.8h14M6.2 16.8 7.4 8.8 12 13.2l4.6-4.4 1.2 8" {...stroke} /> : null}
    </svg>
  )
}

function fruitCategoryId(categories: readonly Category[], fruit: Fruit): string | null {
  const byId = categories.find((category) => category.id === fruit.categoryId)
  if (byId) return byId.id
  const byName = findCategoryByTypedName(categories, messages.en[fruit.labelKey])
  return byName?.id ?? null
}

export function FruitBoard({ onOpen }: { onOpen: (id: string) => void }) {
  const { language, t } = useLanguage()
  return (
    <section className="fruit-section" aria-labelledby="fruit-heading">
      <h2 id="fruit-heading" className="grow-kicker fruit-kicker">
        {t('growFruit')}
      </h2>
      <p className="grow-lead">{t('growFruitHint')}</p>
      <ul className="fruit-grid">
        {FRUITS.map((fruit) => (
          <li key={fruit.id}>
            <button type="button" className="fruit-card" onClick={() => onOpen(fruit.id)}>
              <span className="fruit-glyph">
                <FruitGlyph name={fruit.glyph} />
              </span>
              <strong>{fruitLabel(language, fruit)}</strong>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function FruitDetail({
  fruitId,
  versionId,
  shelf,
  onOpenPassage,
}: {
  fruitId: string
  versionId: string
  shelf: FruitShelf
  onOpenPassage: (bookIndex: number, chapter: number, verse: number) => void
}) {
  const { language, t } = useLanguage()
  const fruit = fruitById(fruitId) ?? FRUITS[0]
  const refs = fruitRefs(fruit)
  const anchors = fruit.passages.flatMap((passage, index) => (passage.anchor ? [refs[index]] : []))
  const rest = fruit.passages.flatMap((passage, index) => (passage.anchor ? [] : [refs[index]]))
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [openKey, setOpenKey] = useState<string | null>(null)

  useEffect(() => {
    let live = true
    const nextRefs = fruitRefs(fruit)
    void Promise.all(
      nextRefs.map(async (ref) => {
        const text = await loadVerse(versionId, ref.bookIndex, ref.chapter, ref.verse)
        return [passageKey(ref), text] as const
      }),
    ).then((rows) => {
      if (!live) return
      const next: Record<string, string> = {}
      for (const [key, text] of rows) {
        if (text) next[key] = text
      }
      setTexts(next)
    })
    return () => {
      live = false
    }
  }, [fruit, versionId])

  const categoryId = fruitCategoryId(shelf.categories, fruit)

  return (
    <div className="grow-detail fruit-detail">
      <p className="grow-note">{t('growFruitLead')}</p>
      <h3 className="grow-kicker fruit-kicker">{t('growFruitScripture')}</h3>
      <FruitVerses
        refs={anchors.filter((ref): ref is PassageRef => ref !== undefined)}
        texts={texts}
        openKey={openKey}
        shelf={shelf}
        categoryId={categoryId}
        onOpenKey={setOpenKey}
        onOpenPassage={onOpenPassage}
      />
      <h3 className="grow-kicker fruit-kicker">{t('growFruitAlso')}</h3>
      <FruitVerses
        refs={rest.filter((ref): ref is PassageRef => ref !== undefined)}
        texts={texts}
        openKey={openKey}
        shelf={shelf}
        categoryId={categoryId}
        onOpenKey={setOpenKey}
        onOpenPassage={onOpenPassage}
      />
      <h3 className="grow-kicker fruit-kicker">{t('growPractice')}</h3>
      <ul className="fruit-practice">
        {fruit.practice.map((line) => (
          <li key={line.en}>{pickCopy(language, line)}</li>
        ))}
      </ul>
      {shelf.ready ? null : <p className="grow-note">{t('opening')}</p>}
    </div>
  )
}

function passageKey(ref: PassageRef): string {
  return `${ref.bookIndex}:${ref.chapter}:${ref.verse}`
}

function FruitVerses({
  refs,
  texts,
  openKey,
  shelf,
  categoryId,
  onOpenKey,
  onOpenPassage,
}: {
  refs: PassageRef[]
  texts: Record<string, string>
  openKey: string | null
  shelf: FruitShelf
  categoryId: string | null
  onOpenKey: (key: string | null) => void
  onOpenPassage: (bookIndex: number, chapter: number, verse: number) => void
}) {
  const { language, t } = useLanguage()
  return (
    <div className="fruit-verses">
      {refs.map((ref) => {
        const key = passageKey(ref)
        const text = texts[key]
        if (!text) return null
        const saved = verseForPassage(shelf.verses, ref)
        const open = openKey === key
        const draft: ShelfDraft | undefined = saved
          ? undefined
          : {
              note: '',
              categoryIds: categoryId ? [categoryId] : [],
              voiceBlob: null,
              voiceReady: true,
              voiceDirty: false,
            }
        return (
          <article key={key} className="fruit-verse">
            <p className="grow-verse">{text}</p>
            <p className="grow-source">{formatPassage(language, ref)}</p>
            <div className="grow-actions">
              <button type="button" className="button button-ghost" onClick={() => onOpenPassage(ref.bookIndex, ref.chapter, ref.verse)}>
                {t('growOpenVerse')}
              </button>
              {shelf.ready ? (
                <button type="button" className="button" onClick={() => onOpenKey(open ? null : key)}>
                  {saved ? t('editNote') : t('saveThisVerse')}
                </button>
              ) : null}
            </div>
            {open && shelf.ready ? (
              <ShelfSave
                passage={ref}
                text={text}
                saved={saved ?? null}
                draft={draft}
                categories={shelf.categories}
                onSave={shelf.onSaveVerse}
                onCreateCategory={shelf.onCreateCategory}
              />
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
