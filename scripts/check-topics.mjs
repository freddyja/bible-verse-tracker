/**
 * Checks that Topics search uses the Open Bible index, not a generated list.
 */
import { readFileSync } from 'node:fs'
import { BOOKS } from '../src/scripture/books.ts'
import { parseTopicIndex, selectTopicGroups, topicScore } from '../src/scripture/topics.ts'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const bookIndex = Object.fromEntries(BOOKS.map((book, index) => [book.id, index]))
const index = parseTopicIndex(JSON.parse(readFileSync('public/scripture/topics.json', 'utf8')))
assert(index.length > 1000, 'the topical index is the real Open Bible list, not a handful of headings')

const fear = selectTopicGroups(index, 'fear')
assert(fear[0]?.name === 'fear', 'the exact topic fear ranks first')
assert(
  fear.some((group) => group.name === 'fear and anxiety'),
  'fear also matches the topic fear and anxiety',
)
assert(
  fear.some((group) => group.name === 'fear not' || group.name === 'fear of the lord'),
  'partial topic names such as fear not or fear of the lord match',
)

const fearRefs = fear[0].refs
const joshua = fearRefs.find((ref) => ref.bookIndex === bookIndex.jos && ref.chapter === 1 && ref.verse === 9)
assert(joshua, 'fear lists Joshua 1:9')
const joshuaText = JSON.parse(readFileSync('public/scripture/en/jos.json', 'utf8'))[0][8]
assert(/afraid/i.test(joshuaText), 'Joshua 1:9 is the be-not-afraid verse')
assert(!/\bfear\b/i.test(joshuaText), 'Joshua 1:9 does not contain the word fear')

const anxietyGroup = fear.find((group) => group.name === 'fear and anxiety')
assert(
  anxietyGroup?.refs.some((ref) => ref.bookIndex === bookIndex.php && ref.chapter === 4 && ref.verse === 6),
  'fear and anxiety lists Philippians 4:6',
)
const philippians = JSON.parse(readFileSync('public/scripture/en/php.json', 'utf8'))[3][5]
assert(/careful/i.test(philippians), 'Philippians 4:6 is the worry verse')
assert(!/\bfear\b/i.test(philippians), 'Philippians 4:6 does not contain the word fear')

const anxiety = selectTopicGroups(index, 'anxiety')
assert(anxiety[0]?.name === 'anxiety', 'the exact topic anxiety ranks first')
assert(selectTopicGroups(index, 'zzzznotatheme').length === 0, 'an unknown theme matches nothing')
assert(topicScore('the fear of god', 'FEAR of God') === 2, 'partial names match without case')
assert(topicScore('courage', 'fear') === null, 'courage is not invented as a match for fear')

for (const topic of index) {
  assert(topic.name.trim().length > 0, 'every topic has a name from the source')
  assert(topic.refs.length > 0 && topic.refs.length <= 12, `${topic.name} keeps at most twelve references`)
  for (const ref of topic.refs) {
    const book = BOOKS[ref.bookIndex]
    assert(book, `${topic.name} uses a known book`)
    assert(ref.chapter >= 1 && ref.chapter <= book.chapters, `${topic.name} stays inside ${book.id}`)
    assert(ref.verse >= 1, `${topic.name} has a verse number`)
    if (ref.endVerse !== undefined) {
      assert(ref.endVerse > ref.verse && ref.endVerse - ref.verse <= 5, `${topic.name} keeps only a short range`)
    }
  }
}

const license = readFileSync('public/scripture/topics-license.txt', 'utf8')
assert(/Creative Commons Attribution 4\.0/.test(license), 'the license names CC BY 4.0')
assert(/openbible\.info\/topics/.test(license), 'the license cites Open Bible')
assert(/adapted material/i.test(license), 'the license says what was changed')
assert(!/English Standard Version/i.test(license), 'the topical file does not claim the ESV text')

console.log(`topics ok (${index.length} topics; fear shows ${fear.map((group) => group.name).join(', ')})`)
