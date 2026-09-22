import type { Language } from '../i18n/messages'

export type BookId =
  | 'psalm'
  | 'isaiah'
  | 'deuteronomy'
  | 'joshua'
  | 'micah'
  | 'hosea'
  | 'zechariah'
  | 'matthew'
  | 'john'
  | 'romans'
  | 'ephesians'
  | 'colossians'
  | '1peter'
  | '1john'
  | 'revelation'

export type PassageRef = {
  book: BookId
  chapter: number
  verse: number
}

type Book = {
  id: BookId
  name: Record<Language, string>
  aliases: string[]
}

const books: Book[] = [
  { id: 'psalm', name: { en: 'Psalm', es: 'Salmo', pt: 'Salmo' }, aliases: ['psalms', 'psalm', 'salmos', 'salmo', 'ps'] },
  { id: 'isaiah', name: { en: 'Isaiah', es: 'Isaías', pt: 'Isaías' }, aliases: ['isaiah', 'isaias', 'isa', 'is'] },
  {
    id: 'deuteronomy',
    name: { en: 'Deuteronomy', es: 'Deuteronomio', pt: 'Deuteronômio' },
    aliases: ['deuteronomy', 'deuteronomio', 'deut', 'dt'],
  },
  { id: 'joshua', name: { en: 'Joshua', es: 'Josué', pt: 'Josué' }, aliases: ['joshua', 'josue', 'josh', 'jos'] },
  { id: 'micah', name: { en: 'Micah', es: 'Miqueas', pt: 'Miquéias' }, aliases: ['micah', 'miqueas', 'miqueias', 'mic'] },
  { id: 'hosea', name: { en: 'Hosea', es: 'Oseas', pt: 'Oseias' }, aliases: ['hosea', 'oseas', 'oseias', 'hos'] },
  {
    id: 'zechariah',
    name: { en: 'Zechariah', es: 'Zacarías', pt: 'Zacarias' },
    aliases: ['zechariah', 'zacarias', 'zech', 'zac'],
  },
  { id: 'matthew', name: { en: 'Matthew', es: 'Mateo', pt: 'Mateus' }, aliases: ['matthew', 'mateo', 'mateus', 'matt', 'mt'] },
  { id: 'john', name: { en: 'John', es: 'Juan', pt: 'João' }, aliases: ['john', 'juan', 'joao', 'jn'] },
  { id: 'romans', name: { en: 'Romans', es: 'Romanos', pt: 'Romanos' }, aliases: ['romans', 'romanos', 'rom'] },
  {
    id: 'ephesians',
    name: { en: 'Ephesians', es: 'Efesios', pt: 'Efésios' },
    aliases: ['ephesians', 'efesios', 'eph'],
  },
  {
    id: 'colossians',
    name: { en: 'Colossians', es: 'Colosenses', pt: 'Colossenses' },
    aliases: ['colossians', 'colosenses', 'col'],
  },
  {
    id: '1peter',
    name: { en: '1 Peter', es: '1 Pedro', pt: '1 Pedro' },
    aliases: [
      '1 peter',
      '1peter',
      '1 pet',
      '1pe',
      'i peter',
      'first peter',
      '1st peter',
      '1 pedro',
      '1pedro',
      'i pedro',
      'primer pedro',
      'primero pedro',
      'primeira pedro',
      'primeiro pedro',
    ],
  },
  {
    id: '1john',
    name: { en: '1 John', es: '1 Juan', pt: '1 João' },
    aliases: [
      '1 john',
      '1john',
      '1 jn',
      '1jn',
      'i john',
      'first john',
      '1st john',
      '1 juan',
      '1juan',
      'i juan',
      'primer juan',
      '1 joao',
      '1joao',
      'i joao',
      'primeira joao',
      'primeiro joao',
    ],
  },
  {
    id: 'revelation',
    name: { en: 'Revelation', es: 'Apocalipsis', pt: 'Apocalipse' },
    aliases: ['revelation', 'apocalipsis', 'apocalipse', 'rev', 'ap'],
  },
]

const booksById = new Map(books.map((book) => [book.id, book]))
const booksByAlias = new Map<string, BookId>()
for (const book of books) {
  for (const alias of book.aliases) booksByAlias.set(alias, book.id)
}

/** Match a freeform reference. Accents and EN/ES/PT book names all count. */
export function normalizeReference(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[–—]/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9\s:-]/g, ' ')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*-\s*/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

const referencePattern = /^(.+?)\s+(\d+):(\d+)(?:-\d+)?$/

export function parseReference(value: string): PassageRef | null {
  const match = referencePattern.exec(normalizeReference(value))
  if (!match) return null
  const book = booksByAlias.get(match[1])
  if (!book) return null
  const chapter = Number(match[2])
  const verse = Number(match[3])
  if (chapter < 1 || verse < 1) return null
  return { book, chapter, verse }
}

export function formatPassage(language: Language, passage: PassageRef): string {
  const name = booksById.get(passage.book)?.name[language] ?? passage.book
  return `${name} ${passage.chapter}:${passage.verse}`
}

export function samePassage(a: PassageRef, b: PassageRef): boolean {
  return a.book === b.book && a.chapter === b.chapter && a.verse === b.verse
}
