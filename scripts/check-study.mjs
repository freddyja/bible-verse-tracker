/**
 * Checks that study notes are copied from the free sources, not filled in.
 */
import { existsSync, readFileSync } from 'node:fs'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const today = JSON.parse(readFileSync('public/scripture/study/today/gen.json', 'utf8'))
const promise = today['3']['15']
assert(/The Bible's First Promise/.test(promise), 'Genesis 3:15 keeps Spurgeon’s title')
assert(/first promise to fallen man/.test(promise), 'Genesis 3:15 keeps Spurgeon’s comment')
assert(!/\(Genesis 3:15\)/.test(promise), 'the repeated verse quotation is not stored again')

const romans = JSON.parse(readFileSync('public/scripture/study/then/rom.json', 'utf8'))
assert(romans.book.includes('Paul'), 'Romans keeps the introduction’s account of Paul')
assert(/Rome/.test(romans.book), 'Romans keeps the introduction’s account of the readers')
assert(!/How should the title/i.test(romans.book), 'title-translation advice is not part of Then')
assert(!/Important Translation Issues/i.test(romans.book), 'translator issues are not part of Then')
assert(!romans.book.includes('](') && !romans.book.includes('rc://'), 'markdown links are not left in the audience note')

const psalms = JSON.parse(readFileSync('public/scripture/study/today/psa.json', 'utf8'))
assert(/146/.test(Object.keys(psalms).join(',')) && psalms['146']?.['8'], 'Psalm 146:8 keeps the reading whose citation used a printed l')
assert(!existsSync('public/scripture/study/then/psa.json'), 'Psalms has no audience note in this source, so the file is absent')
assert(!existsSync('public/scripture/study/then/isa.json'), 'Isaiah has no audience note in this source, so the file is absent')

const johnToday = existsSync('public/scripture/study/today/jhn.json')
  ? JSON.parse(readFileSync('public/scripture/study/today/jhn.json', 'utf8'))
  : {}
assert(!johnToday['1']?.['1'], 'John 1:1 is not given a today note it was not written for')

console.log('study checks passed')
