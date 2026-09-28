import type { Language } from '../i18n/messages'
import { BOOKS } from '../scripture/books'
import { loadVerse } from '../scripture/api'
import { formatPassage } from '../scripture/passages'
import { versionById } from '../scripture/versions'
import { classifyQuestion, type GuardKind } from './guard'
import { pickPack } from './match'
import { bookIdIndex, findBookQuery, findReference } from './reference'
import {
  BOOK_REPLY,
  CARE_REPLY,
  FALLBACK_REPLY,
  LEGAL_REPLY,
  MEDICAL_REPLY,
  PASSAGE_REPLY,
  SCRIPTURE_CLOSING,
} from './replies'
import type { GospelAnswer, GospelKind, GospelVerse, VerseRef } from './types'

const VERSE_LIMIT = 4

function versionLabel(versionId: string): string {
  return versionById(versionId)?.abbr ?? versionId
}

async function loadRefs(
  versionId: string,
  language: Language,
  refs: readonly VerseRef[],
): Promise<GospelVerse[]> {
  const version = versionLabel(versionId)
  const seen = new Set<string>()
  const verses: GospelVerse[] = []
  for (const ref of refs) {
    if (verses.length >= VERSE_LIMIT) break
    const bookIndex = bookIdIndex(ref.bookId)
    if (bookIndex < 0) continue
    const key = `${bookIndex}:${ref.chapter}:${ref.verse}`
    if (seen.has(key)) continue
    seen.add(key)
    const text = await loadVerse(versionId, bookIndex, ref.chapter, ref.verse)
    if (!text) continue
    verses.push({
      reference: formatPassage(language, { bookIndex, chapter: ref.chapter, verse: ref.verse }),
      version,
      text,
      bookIndex,
      chapter: ref.chapter,
      verse: ref.verse,
    })
  }
  return verses
}

function askedRef(bookIndex: number, chapter: number, verse: number): VerseRef {
  return { bookId: BOOKS[bookIndex].id, chapter, verse }
}

async function guarded(
  kind: GospelKind,
  guard: GuardKind,
  language: Language,
  versionId: string,
): Promise<GospelAnswer> {
  const reply = guard === 'care' ? CARE_REPLY : guard === 'medical' ? MEDICAL_REPLY : LEGAL_REPLY
  let verses: GospelVerse[] = []
  try {
    verses = await loadRefs(versionId, language, reply.refs)
  } catch {
    verses = []
  }
  return {
    kind,
    intro: reply.intro[language],
    verses,
    closing: reply.closing[language],
  }
}

/** A local answer. Verse words come from the Bible already in the app. Nothing is sent away. */
export async function answerGospel(
  question: string,
  language: Language,
  versionId: string,
): Promise<GospelAnswer> {
  const clean = question.trim()
  const guard = classifyQuestion(clean)
  if (guard === 'care') return guarded('care', guard, language, versionId)
  if (guard === 'medical' || guard === 'legal') return guarded('refuse', guard, language, versionId)

  const passage = clean.length >= 2 ? findReference(clean) : null
  const pack = pickPack(clean)

  if (passage && pack) {
    const verses = await loadRefs(versionId, language, [askedRef(passage.bookIndex, passage.chapter, passage.verse), ...pack.refs])
    if (verses.length === 0) throw new Error('verses')
    return { kind: 'scripture', intro: pack.note[language], verses, closing: SCRIPTURE_CLOSING[language] }
  }

  if (passage) {
    const verses = await loadRefs(versionId, language, [askedRef(passage.bookIndex, passage.chapter, passage.verse)])
    if (verses.length === 0) throw new Error('verses')
    return { kind: 'passage', intro: PASSAGE_REPLY.intro[language], verses, closing: PASSAGE_REPLY.closing[language] }
  }

  if (pack) {
    const verses = await loadRefs(versionId, language, pack.refs)
    if (verses.length === 0) throw new Error('verses')
    return { kind: 'scripture', intro: pack.note[language], verses, closing: SCRIPTURE_CLOSING[language] }
  }

  const bookIndex = findBookQuery(clean)
  if (bookIndex !== null) {
    const verses = await loadRefs(versionId, language, [{ bookId: BOOKS[bookIndex].id, chapter: 1, verse: 1 }])
    if (verses.length === 0) throw new Error('verses')
    return { kind: 'passage', intro: BOOK_REPLY.intro[language], verses, closing: BOOK_REPLY.closing[language] }
  }

  const verses = await loadRefs(versionId, language, FALLBACK_REPLY.refs)
  if (verses.length === 0) throw new Error('verses')
  return {
    kind: 'fallback',
    intro: FALLBACK_REPLY.intro[language],
    verses,
    closing: FALLBACK_REPLY.closing[language],
  }
}
