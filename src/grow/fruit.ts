import { messages, type Language, type MessageKey } from '../i18n/messages'
import { BOOKS } from '../scripture/books'
import { fold, type PassageRef } from '../scripture/passages'
import type { Copy } from './content'

/**
 * Nine fruits of Galatians 5:22–23.
 * English names are the usual list (love through self-control).
 * Spanish names follow Reina-Valera: amor, gozo, paz, paciencia, benignidad,
 * bondad, fe, mansedumbre, templanza.
 * Portuguese names follow Bíblia Livre: amor, alegria, paz, paciência,
 * benignidade, bondade, fidelidade, mansidão, domínio próprio.
 * The verse words themselves are loaded from the free text he is reading.
 */
export type FruitPassage = {
  bookId: string
  chapter: number
  verse: number
  /** Galatians 5:22–23, shown first for every fruit. */
  anchor?: boolean
}

export type Fruit = {
  id: string
  categoryId: string
  labelKey: MessageKey
  glyph: string
  /** Extra search words from the free texts, already folded. */
  aliases: readonly string[]
  passages: readonly FruitPassage[]
  practice: readonly Copy[]
}

const galatians: readonly FruitPassage[] = [
  { bookId: 'gal', chapter: 5, verse: 22, anchor: true },
  { bookId: 'gal', chapter: 5, verse: 23, anchor: true },
]

