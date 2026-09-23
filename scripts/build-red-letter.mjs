/**
 * Builds translation-independent red-letter spans from the public-domain
 * World English Bible USFM (eBible.org).
 *
 * Jesus: `\wj` … `\wj*` markers in that USFM.
 * Father, from heaven: a short explicit list (voice from heaven / the cloud).
 * Old Testament: a quote is marked only when the public-domain text itself
 * names Yahweh / the LORD / God as the speaker of that quote, or the quote
 * continues one that was opened that way. Pronoun-only “he said” is skipped.
 *
 * Usage: node scripts/build-red-letter.mjs
 * Reads /tmp/web-usfm/usfm if present, otherwise downloads the eBible zip.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const usfmDir = process.env.WEB_USFM_DIR || join(tmpdir(), 'web-usfm', 'usfm')
const zipUrl = 'https://ebible.org/Scriptures/engwebp_usfm.zip'

const BOOK_FILES = [
  ['gen', '02-GENengwebp.usfm'],
  ['exo', '03-EXOengwebp.usfm'],
  ['lev', '04-LEVengwebp.usfm'],
  ['num', '05-NUMengwebp.usfm'],
  ['deu', '06-DEUengwebp.usfm'],
  ['jos', '07-JOSengwebp.usfm'],
  ['jdg', '08-JDGengwebp.usfm'],
  ['rut', '09-RUTengwebp.usfm'],
  ['1sa', '10-1SAengwebp.usfm'],
  ['2sa', '11-2SAengwebp.usfm'],
  ['1ki', '12-1KIengwebp.usfm'],
  ['2ki', '13-2KIengwebp.usfm'],
  ['1ch', '14-1CHengwebp.usfm'],
  ['2ch', '15-2CHengwebp.usfm'],
  ['ezr', '16-EZRengwebp.usfm'],
  ['neh', '17-NEHengwebp.usfm'],
  ['est', '18-ESTengwebp.usfm'],
  ['job', '19-JOBengwebp.usfm'],
  ['psa', '20-PSAengwebp.usfm'],
  ['pro', '21-PROengwebp.usfm'],
  ['ecc', '22-ECCengwebp.usfm'],
  ['sng', '23-SNGengwebp.usfm'],
  ['isa', '24-ISAengwebp.usfm'],
  ['jer', '25-JERengwebp.usfm'],
  ['lam', '26-LAMengwebp.usfm'],
  ['ezk', '27-EZKengwebp.usfm'],
  ['dan', '28-DANengwebp.usfm'],
  ['hos', '29-HOSengwebp.usfm'],
  ['jol', '30-JOLengwebp.usfm'],
  ['amo', '31-AMOengwebp.usfm'],
  ['oba', '32-OBAengwebp.usfm'],
  ['jon', '33-JONengwebp.usfm'],
  ['mic', '34-MICengwebp.usfm'],
  ['nah', '35-NAMengwebp.usfm'],
  ['hab', '36-HABengwebp.usfm'],
  ['zep', '37-ZEPengwebp.usfm'],
  ['hag', '38-HAGengwebp.usfm'],
  ['zec', '39-ZECengwebp.usfm'],
  ['mal', '40-MALengwebp.usfm'],
  ['mat', '70-MATengwebp.usfm'],
  ['mrk', '71-MRKengwebp.usfm'],
  ['luk', '72-LUKengwebp.usfm'],
  ['jhn', '73-JHNengwebp.usfm'],
  ['act', '74-ACTengwebp.usfm'],
  ['rom', '75-ROMengwebp.usfm'],
  ['1co', '76-1COengwebp.usfm'],
  ['2co', '77-2COengwebp.usfm'],
  ['gal', '78-GALengwebp.usfm'],
  ['eph', '79-EPHengwebp.usfm'],
  ['php', '80-PHPengwebp.usfm'],
  ['col', '81-COLengwebp.usfm'],
  ['1th', '82-1THengwebp.usfm'],
  ['2th', '83-2THengwebp.usfm'],
  ['1ti', '84-1TIengwebp.usfm'],
  ['2ti', '85-2TIengwebp.usfm'],
  ['tit', '86-TITengwebp.usfm'],
  ['phm', '87-PHMengwebp.usfm'],
  ['heb', '88-HEBengwebp.usfm'],
  ['jas', '89-JASengwebp.usfm'],
  ['1pe', '90-1PEengwebp.usfm'],
  ['2pe', '91-2PEengwebp.usfm'],
  ['1jn', '92-1JNengwebp.usfm'],
  ['2jn', '93-2JNengwebp.usfm'],
  ['3jn', '94-3JNengwebp.usfm'],
  ['jud', '95-JUDengwebp.usfm'],
  ['rev', '96-REVengwebp.usfm'],
]

/** Father speaking from heaven. Verse numbers are the traditional Protestant ones. */
const FATHER_VERSES = new Set([
  'mat 3:17',
  'mat 17:5',
  'mrk 1:11',
  'mrk 9:7',
  'luk 3:22',
  'luk 9:35',
  'jhn 12:28',
  '2pe 1:17',
])

