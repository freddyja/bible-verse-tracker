import { fold } from './passages.ts'

/** How many topic names a search shows. */
export const TOPIC_GROUP_LIMIT = 4

/** How many verses each of those topics shows. */
export const TOPIC_VERSE_LIMIT = 6

/** How many ranked topics to scan so later groups can still fill after duplicates. */
export const TOPIC_SCAN_LIMIT = 12

export type TopicRef = {
  bookIndex: number
  chapter: number
  verse: number
  endVerse?: number
}

export type TopicIndexEntry = {
  name: string
  refs: TopicRef[]
}

const SMALL_WORDS = new Set(['a', 'an', 'and', 'of', 'the', 'to', 'in', 'on', 'for', 'with'])

export function titleCaseTopic(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase()
      if (index > 0 && SMALL_WORDS.has(lower)) return lower
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(' ')
}

/**
 * Lower scores are closer names. Null means the topic does not match.
 * Exact name, then a name that starts with the query, then whole-word
 * matches, then a word that starts with a query token, then any substring.
 */
export function topicScore(name: string, query: string): number | null {
  const foldedName = fold(name)
  const normalized = fold(query)
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (normalized.length < 2) return null
  if (foldedName === normalized) return 0
  const tokens = normalized.split(' ').filter((token) => token.length > 1)
  if (tokens.length === 0) return null
  if (!tokens.every((token) => foldedName.includes(token))) return null
  const words = foldedName.split(/[^a-z0-9]+/).filter(Boolean)
  if (foldedName.startsWith(normalized)) return 1
  if (tokens.every((token) => words.includes(token))) return 2
  if (tokens.every((token) => words.some((word) => word.startsWith(token)))) return 3
  return 4
}

export function rankTopics(
  entries: readonly TopicIndexEntry[],
  query: string,
  limit = TOPIC_SCAN_LIMIT,
): TopicIndexEntry[] {
  const scored: { score: number; index: number; entry: TopicIndexEntry }[] = []
  for (let index = 0; index < entries.length; index += 1) {
    const score = topicScore(entries[index].name, query)
    if (score === null) continue
    scored.push({ score, index, entry: entries[index] })
  }
  scored.sort((a, b) => a.score - b.score || a.index - b.index)
  return scored.slice(0, limit).map((row) => row.entry)
}

function refKey(ref: TopicRef): string {
  return `${ref.bookIndex}:${ref.chapter}:${ref.verse}`
}

/** Ranked topics for a query, without repeating a verse that an earlier topic already shows. */
export function selectTopicGroups(
  entries: readonly TopicIndexEntry[],
  query: string,
  groupLimit = TOPIC_GROUP_LIMIT,
  verseLimit = TOPIC_VERSE_LIMIT,
): TopicIndexEntry[] {
  const ranked = rankTopics(entries, query, TOPIC_SCAN_LIMIT)
  const seen = new Set<string>()
  const groups: TopicIndexEntry[] = []
  for (const topic of ranked) {
    const refs: TopicRef[] = []
    for (const ref of topic.refs) {
      const key = refKey(ref)
      if (seen.has(key)) continue
      seen.add(key)
      refs.push(ref)
      if (refs.length >= verseLimit) break
    }
    if (refs.length === 0) continue
    groups.push({ name: topic.name, refs })
    if (groups.length >= groupLimit) break
  }
  return groups
}

export function parseTopicIndex(raw: unknown): TopicIndexEntry[] {
  if (!Array.isArray(raw)) throw new Error('topics')
  return raw.map((row) => {
    if (!Array.isArray(row) || typeof row[0] !== 'string' || !Array.isArray(row[1])) {
      throw new Error('topics')
    }
    const refs = row[1].map((ref) => {
      if (!Array.isArray(ref) || ref.length < 3) throw new Error('topics')
      const [bookIndex, chapter, verse, endVerse] = ref
      if (![bookIndex, chapter, verse].every((part) => Number.isInteger(part) && part >= 0)) {
        throw new Error('topics')
      }
      const parsed: TopicRef = { bookIndex, chapter, verse }
      if (Number.isInteger(endVerse) && endVerse > verse) parsed.endVerse = endVerse
      return parsed
    })
    return { name: row[0], refs }
  })
}
