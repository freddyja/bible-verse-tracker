/**
 * Renders a few well-known verses in every bundled edition and checks that
 * Jesus’s words (and a few clear divine speeches) are the spans that turn red.
 */
import { readFileSync } from 'node:fs'

const { spokenParts } = await import('../src/scripture/redLetter.ts')
const { BOOKS } = await import('../src/scripture/books.ts')

function bookIndex(id) {
  return BOOKS.findIndex((book) => book.id === id)
}

function verse(folder, id, chapter, verseNumber) {
  const data = JSON.parse(readFileSync(`public/scripture/${folder}/${id}.json`, 'utf8'))
  return data[chapter - 1][verseNumber - 1]
}

function show(folder, id, chapter, verseNumber) {
  const text = verse(folder, id, chapter, verseNumber)
  const parts = spokenParts(bookIndex(id), chapter, verseNumber, text)
  return parts.map((part) => (part.spoken ? `⟦${part.text}⟧` : part.text)).join('')
}

function spokenText(folder, id, chapter, verseNumber) {
  const text = verse(folder, id, chapter, verseNumber)
  return spokenParts(bookIndex(id), chapter, verseNumber, text)
    .filter((part) => part.spoken)
    .map((part) => part.text)
    .join('')
}

const samples = [
  ['en', 'jhn', 3, 16],
  ['en', 'mat', 5, 3],
  ['en', 'jhn', 11, 25],
  ['en', 'jhn', 14, 6],
  ['en', 'mat', 4, 4],
  ['en', 'mat', 4, 3],
  ['en', 'mat', 3, 17],
  ['en', 'isa', 1, 2],
  ['en', 'isa', 1, 3],
  ['en', 'isa', 1, 4],
  ['en', 'gen', 1, 3],
  ['en', 'act', 9, 5],
  ['en', 'rev', 22, 20],
  ['en', 'psa', 23, 1],
  ['bsb', 'mat', 4, 19],
  ['web', 'jhn', 14, 6],
  ['es', 'jhn', 14, 6],
  ['es', 'mat', 5, 3],
  ['pt', 'jhn', 3, 16],
  ['nva', 'jhn', 11, 25],
  ['ylt', 'mat', 4, 19],
  ['nheb', 'mat', 3, 17],
]

for (const sample of samples) console.log(sample.join(' '), '\n ', show(...sample))

const failures = []
function expect(name, ok) {
  if (!ok) failures.push(name)
}

expect('kjv john 3:16 all red', spokenText('en', 'jhn', 3, 16).includes('For God so loved'))
expect('kjv matt 5:3 all red', spokenText('en', 'mat', 5, 3).startsWith('Blessed'))
expect('kjv john 11 intro plain', !spokenText('en', 'jhn', 11, 25).includes('Jesus said'))
expect('kjv john 11 words red', spokenText('en', 'jhn', 11, 25).includes('I am the resurrection'))
expect('kjv devil plain', spokenText('en', 'mat', 4, 3) === '')
expect('kjv temptation red', spokenText('en', 'mat', 4, 4).includes('shall not live'))
expect('kjv father red', spokenText('en', 'mat', 3, 17).includes('beloved Son'))
expect('kjv father intro plain', !spokenText('en', 'mat', 3, 17).includes('voice from heaven'))
expect('kjv isa 1:4 plain', spokenText('en', 'isa', 1, 4) === '')
expect('kjv isa 1:3 red', spokenText('en', 'isa', 1, 3).includes('ox'))
expect('kjv let there be light', spokenText('en', 'gen', 1, 3).includes('Let there be light'))
expect('kjv and there was light plain', !spokenText('en', 'gen', 1, 3).includes('there was light'))
expect('kjv ps 23 plain', spokenText('en', 'psa', 23, 1) === '')
expect('bsb follow me red', /follow me/i.test(spokenText('bsb', 'mat', 4, 19)))
expect('bsb jesus said plain', !/jesus said/i.test(spokenText('bsb', 'mat', 4, 19)))
expect('kjv saul question plain', !spokenText('en', 'act', 9, 5).includes('Who art thou'))
expect('es john 14 red', spokenText('es', 'jhn', 14, 6).includes('Yo soy'))
expect('es john 14 intro plain', !spokenText('es', 'jhn', 14, 6).includes('Jesús'))
expect('pt john 3:16 red', spokenText('pt', 'jhn', 3, 16).includes('Deus amou'))
expect('web quote red', spokenText('web', 'jhn', 14, 6).includes('I am the way'))

if (failures.length) {
  console.error('\nFAILED\n' + failures.join('\n'))
  process.exit(1)
}
console.log('\nchecks passed')