const OT = new Set(BOOK_FILES.slice(0, 39).map(([id]) => id))

function ensureUsfm() {
  const sample = join(usfmDir, '70-MATengwebp.usfm')
  if (existsSync(sample)) return
  const zip = join(tmpdir(), 'engwebp_usfm.zip')
  const dest = dirname(usfmDir)
  mkdirSync(dest, { recursive: true })
  execFileSync('curl', ['-fsSL', zipUrl, '-o', zip], { stdio: 'inherit' })
  execFileSync('unzip', ['-qo', zip, '-d', dest], { stdio: 'inherit' })
}

function stripNotes(source) {
  return source.replace(/\\f\s[\s\S]*?\\f\*/g, '').replace(/\\x\s[\s\S]*?\\x\*/g, '')
}

function parseBook(source) {
  const text = stripNotes(source).replace(/\\\+?w ([^|\\]+)\|[^\\]*?\\\+?w\*/g, '$1')
  /** @type {{ text: string, mask: boolean[] }[][]} */
  const chapters = []
  let chapter = 0
  let verse = 0
  let jesus = false
  let raw = ''
  /** @type {boolean[]} */
  let rawMask = []

  function ensureChapter(number) {
    while (chapters.length < number) chapters.push([])
  }

  function flush() {
    if (chapter < 1 || verse < 1) {
      raw = ''
      rawMask = []
      return
    }
    ensureChapter(chapter)
    const cleaned = clean(raw, rawMask)
    const list = chapters[chapter - 1]
    while (list.length < verse) list.push({ text: '', mask: [] })
    list[verse - 1] = cleaned
    raw = ''
    rawMask = []
  }

  function emit(chunk) {
    if (!chunk || chapter < 1 || verse < 1) return
    raw += chunk
    for (let i = 0; i < chunk.length; i += 1) rawMask.push(jesus)
  }

  const token = /\\([A-Za-z0-9]+)(\*)?(?:[ \t]+(\d+))?/g
  let last = 0
  let match
  while ((match = token.exec(text))) {
    emit(text.slice(last, match.index))
    last = match.index + match[0].length
    const tag = match[1]
    const close = match[2] === '*'
    const num = match[3] ? Number(match[3]) : 0
    if (tag === 'wj') jesus = !close
    else if (tag === 'c' && num) {
      flush()
      chapter = num
      verse = 0
      ensureChapter(chapter)
    } else if (tag === 'v' && num) {
      flush()
      verse = num
    } else if (!close && (tag === 'p' || tag.startsWith('q') || tag === 'm' || tag === 'mi' || tag === 'nb' || tag === 'li' || tag.startsWith('li'))) {
      emit(' ')
    }
  }
  emit(text.slice(last))
  flush()
  return chapters
}

