/**
 * Checks Gospel Q&A routing and that every cited verse exists in the bundled texts.
 */
import { readFileSync } from 'node:fs'
import { classifyQuestion } from '../src/gospel/guard.ts'
import { pickPack } from '../src/gospel/match.ts'
import { PACKS } from '../src/gospel/packs.ts'
import { findBookQuery, findReference } from '../src/gospel/reference.ts'
import { FIXED_REFS } from '../src/gospel/replies.ts'
import { BOOKS } from '../src/scripture/books.ts'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const bookIndex = Object.fromEntries(BOOKS.map((book, index) => [book.id, index]))

const routes = [
  ['What is the gospel?', 'gospel'],
  ['how can I be saved?', 'gospel'],
  ['¿Qué es el evangelio?', 'gospel'],
  ['como puedo ser salvo', 'gospel'],
  ['O que é o evangelho?', 'gospel'],
  ['como posso ser salvo', 'gospel'],
  ['Who is Jesus?', 'jesus'],
  ['¿Quién es Jesús?', 'jesus'],
  ['Quem é Jesus?', 'jesus'],
  ['How should I pray?', 'prayer'],
  ['¿Cómo debo orar?', 'prayer'],
  ['Como devo orar?', 'prayer'],
  ['ele irá orar', 'prayer'],
  ['solo quiero orar', 'prayer'],
  ['forgiveness', 'forgiveness'],
  ['perdón', 'forgiveness'],
  ['perdão', 'forgiveness'],
  ['I am afraid', 'fear'],
  ['tengo miedo', 'fear'],
  ['estou com medo', 'fear'],
  ['what does the bible say about healing', 'healing'],
  ['fruit of the spirit', 'fruit'],
  ['fruto del espíritu', 'fruit'],
  ['fruto do espírito', 'fruit'],
  ['love', 'love'],
  ['faith', 'faith'],
  ['faithfulness', 'fruit'],
  ['paz', 'peace'],
  ['bondad', 'fruit'],
  ['what happens when we die', 'judgment'],
  ['¿qué pasa cuando morimos?', 'judgment'],
  ['o que acontece quando morremos', 'judgment'],
  ['contentment', 'contentment'],
  ['be content', 'contentment'],
  ['contentamiento', 'contentment'],
  ['contentamento', 'contentment'],
  ['baptism', 'baptism'],
  ['what is baptism', 'baptism'],
  ['bautismo', 'baptism'],
  ['batismo', 'baptism'],
  ['Who is Jesus?', 'jesus'],
  ['perdón', 'forgiveness'],
  ['temor', 'fear'],
  ['What does Scripture say about fear?', 'fear'],
  ['¿Qué dice la Escritura sobre el miedo?', 'fear'],
  ['O que a Escritura diz sobre o medo?', 'fear'],
  ['What does Scripture say about forgiveness?', 'forgiveness'],
  ['humility', 'humility'],
  ['humildad', 'humility'],
  ['humildade', 'humility'],
  ['pride', 'pride'],
  ['orgullo', 'pride'],
  ['soberbia', 'pride'],
  ['orgulho', 'pride'],
  ['what does the bible say about contentment', 'contentment'],
  ['what about humility', 'humility'],
]

for (const [question, id] of routes) {
  const pack = pickPack(question)
  assert(pack?.id === id, `${question} should open ${id}, got ${pack?.id ?? 'nothing'}`)
}

assert(pickPack('John') === null, 'a book name is not forced into a theme')
assert(pickPack('gracias') === null, 'gracias is not the theme grace')
assert(pickPack('ele irá orar')?.id === 'prayer', 'irá is not the theme anger')
assert(pickPack('What does Scripture say about fear?')?.id === 'fear', 'scripture framing must not steal fear')

const guards = [
  ['I want to die', 'care'],
  ['quiero morir', 'care'],
  ['quero morrer', 'care'],
  ['what medicine should I take', 'medical'],
  ['¿qué medicamento debo tomar?', 'medical'],
  ['qual remédio devo tomar', 'medical'],
  ['should I sue my neighbor', 'legal'],
  ['¿debo demandar a mi vecino?', 'legal'],
  ['devo processar meu vizinho', 'legal'],
  ['what does the bible say about healing', null],
  ['o evangelho é legal', null],
  ['what happens when we die', null],
  ['John 3:16', null],
]

for (const [question, kind] of guards) {
  assert(classifyQuestion(question) === kind, `${question} should guard as ${kind}, got ${classifyQuestion(question)}`)
}

const refs = [
  ['what does John 3:16 mean', 'jhn', 3, 16],
  ['¿Qué significa Juan 3:16?', 'jhn', 3, 16],
  ['João 3,16', 'jhn', 3, 16],
  ['Salmos 23:1', 'psa', 23, 1],
  ['1 Juan 4:8', '1jn', 4, 8],
  ['1 João 4:8', '1jn', 4, 8],
]

for (const [question, bookId, chapter, verse] of refs) {
  const hit = findReference(question)
  assert(
    hit?.bookIndex === bookIndex[bookId] && hit.chapter === chapter && hit.verse === verse,
    `${question} should cite ${bookId} ${chapter}:${verse}`,
  )
}

assert(findBookQuery('John') === bookIndex.jhn, 'John opens the book')
assert(findBookQuery('Evangelio de Juan') === bookIndex.jhn, 'Evangelio de Juan opens John')
assert(findBookQuery('Evangelho de João') === bookIndex.jhn, 'Evangelho de João opens John')
assert(findBookQuery('what is the gospel') === null, 'a theme question is not a book')

const folders = ['en', 'web', 'asv', 'ylt', 'darby', 'webster', 'nheb', 'bsb', 'geneva', 'es', 'rv1865', 'pt', 'blivre-tr', 'nva']
const cited = [
  ...PACKS.flatMap((pack) => pack.refs.map((ref) => ({ pack: pack.id, ...ref }))),
  ...FIXED_REFS.map((ref) => ({ pack: 'fixed', ...ref })),
]

for (const folder of folders) {
  const cache = new Map()
  for (const ref of cited) {
    let chapters = cache.get(ref.bookId)
    if (!chapters) {
      chapters = JSON.parse(readFileSync(`public/scripture/${folder}/${ref.bookId}.json`, 'utf8'))
      cache.set(ref.bookId, chapters)
    }
    const text = chapters[ref.chapter - 1]?.[ref.verse - 1]
    assert(
      typeof text === 'string' && text.trim().length > 0,
      `${folder} is missing ${ref.pack} ${ref.bookId} ${ref.chapter}:${ref.verse}`,
    )
  }
}

const english = JSON.parse(readFileSync('public/scripture/en/jhn.json', 'utf8'))[2][15]
const spanish = JSON.parse(readFileSync('public/scripture/es/jhn.json', 'utf8'))[2][15]
const portuguese = JSON.parse(readFileSync('public/scripture/pt/jhn.json', 'utf8'))[2][15]
assert(/God so loved/i.test(english), 'English John 3:16 is the King James verse')
assert(/amó Dios al mundo/i.test(spanish), 'Spanish John 3:16 is the Reina-Valera verse')
assert(/Deus amou ao mundo/i.test(portuguese), 'Portuguese John 3:16 is the Bíblia Livre verse')

console.log(`gospel checks passed (${cited.length} verses in ${folders.length} texts)`)