export const FRUITS: readonly Fruit[] = [
  {
    id: 'love',
    categoryId: 'cat-fruit-love',
    labelKey: 'catFruitLove',
    glyph: 'heart',
    aliases: ['caridad', 'charity'],
    passages: [
      ...galatians,
      { bookId: 'jhn', chapter: 3, verse: 16 },
      { bookId: 'jhn', chapter: 13, verse: 34 },
      { bookId: '1co', chapter: 13, verse: 4 },
      { bookId: '1jn', chapter: 4, verse: 7 },
    ],
    practice: [
      {
        en: 'Name one person and do one small thing for them that costs you a little time.',
        es: 'Nombra a una persona y haz por ella una cosa pequeña que te cueste un poco de tiempo.',
        pt: 'Nomeie uma pessoa e faça por ela uma coisa pequena que lhe custe um pouco de tempo.',
      },
      {
        en: 'Before a sharp answer, pause and choose one sentence that love can stand behind.',
        es: 'Antes de una respuesta áspera, haz una pausa y elige una frase que el amor pueda sostener.',
        pt: 'Antes de uma resposta áspera, faça uma pausa e escolha uma frase que o amor possa sustentar.',
      },
    ],
  },
  {
    id: 'joy',
    categoryId: 'cat-fruit-joy',
    labelKey: 'catFruitJoy',
    glyph: 'joy',
    aliases: [],
    passages: [
      ...galatians,
      { bookId: 'jhn', chapter: 15, verse: 11 },
      { bookId: 'php', chapter: 4, verse: 4 },
      { bookId: 'psa', chapter: 16, verse: 11 },
      { bookId: 'neh', chapter: 8, verse: 10 },
    ],
    practice: [
      {
        en: 'Thank God out loud for one gift you did not earn.',
        es: 'Da gracias a Dios en voz alta por un don que no ganaste.',
        pt: 'Agradeça a Deus em voz alta por um dom que você não mereceu.',
      },
      {
        en: 'When the day is heavy, read the joy verse once and name one joy that is not a circumstance.',
        es: 'Cuando el día pese, lee una vez el versículo del gozo y nombra un gozo que no dependa de las circunstancias.',
        pt: 'Quando o dia pesar, leia uma vez o versículo da alegria e nomeie uma alegria que não dependa das circunstâncias.',
      },
    ],
  },
  {
    id: 'peace',
    categoryId: 'cat-fruit-peace',
    labelKey: 'catFruitPeace',
    glyph: 'dove',
    aliases: [],
    passages: [
      ...galatians,
      { bookId: 'jhn', chapter: 14, verse: 27 },
      { bookId: 'php', chapter: 4, verse: 7 },
      { bookId: 'isa', chapter: 26, verse: 3 },
      { bookId: 'col', chapter: 3, verse: 15 },
    ],
    practice: [
      {
        en: 'Tell God one worry in a single sentence, then leave the phone for a few minutes.',
        es: 'Di a Dios una preocupación en una sola frase, y deja el teléfono unos minutos.',
        pt: 'Diga a Deus uma preocupação em uma só frase, e deixe o telefone por alguns minutos.',
      },
      {
        en: 'Where a sharp word is ready, speak one quiet sentence instead.',
        es: 'Donde ya tienes lista una palabra áspera, di en su lugar una frase serena.',
        pt: 'Onde uma palavra áspera já está pronta, diga no lugar dela uma frase serena.',
      },
    ],
  },
  {
    id: 'patience',
    categoryId: 'cat-fruit-patience',
    labelKey: 'catFruitPatience',
    glyph: 'hourglass',
    aliases: ['longsuffering', 'long suffering', 'tolerancia', 'longanimidad'],
    passages: [
      ...galatians,
      { bookId: 'jas', chapter: 1, verse: 4 },
      { bookId: 'col', chapter: 3, verse: 12 },
      { bookId: 'eph', chapter: 4, verse: 2 },
      { bookId: 'rom', chapter: 12, verse: 12 },
    ],
    practice: [
      {
        en: 'When you are kept waiting, pray for the person you are waiting on.',
        es: 'Cuando te hagan esperar, ora por la persona a quien esperas.',
        pt: 'Quando o fizerem esperar, ore pela pessoa por quem você espera.',
      },
      {
        en: 'Let the first message be enough for an hour. Do not send the second one yet.',
        es: 'Deja que el primer mensaje baste por una hora. No envíes todavía el segundo.',
        pt: 'Deixe que a primeira mensagem baste por uma hora. Não envie ainda a segunda.',
      },
    ],
  },
  {
    id: 'kindness',
    categoryId: 'cat-fruit-kindness',
    labelKey: 'catFruitKindness',
    glyph: 'hand',
    aliases: [],
    passages: [
      ...galatians,
      { bookId: 'eph', chapter: 4, verse: 32 },
      { bookId: 'col', chapter: 3, verse: 12 },
      { bookId: 'tit', chapter: 3, verse: 4 },
      { bookId: 'luk', chapter: 6, verse: 35 },
    ],
    practice: [
      {
        en: 'Do one kindness the other person cannot repay.',
        es: 'Haz un favor sencillo que la otra persona no pueda pagarte.',
        pt: 'Faça um favor simples que a outra pessoa não possa pagar.',
      },
      {
        en: 'Speak one sentence that lets someone know you saw them.',
        es: 'Di una frase que le haga saber a alguien que lo viste.',
        pt: 'Diga uma frase que mostre a alguém que você o viu.',
      },
    ],
  },
  {
    id: 'goodness',
    categoryId: 'cat-fruit-goodness',
    labelKey: 'catFruitGoodness',
    glyph: 'leaf',
    aliases: [],
    passages: [
      ...galatians,
      { bookId: 'eph', chapter: 5, verse: 9 },
      { bookId: 'psa', chapter: 23, verse: 6 },
      { bookId: 'gal', chapter: 6, verse: 10 },
      { bookId: 'mic', chapter: 6, verse: 8 },
    ],
    practice: [
      {
        en: 'In one small choice you could bend, take the honest one.',
        es: 'En una decisión pequeña que podrías torcer, elige lo honesto.',
        pt: 'Numa decisão pequena que você poderia torcer, escolha o que é honesto.',
      },
      {
        en: 'Do good for someone outside the people you usually help.',
        es: 'Haz el bien a alguien que no está entre las personas a las que sueles ayudar.',
        pt: 'Faça o bem a alguém que não está entre as pessoas que você costuma ajudar.',
      },
    ],
  },
  {
    id: 'faithfulness',
    categoryId: 'cat-fruit-faithfulness',
    labelKey: 'catFruitFaithfulness',
    glyph: 'shield',
    aliases: ['faith'],
    passages: [
      ...galatians,
      { bookId: 'lam', chapter: 3, verse: 23 },
      { bookId: '1co', chapter: 4, verse: 2 },
      { bookId: 'psa', chapter: 36, verse: 5 },
      { bookId: 'heb', chapter: 10, verse: 23 },
    ],
    practice: [
      {
        en: 'Keep one promise you already made, even if it is small.',
        es: 'Cumple una promesa que ya hiciste, aunque sea pequeña.',
        pt: 'Cumpra uma promessa que você já fez, mesmo que seja pequena.',
      },
      {
        en: 'Show up for the person or the task you said you would not leave.',
        es: 'Preséntate por la persona o la tarea que dijiste que no ibas a dejar.',
        pt: 'Apareça pela pessoa ou pela tarefa que você disse que não ia deixar.',
      },
    ],
  },
  {
    id: 'gentleness',
    categoryId: 'cat-fruit-gentleness',
    labelKey: 'catFruitGentleness',
    glyph: 'lamb',
    aliases: ['meekness'],
    passages: [
      ...galatians,
      { bookId: 'mat', chapter: 5, verse: 5 },
      { bookId: 'mat', chapter: 11, verse: 29 },
      { bookId: 'gal', chapter: 6, verse: 1 },
      { bookId: 'col', chapter: 3, verse: 12 },
    ],
    practice: [
      {
        en: 'If you must correct someone, use a quiet voice and no audience.',
        es: 'Si tienes que corregir a alguien, usa una voz baja y sin público.',
        pt: 'Se precisar corrigir alguém, use uma voz baixa e sem plateia.',
      },
      {
        en: 'Let someone else have the last word once today.',
        es: 'Deja que otra persona tenga la última palabra una vez hoy.',
        pt: 'Deixe que outra pessoa tenha a última palavra uma vez hoje.',
      },
    ],
  },
  {
    id: 'self-control',
    categoryId: 'cat-fruit-self-control',
    labelKey: 'catFruitSelfControl',
    glyph: 'crown',
    aliases: ['temperance'],
    passages: [
      ...galatians,
      { bookId: '2pe', chapter: 1, verse: 6 },
      { bookId: 'tit', chapter: 2, verse: 12 },
      { bookId: 'pro', chapter: 25, verse: 28 },
      { bookId: '1co', chapter: 9, verse: 25 },
    ],
    practice: [
      {
        en: 'Pause before the thing you reach for too quickly. One slow breath and a short prayer.',
        es: 'Haz una pausa antes de aquello que tomas demasiado rápido. Una respiración lenta y una oración breve.',
        pt: 'Faça uma pausa antes daquilo que você pega depressa demais. Uma respiração lenta e uma oração breve.',
      },
      {
        en: 'Stop one sentence before it becomes more than the truth.',
        es: 'Detén la frase antes de que diga más que la verdad.',
        pt: 'Pare a frase antes que ela diga mais do que a verdade.',
      },
    ],
  },
]

