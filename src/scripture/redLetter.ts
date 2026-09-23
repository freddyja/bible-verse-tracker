import { BOOKS } from './books.ts'
import { RED_LETTER } from './redLetterData.ts'

export type SpokenPart = {
  spoken: boolean
  text: string
}

type Range = [number, number]

const OPEN_QUOTE = new Set(['“', '«', '‹', '`'])

function isLetter(ch: string): boolean {
  return /[\p{L}\p{N}]/u.test(ch)
}

function letterIndexes(text: string): number[] {
  const indexes: number[] = []
  for (let i = 0; i < text.length; i += 1) {
    if (isLetter(text[i] ?? '')) indexes.push(i)
  }
  return indexes
}

function ratioAt(letters: readonly number[], index: number): number {
  if (letters.length === 0) return 0
  let count = 0
  for (const letter of letters) {
    if (letter >= index) break
    count += 1
  }
  return count / letters.length
}

function indexAtRatio(letters: readonly number[], ratio: number): number {
  if (letters.length === 0) return 0
  const at = Math.min(letters.length - 1, Math.max(0, Math.round(ratio * (letters.length - 1))))
  return letters[at] ?? 0
}

function outerQuotes(text: string): Range[] {
  const curly: Range[] = []
  const stack: { ch: string; i: number }[] = []
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i] ?? ''
    if (OPEN_QUOTE.has(ch)) {
      if (stack.length > 0 && stack[stack.length - 1]?.ch === ch && (ch === '“' || ch === '«')) continue
      stack.push({ ch, i })
      continue
    }
    if ((ch === '”' || ch === '»' || ch === '›') && stack.length > 0) {
      const open = stack[stack.length - 1]
      const matches =
        (open?.ch === '“' && ch === '”') || (open?.ch === '«' && ch === '»') || (open?.ch === '‹' && ch === '›')
      if (!matches || !open) continue
      stack.pop()
      if (stack.length === 0) curly.push([open.i, i + 1])
      continue
    }
    if ((ch === "'" || ch === '’') && stack.length > 0 && stack[stack.length - 1]?.ch === '`') {
      const open = stack.pop()
      if (open && stack.length === 0) curly.push([open.i, i + 1])
    }
  }
  const hanging = stack[0]
  if (stack.length === 1 && hanging && (hanging.ch === '“' || hanging.ch === '«' || hanging.ch === '`')) {
    curly.push([hanging.i, text.length])
  }
  if (curly.length > 0) return curly

  const marks: number[] = []
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '"') marks.push(i)
  }
  const pairs: Range[] = []
  for (let i = 0; i + 1 < marks.length; i += 2) {
    const start = marks[i]
    const end = marks[i + 1]
    if (start !== undefined && end !== undefined) pairs.push([start, end + 1])
  }
  if (marks.length % 2 === 1) {
    const start = marks[marks.length - 1]
    if (start !== undefined) pairs.push([start, text.length])
  }
  return pairs
}