function clean(raw, rawMask) {
  let text = ''
  /** @type {boolean[]} */
  const mask = []
  let pending = false
  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i]
    if (/\s/u.test(ch)) {
      if (text.length > 0) pending = true
      continue
    }
    if (pending) {
      text += ' '
      mask.push(false)
      pending = false
    }
    text += ch
    mask.push(Boolean(rawMask[i]))
  }
  return { text, mask }
}

function isLetter(ch) {
  return /[\p{L}\p{N}]/u.test(ch)
}

const GOD_NAME = /\b(Yahweh|LORD|God)\b/
const HUMAN_NAME =
  /\b(Moses|Aaron|Miriam|Pharaoh|David|Saul|Solomon|Abraham|Isaac|Jacob|Joseph|Joshua|Samuel|Elijah|Elisha|Isaiah|Jeremiah|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Job|Peter|Paul|Jesus|Pilate|Herod|Judas|Mary|Martha|king|queen|serpent|woman|man|men|people|Israel|servant|messenger|prophet|priest|priests|disciples|Pharisees|scribes|Satan|devil|Balaam|Balak|Nebuchadnezzar|Darius|Cyrus|Haman|Mordecai|Esther|Ruth|Boaz|Naomi|Hannah|Eli|Jonathan|Absalom|Joab|Nathan|Rehoboam|Jeroboam|Ahab|Jezebel|Naaman|Gehazi|Hezekiah|Josiah|Zedekiah|Baruch|Hananiah|Cain|Abel|Noah|Lot|Esau|Laban|Rachel|Leah|Rebekah|Sarah|Hagar|Ishmael|Benjamin|Reuben|Judah|Simeon|Levi|Gideon|Samson|Delilah|Ruth|Boaz|Orpah|Elimelech|Naomi|Boaz|Samuel|Kish|Jesse|Goliath|Bathsheba|Uriah|Nathan|Absalom|Adonijah|Jeroboam|Ahab|Elijah|Elisha|Naaman|Hezekiah|Manasseh|Josiah|Nebuchadnezzar|Belshazzar|Darius|Cyrus|Haman|Mordecai|Vashti|Ahasuerus|Bildad|Zophar|Eliphaz|Elihu)\b/i
const SPEECH_VERB =
  /\b(said|says|saying|spoke|spoken|answered|called|asked|declares|declared|commanded|told)\b/gi
const FORMULA_AFTER =
  /^\s*,?\s*(?:says|saith|declares)\s+(?:the\s+)?(?:Lord\s+)?(?:GOD|Yahweh|LORD|God)\b/i
const FORMULA_IN =
  /(?:^|[\s“‘])(?:thus\s+says|this\s+is\s+what)\s+(?:the\s+)?(?:Lord\s+)?(?:Yahweh|LORD|God)\b|(?:says|saith|declares)\s+(?:the\s+)?(?:Lord\s+)?(?:Yahweh|LORD|God)\b/i

function lastVerb(before) {
  SPEECH_VERB.lastIndex = 0
  let last = null
  let match
  while ((match = SPEECH_VERB.exec(before))) last = match
  if (!last) return null
  const upto = before.slice(0, last.index)
  const bits = upto.split(/[.;!?]/)
  return bits[bits.length - 1] || ''
}