export const FRUIT_CATEGORY_LABEL: Record<string, MessageKey> = Object.fromEntries(
  FRUITS.map((fruit) => [fruit.categoryId, fruit.labelKey]),
)

const bookIndexById = new Map(BOOKS.map((book, index) => [book.id, index]))

export function fruitRefs(fruit: Fruit): PassageRef[] {
  return fruit.passages.map((passage) => {
    const bookIndex = bookIndexById.get(passage.bookId)
    if (bookIndex === undefined) throw new Error(passage.bookId)
    return { bookIndex, chapter: passage.chapter, verse: passage.verse }
  })
}

export function fruitById(id: string): Fruit | undefined {
  return FRUITS.find((fruit) => fruit.id === id)
}

export function fruitLabel(language: Language, fruit: Fruit): string {
  return messages[language][fruit.labelKey]
}

function normalizeTheme(value: string): string {
  return fold(value)
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const UMBRELLA = [
  'fruit of the spirit',
  'fruits of the spirit',
  'the fruit of the spirit',
  'the fruits of the spirit',
  'fruto del espiritu',
  'frutos del espiritu',
  'el fruto del espiritu',
  'fruto do espirito',
  'frutos do espirito',
  'o fruto do espirito',
]

/** Fruits whose name, in any language, matches this Topics query. */
export function fruitsMatchingQuery(query: string): Fruit[] {
  const normalized = normalizeTheme(query)
  if (normalized.length < 2) return []
  if (UMBRELLA.some((phrase) => phrase === normalized || (normalized.length >= 5 && phrase.startsWith(normalized)))) {
    return [...FRUITS]
  }
  return FRUITS.filter((fruit) => {
    const labels = (['en', 'es', 'pt'] as const).map((language) => normalizeTheme(fruitLabel(language, fruit)))
    if (labels.some((label) => label === normalized)) return true
    if (fruit.aliases.some((alias) => alias === normalized)) return true
    if (normalized.length >= 3 && labels.some((label) => label.startsWith(normalized))) return true
    return false
  })
}

export function fruitEnglishKeys(fruits: readonly Fruit[]): Set<string> {
  return new Set(fruits.map((fruit) => normalizeTheme(fruitLabel('en', fruit))))
}