function nextMeaningful(text: string, index: number): string {
  let i = index
  while (i < text.length && /[\s"'“”‘’«»‹›¿¡`"'"]/u.test(text[i] ?? '')) i += 1
  return text[i] ?? ''
}

function isUpper(ch: string): boolean {
  return ch !== '' && ch.toLowerCase() !== ch.toUpperCase() && ch === ch.toUpperCase()
}

function snapStart(text: string, letters: readonly number[], ratio: number): number | null {
  if (ratio <= 0.04) return 0
  const target = indexAtRatio(letters, ratio)
  const window = Math.max(18, Math.floor(text.length * 0.2))
  const from = Math.max(0, target - window)
  const to = Math.min(text.length, target + Math.floor(window / 3))
  let best: { at: number; score: number } | null = null
  for (let i = from; i < to; i += 1) {
    const ch = text[i]
    let rank = 0
    if (ch === ':') rank = 6
    else if (ch === ';') rank = 4
    else if (ch === ',') rank = 3
    else continue
    const at = i + 1
    if (!isUpper(nextMeaningful(text, at))) continue
    const dist = Math.abs(ratioAt(letters, at) - ratio)
    if (dist > 0.22) continue
    const score = rank * 10 - dist * 40 - (at > target ? 3 : 0)
    if (!best || score > best.score) best = { at, score }
  }
  return best ? best.at : null
}

function snapEnd(text: string, letters: readonly number[], ratio: number): number | null {
  if (ratio >= 0.96) return text.length
  const target = indexAtRatio(letters, ratio)
  const window = Math.max(18, Math.floor(text.length * 0.2))
  const from = Math.max(0, target - Math.floor(window / 3))
  const to = Math.min(text.length, target + window)
  let best: { at: number; score: number } | null = null
  for (let i = from; i < to; i += 1) {
    const ch = text[i]
    let rank = 0
    if (ch === '.' || ch === '?' || ch === '!') rank = 6
    else if (ch === ':') rank = 5
    else if (ch === ';') rank = 4
    else if (ch === ',') rank = 2
    else continue
    const at = i + 1
    const dist = Math.abs(ratioAt(letters, i) - ratio)
    if (dist > 0.22) continue
    const score = rank * 10 - dist * 40 - (at < target ? 2 : 0)
    if (!best || score > best.score) best = { at, score }
  }
  return best ? best.at : null
}

function mergeRanges(ranges: Range[]): Range[] {
  const ordered = ranges.filter((range) => range[1] > range[0]).sort((a, b) => a[0] - b[0])
  const merged: Range[] = []
  for (const range of ordered) {
    const prev = merged[merged.length - 1]
    if (prev && range[0] <= prev[1]) prev[1] = Math.max(prev[1], range[1])
    else merged.push([range[0], range[1]])
  }
  return merged
}

function locate(text: string, spans: Range[]): Range[] {
  if (spans.length === 1 && spans[0][0] <= 0.02 && spans[0][1] >= 0.98) return [[0, text.length]]
  const letters = letterIndexes(text)
  const quotes = outerQuotes(text)
  const chosen: Range[] = []
  if (quotes.length > 0) {
    for (const quote of quotes) {
      const qa = ratioAt(letters, quote[0])
      const qb = ratioAt(letters, quote[1])
      const qlen = Math.max(0.001, qb - qa)
      for (const span of spans) {
        const overlap = Math.min(span[1], qb) - Math.max(span[0], qa)
        const slen = Math.max(0.001, span[1] - span[0])
        const splitSpeech = span[1] >= 0.96 && qb >= span[0] - 0.06 && qb <= span[0] + 0.08
        if ((overlap > 0.02 && (overlap / qlen >= 0.45 || overlap / slen >= 0.45)) || splitSpeech) {
          chosen.push(quote)
          break
        }
      }
    }
    if (chosen.length > 0) return mergeRanges(chosen)
  }
  for (const span of spans) {
    const start = snapStart(text, letters, span[0])
    const end = snapEnd(text, letters, span[1])
    if (start === null || end === null || end <= start) continue
    chosen.push([start, end])
  }
  return mergeRanges(chosen)
}

function parseSpans(code: string): Range[] {
  return code.split(',').flatMap((piece) => {
    const [from, to] = piece.split('-').map(Number)
    if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) return []
    return [[from / 100, to / 100] as Range]
  })
}

/** Portions of a verse that are spoken by Jesus or, where marked, by God. */
export function spokenParts(bookIndex: number, chapter: number, verse: number, text: string): SpokenPart[] {
  const code = RED_LETTER[BOOKS[bookIndex]?.id ?? '']?.[String(chapter)]?.[String(verse)]
  if (!code || !text) return [{ spoken: false, text }]
  const ranges = locate(text, parseSpans(code))
  if (ranges.length === 0) return [{ spoken: false, text }]
  const parts: SpokenPart[] = []
  let cursor = 0
  for (const [start, end] of ranges) {
    if (start > cursor) parts.push({ spoken: false, text: text.slice(cursor, start) })
    parts.push({ spoken: true, text: text.slice(start, end) })
    cursor = end
  }
  if (cursor < text.length) parts.push({ spoken: false, text: text.slice(cursor) })
  return parts.filter((part) => part.text.length > 0)
}

/** Keep red-letter ranges aligned, then shorten the way a past-verse snippet does. */
export function clipSpoken(parts: readonly SpokenPart[], limit: number): SpokenPart[] {
  const full = parts.map((part) => part.text).join('')
  if (full.length <= limit) return [...parts]
  const cut = full.slice(0, Math.max(0, limit - 1))
  const space = cut.lastIndexOf(' ')
  const end = space > limit - 50 ? space : cut.length
  let left = end
  const clipped: SpokenPart[] = []
  for (const part of parts) {
    if (left <= 0) break
    if (part.text.length <= left) {
      clipped.push(part)
      left -= part.text.length
    } else {
      clipped.push({ spoken: part.spoken, text: part.text.slice(0, left).trimEnd() })
      left = 0
    }
  }
  const last = clipped[clipped.length - 1]
  if (last) clipped[clipped.length - 1] = { ...last, text: `${last.text.trimEnd()}…` }
  return clipped
}