function stripAddressee(clause) {
  return clause.replace(/\b(to|unto)\s+((?:the|a|an|his|her|their|my|your)\s+)?[\p{L}’']+/giu, ' ')
}

function classifyClause(clause) {
  if (!clause || !clause.trim()) return 'none'
  const spoken = stripAddressee(clause).replace(
    /\b(answered|asked|told)\s+(?:the\s+)?(?:LORD|God|Yahweh)\b/gi,
    '$1',
  )
  if (/\bangel\b/i.test(spoken)) return 'unsure'
  const god = GOD_NAME.test(spoken)
  const human = HUMAN_NAME.test(spoken)
  if (human) return 'human'
  if (god) return 'god'
  if (/\b(I|we|he|she|they|you)\b/i.test(clause)) return 'unsure'
  return 'none'
}

function isGodIntro(before) {
  const tail = before.slice(-220)
  if (/(?:says|saith|declares)\s+(?:the\s+)?(?:Lord\s+)?(?:GOD|Yahweh|LORD|God)\s*[.:”’]?\s*$/i.test(tail.trim())) {
    return true
  }
  const clause = lastVerb(before)
  if (clause === null) {
    return /\b(Yahweh|the LORD|God)\b[^.]{0,60}\b(spoken|spoke)\s*[:,]?\s*$/i.test(tail)
  }
  return classifyClause(clause) === 'god'
}

function isHumanIntro(before) {
  const clause = lastVerb(before)
  if (clause === null) return false
  return classifyClause(clause) === 'human'
}

function isUnsureIntro(before) {
  const clause = lastVerb(before)
  if (clause === null) return false
  return classifyClause(clause) === 'unsure'
}

function isFreshSpeechIntro(text) {
  const line = text.trim()
  if (!line || line.startsWith('“') || line.startsWith('‘')) return false
  return /^(?:Then |And |So |Now |Moreover |After |Also )?(?:the LORD|Yahweh|God)\b[^“]{0,90}\b(?:spoke|spoken|said|says|saying|called|commanded|answered)\b/i.test(line)
}

function isNarrativeBreak(text) {
  const line = text.trim()
  if (!line || /[“”]/.test(line)) return false
  return /^(?:Then |And |So |Thus |Now )?(?:Moses|Aaron|Eleazar|Phinehas|Joshua)\b[^.]{0,50}\b(?:did|brought|went|came|took|said|called|assembled|offered|killed|put|set|poured|sprinkled|washed|clothed|anointed|laid|burned)\b/.test(line)
}

function heavenlyVoice(before) {
  const tail = before.slice(-220)
  return /\bvoice\b/i.test(tail) && /\b(heaven|heavens|sky|cloud|Majestic Glory)\b/i.test(tail) && /\b(said|saying|saith|came)\b/i.test(tail)
}

/**
 * @param {{ text: string, mask: boolean[] }[][]} chapters
 * @param {string} bookId
 */
function markDivine(chapters, bookId) {
  if (!OT.has(bookId)) return
  /** @type {{ ch: string, parts: { ci: number, vi: number, start: number, end: number }[], children: unknown[] }[]} */
  const stack = []
  /** @type {typeof stack} */
  const roots = []

  function finishOpenQuotes() {
    while (stack.length) {
      const frame = stack.pop()
      if (!frame) break
      if (stack.length === 0) roots.push(frame)
      else stack[stack.length - 1].children.push(frame)
    }
  }

  function closeThrough(ci, vi, end, opener) {
    while (stack.length && stack[stack.length - 1].ch !== opener) {
      const inner = stack.pop()
      if (!inner) break
      currentPart(inner, ci, vi).end = end
      if (stack.length === 0) roots.push(inner)
      else stack[stack.length - 1].children.push(inner)
    }
    if (!stack.length || stack[stack.length - 1].ch !== opener) return
    currentPart(stack[stack.length - 1], ci, vi).end = end
    const frame = stack.pop()
    if (!frame) return
    if (stack.length === 0) roots.push(frame)
    else stack[stack.length - 1].children.push(frame)
  }

  function verse(ci, vi) {
    return chapters[ci]?.[vi]
  }

  function currentPart(frame, ci, vi) {
    const text = verse(ci, vi)?.text ?? ''
    const last = frame.parts[frame.parts.length - 1]
    if (!last || last.ci !== ci || last.vi !== vi) {
      frame.parts.push({ ci, vi, start: 0, end: text.length })
    }
    return frame.parts[frame.parts.length - 1]
  }

  for (let ci = 0; ci < chapters.length; ci += 1) {
    const verses = chapters[ci]
    for (let vi = 0; vi < verses.length; vi += 1) {
      const text = verses[vi].text
      if (stack.length && (isFreshSpeechIntro(text) || isNarrativeBreak(text))) finishOpenQuotes()
      if (stack.length) {
        for (const frame of stack) currentPart(frame, ci, vi).start = 0
      }
      for (let i = 0; i < text.length; i += 1) {
        const ch = text[i]
        if (ch === '“' || ch === '‘') {
          // A repeated opener continues the same speech at a new paragraph.
          if (stack.length && stack[stack.length - 1].ch === ch) continue
          stack.push({
            ch,
            parts: [{ ci, vi, start: i, end: text.length }],
            children: [],
          })
        } else if (ch === '”' && stack.length) {
          closeThrough(ci, vi, i + 1, '“')
        } else if (ch === '’' && stack.length && stack[stack.length - 1].ch === '‘') {
          currentPart(stack[stack.length - 1], ci, vi).end = i + 1
          const frame = stack.pop()
          if (stack.length === 0) roots.push(frame)
          else stack[stack.length - 1].children.push(frame)
        }
      }
      for (const frame of stack) currentPart(frame, ci, vi).end = text.length
    }
  }
  while (stack.length) {
    const frame = stack.pop()
    if (!frame) break
    if (stack.length === 0) roots.push(frame)
    else stack[stack.length - 1].children.push(frame)
  }

  function quoteText(frame) {
    return frame.parts.map((part) => verse(part.ci, part.vi)?.text.slice(part.start, part.end) ?? '').join(' ')
  }

  function beforeQuote(frame) {
    const part = frame.parts[0]
    const prior = verse(part.ci, part.vi)?.text.slice(0, part.start) ?? ''
    if (prior.trim()) return prior
    if (part.vi > 0) return verse(part.ci, part.vi - 1)?.text.slice(-240) ?? ''
    if (part.ci > 0) {
      const prev = chapters[part.ci - 1]
      return prev[prev.length - 1]?.text.slice(-240) ?? ''
    }
    return ''
  }

  function afterQuote(frame) {
    const part = frame.parts[frame.parts.length - 1]
    return verse(part.ci, part.vi)?.text.slice(part.end, part.end + 80) ?? ''
  }

  function paint(frame) {
    for (const part of frame.parts) {
      const row = verse(part.ci, part.vi)
      if (!row) continue
      for (let i = part.start; i < part.end && i < row.mask.length; i += 1) row.mask[i] = true
    }
  }

  function visit(frame) {
    const before = beforeQuote(frame)
    const after = afterQuote(frame)
    const body = quoteText(frame)
    const human = isHumanIntro(before)
    const god = isGodIntro(before) || FORMULA_AFTER.test(after) || (frame.ch === '“' && FORMULA_IN.test(body) && !human)
    if (god && !human) {
      paint(frame)
      return
    }
    // A human or a bare “he said” owns the quotation, including anything nested in it.
    if (human || isUnsureIntro(before)) return
    for (const child of frame.children) visit(child)
  }

  for (const frame of roots) visit(frame)

  // "God said, '…' And he said, '…'" in the same verse keeps the same speaker.
  let divineThrough = ''
  const reuse = (frame) => {
    const open = frame.parts[0]
    const close = frame.parts[frame.parts.length - 1]
    const row = verse(open.ci, open.vi)
    const probe = row ? Math.min(open.start + 1, row.mask.length - 1) : -1
    const painted = probe >= 0 && row.mask[probe]
    const here = `${open.ci}:${open.vi}`
    if (painted) {
      divineThrough = `${close.ci}:${close.vi}`
      return
    }
    const before = beforeQuote(frame).slice(-90)
    const bare = stripAddressee(before)
    const pronoun = /\b(?:and\s+|then\s+)?(?:he|she)\s+(?:also\s+)?(?:said|says|answered|spoke|called)\b/i.test(before)
    const named = HUMAN_NAME.test(bare) || GOD_NAME.test(bare)
    if (pronoun && !named && here === divineThrough) paint(frame)
    const after = verse(open.ci, open.vi)
    const afterProbe = after ? Math.min(open.start + 1, after.mask.length - 1) : -1
    if (afterProbe >= 0 && after.mask[afterProbe]) divineThrough = `${close.ci}:${close.vi}`
    else for (const child of frame.children) reuse(child)
  }
  for (const frame of roots) reuse(frame)
}

function markFather(verses, bookId, chapterNumber) {
  for (let vi = 0; vi < verses.length; vi += 1) {
    const key = `${bookId} ${chapterNumber}:${vi + 1}`
    if (!FATHER_VERSES.has(key)) continue
    const text = verses[vi].text
    let cursor = 0
    while (cursor < text.length) {
      const open = text.indexOf('“', cursor)
      if (open < 0) break
      const close = text.indexOf('”', open + 1)
      const end = close < 0 ? text.length : close + 1
      const before = text.slice(0, open)
      if (heavenlyVoice(before)) {
        for (let i = open; i < end && i < verses[vi].mask.length; i += 1) verses[vi].mask[i] = true
      }
      cursor = end
    }
  }
}

function encodeSpans(text, mask) {
  /** @type {number[]} */
  const letters = []
  for (let i = 0; i < text.length; i += 1) {
    if (isLetter(text[i])) letters.push(i)
  }
  if (letters.length < 2) return ''
  let spoken = 0
  for (const i of letters) if (mask[i]) spoken += 1
  if (spoken === 0) return ''
  if (spoken === letters.length) return '0-100'

  /** @type {[number, number][]} */
  const spans = []
  let start = -1
  let last = -1
  for (let li = 0; li < letters.length; li += 1) {
    if (mask[letters[li]]) {
      if (start < 0) start = li
      last = li
    } else if (start >= 0) {
      spans.push([start, last])
      start = -1
    }
  }
  if (start >= 0) spans.push([start, last])

  const encoded = spans
    .map(([a, b]) => {
      const from = Math.floor((a / letters.length) * 100)
      const to = Math.ceil(((b + 1) / letters.length) * 100)
      return `${from}-${Math.max(from + 1, to)}`
    })
    .filter((piece, index, list) => {
      if (index === 0) return true
      const prev = list[index - 1]
      return prev !== piece
    })
  return mergeEncoded(encoded.join(','))
}

function mergeEncoded(code) {
  const bits = code.split(',').map((piece) => piece.split('-').map(Number))
  /** @type {[number, number][]} */
  const merged = []
  for (const [a, b] of bits) {
    const prev = merged[merged.length - 1]
    if (prev && a <= prev[1] + 1) prev[1] = Math.max(prev[1], b)
    else merged.push([a, b])
  }
  return merged.map(([a, b]) => `${a}-${b}`).join(',')
}

function showSpoken(text, mask) {
  let out = ''
  let on = false
  for (let i = 0; i < text.length; i += 1) {
    const spoken = Boolean(mask[i]) && isLetter(text[i])
    if (spoken !== on) {
      out += spoken ? '⟦' : '⟧'
      on = spoken
    }
    out += text[i]
  }
  if (on) out += '⟧'
  return out
}

function report(books) {
  const picks = [
    ['mat', 4, 3],
    ['mat', 4, 4],
    ['mat', 4, 6],
    ['mat', 4, 10],
    ['mat', 5, 3],
    ['mat', 3, 17],
    ['mat', 17, 5],
    ['jhn', 3, 16],
    ['jhn', 11, 25],
    ['jhn', 14, 6],
    ['act', 9, 5],
    ['rev', 1, 8],
    ['rev', 22, 20],
    ['1co', 11, 24],
    ['isa', 1, 2],
    ['isa', 1, 3],
    ['isa', 1, 4],
    ['isa', 1, 11],
    ['gen', 1, 3],
    ['gen', 3, 9],
    ['exo', 3, 4],
    ['exo', 3, 5],
    ['exo', 3, 7],
    ['exo', 3, 11],
    ['exo', 3, 14],
    ['jer', 1, 5],
    ['jer', 1, 6],
    ['psa', 23, 1],
    ['psa', 110, 1],
    ['2pe', 1, 17],
    ['gen', 3, 1],
    ['job', 2, 4],
    ['job', 38, 1],
    ['job', 38, 2],
    ['job', 38, 3],
    ['mat', 2, 6],
    ['exo', 3, 8],
    ['exo', 3, 14],
    ['isa', 1, 12],
    ['pro', 8, 4],
  ]
  let mismatches = 0
  let compared = 0
  for (const [bookId] of BOOK_FILES) {
    const bundledPath = join(root, 'public/scripture/web', `${bookId}.json`)
    if (!existsSync(bundledPath)) continue
    const bundled = JSON.parse(readFileSync(bundledPath, 'utf8'))
    const parsed = books.get(bookId)
    for (let c = 0; c < bundled.length; c += 1) {
      for (let v = 0; v < bundled[c].length; v += 1) {
        const left = (parsed?.[c]?.[v]?.text || '').replace(/[“”‘’]/g, '"').replace(/\s+/g, ' ').trim()
        const right = String(bundled[c][v] || '').replace(/[“”‘’]/g, '"').replace(/\s+/g, ' ').trim()
        if (!left && !right) continue
        compared += 1
        if (left !== right) mismatches += 1
      }
    }
  }
  console.log(`bundled WEB text mismatches ${mismatches} / ${compared}`)
  for (const [bookId, chapter, verse] of picks) {
    const verseObj = books.get(bookId)?.[chapter - 1]?.[verse - 1]
    console.log(`\n${bookId} ${chapter}:${verse}`)
    console.log(verseObj ? showSpoken(verseObj.text, verseObj.mask) : '(missing)')
  }
}

function build() {
  ensureUsfm()
  /** @type {Record<string, Record<string, Record<string, string>>>} */
  const data = {}
  /** @type {Map<string, { text: string, mask: boolean[] }[][]>} */
  const parsedBooks = new Map()
  let jesusVerses = 0
  let divineVerses = 0
  for (const [bookId, file] of BOOK_FILES) {
    const chapters = parseBook(readFileSync(join(usfmDir, file), 'utf8'))
    parsedBooks.set(bookId, chapters)
    const jesusMasks = chapters.map((verses) => verses.map((verse) => verse.mask.slice()))
    markDivine(chapters, bookId)
    /** @type {Record<string, Record<string, string>>} */
    const book = {}
    chapters.forEach((verses, chapterIndex) => {
      markFather(verses, bookId, chapterIndex + 1)
      /** @type {Record<string, string>} */
      const chapter = {}
      verses.forEach((verse, verseIndex) => {
        const code = encodeSpans(verse.text, verse.mask)
        if (!code) return
        const hadJesus = jesusMasks[chapterIndex][verseIndex].some(Boolean)
        if (hadJesus) jesusVerses += 1
        else divineVerses += 1
        chapter[String(verseIndex + 1)] = code
      })
      if (Object.keys(chapter).length) book[String(chapterIndex + 1)] = chapter
    })
    if (Object.keys(book).length) data[bookId] = book
  }

  const banner = `/* Generated by scripts/build-red-letter.mjs. Do not edit by hand.
 * Jesus spans: public-domain World English Bible \\wj markers (eBible.org).
 * Father-from-heaven and Old Testament divine speech: only where that text
 * names the speaker. Same spans for every bundled translation.
 */\n`
  const body = `export const RED_LETTER: Record<string, Record<string, Record<string, string>>> = ${JSON.stringify(data)}\n`
  writeFileSync(join(root, 'src/scripture/redLetterData.ts'), banner + body)
  console.log(`jesus verses ${jesusVerses}, other divine verses ${divineVerses}, books ${Object.keys(data).length}`)
  if (process.argv.includes('--report')) report(parsedBooks)
}

build()
