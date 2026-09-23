/**
 * Checks Strong's id normalization and a few bundled Greek and Hebrew verses.
 */
import { readFileSync } from 'node:fs'

const { baseStrong, normalizeStrong, wordFromRow } = await import('../src/scripture/lexicon.ts')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(normalizeStrong('G0976') === 'G976', 'leading zeros are dropped')
assert(normalizeStrong('H7225G') === 'H7225G', 'a disambiguating letter stays')
assert(baseStrong('H7225G') === 'H7225', 'the base id drops the letter')
assert(wordFromRow(['', 'a', 'G1', 'x']) === null, 'a blank surface is not a word')

function words(book, chapter, verse) {
  const table = JSON.parse(readFileSync(`public/scripture/lexicon/words/${book}.json`, 'utf8'))
  return table[chapter][verse].map(wordFromRow)
}

const john = words('jhn', '3', '16')
assert(john.some((word) => word?.strong === 'G25' || word?.strong === 'G25A'), 'John 3:16 includes ἀγαπάω')
assert(john.every((word) => word && word.surface.length > 0 && word.strong.startsWith('G')), 'John 3:16 is Greek')
assert(john.some((word) => /[Α-ωἀ-ῶ]/.test(word.surface)), 'John 3:16 shows Greek letters')

const greek = JSON.parse(readFileSync('public/scripture/lexicon/greek.json', 'utf8'))
const love = greek.G26
assert(love && love[0].includes('ἀγ'), 'G26 keeps the Greek lemma')
assert(/love/i.test(love[2]), 'G26 gloss is love')
assert(john.every((word) => greek[word.strong] || greek[baseStrong(word.strong)]), 'each John 3:16 word has a lexicon entry')

const genesis = words('gen', '1', '1')
assert(
  genesis.some((word) => word?.strong.startsWith('H1254')),
  'Genesis 1:1 includes the Hebrew verb for create',
)
assert(genesis.every((word) => word && word.strong.startsWith('H')), 'Genesis 1:1 is Hebrew')
assert(genesis.some((word) => /[\u0590-\u05FF]/.test(word.surface)), 'Genesis 1:1 shows Hebrew letters')

const hebrew = JSON.parse(readFileSync('public/scripture/lexicon/hebrew.json', 'utf8'))
assert(genesis.every((word) => hebrew[word.strong] || hebrew[baseStrong(word.strong)]), 'each Genesis 1:1 word has a lexicon entry')

console.log('lexicon checks passed')
