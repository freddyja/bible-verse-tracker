/**
 * Checks that a verse picks the tightest covering note, and that the
 * bundled Matthew Henry text still matches a few known passages.
 */
import { readFileSync } from 'node:fs'

const { pickMeaning } = await import('../src/scripture/meaning.ts')
const { pickContext } = await import('../src/scripture/studyNotes.ts')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function load(id) {
  return JSON.parse(readFileSync(`public/scripture/meaning/${id}.json`, 'utf8'))
}

function loadContext(id) {
  return JSON.parse(readFileSync(`public/scripture/context/${id}.json`, 'utf8'))
}

assert(pickMeaning(undefined, 1) === null, 'a missing chapter has no note')
assert(pickMeaning([], 1) === null, 'an empty chapter has no note')
assert(pickMeaning([[1, 2, 'pair']], 3) === null, 'a verse outside the range has no note')

const covering = pickMeaning([[1, 2, 'pair']], 2)
assert(covering?.start === 1 && covering.end === 2 && covering.text === 'pair', 'a range covers its last verse')

const tightest = pickMeaning(
  [
    [1, 10, 'wide'],
    [4, 5, 'tight'],
  ],
  4,
)
assert(tightest?.text === 'tight', 'the shortest covering range is the one shown')

const genesis = pickMeaning(load('gen')['1'], 1)
assert(
  genesis?.start === 1 &&
    genesis.end === 2 &&
    genesis.text.startsWith('The first verse of the Bible'),
  'Genesis 1:1 uses the public-domain note for verses 1–2',
)
assert(pickMeaning(load('gen')['1'], 3)?.start === 3, 'Genesis 1:3 is the next note')

const shepherd = pickMeaning(load('psa')['23'], 4)
assert(
  shepherd?.start === 1 && shepherd.end === 6 && shepherd.text.includes('shepherd'),
  'Psalm 23 is one note for the whole psalm',
)

assert(pickMeaning(load('jhn')['3'], 16) === null, 'John 3:16 has no note in the concise commentary')
const nicodemus = pickMeaning(load('jhn')['3'], 8)
assert(nicodemus?.start === 1 && nicodemus.end === 8, 'John 3:8 stays inside verses 1–8')

const loved = pickMeaning(loadContext('jhn')['3'], 16)
assert(loved?.start === 16 && loved.end === 16, 'John 3:16 uses the verse Henry marked')
assert(loved && /so loved the world/i.test(loved.text), 'John 3:16 keeps Henry’s words on God’s love')
assert(loved && /only-begotten/i.test(loved.text), 'John 3:16 keeps Henry’s words on the Son')
assert(loved && !loved.text.startsWith('We found'), 'John 3:16 is not the wide opening of the section')
assert(loved && !/_{6,}/.test(loved.text), 'print rules are not left in the John 3:16 note')
assert(pickContext(null, loved)?.source === 'complete', 'a concise gap uses the complete commentary')
assert(pickContext(nicodemus, loved)?.source === 'concise', 'a concise note is shown ahead of the complete commentary')

const war = pickMeaning(loadContext('deu')['20'], 13)
assert(war && war.start <= 13 && war.end >= 13, 'Deuteronomy 20:13 has a complete-commentary note')
assert(war && !/_{6,}/.test(war.text), 'print rules are not left in the Deuteronomy note')

const mirth = pickMeaning(loadContext('pro')['14'], 13)
assert(mirth && /laughter|mirth/i.test(mirth.text), 'Proverbs 14:13 keeps Henry’s note on laughter')

const isaiah = pickMeaning(load('isa')['53'], 5)
assert(isaiah && isaiah.start <= 5 && isaiah.end >= 5, 'Isaiah 53:5 has a note')

console.log('meaning checks passed')
