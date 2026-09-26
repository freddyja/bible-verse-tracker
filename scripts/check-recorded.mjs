/**
 * Checks that recorded Scripture audio stays on free public-domain texts.
 */
import {
  bibleRank,
  parseChapterClips,
  parseTimestamps,
  playbackQueue,
  selectAudioFilesets,
  verseAtTime,
} from '../src/audio/bibleBrain.ts'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(bibleRank('en', 'ENGKJV', 'King James Version') === 0, 'KJV is the first English recording')
assert(bibleRank('en', 'ENGWEB', 'World English Bible') === 1, 'WEB follows KJV')
assert(bibleRank('en', 'ENGESV', 'English Standard Version') === null, 'ESV audio is not requested')
assert(bibleRank('en', 'ENGNIV', 'New International Version') === null, 'NIV audio is not requested')
assert(bibleRank('en', 'ENGNKJ', 'New King James Version') === null, 'New King James audio is not requested')
assert(bibleRank('es', 'SPAR09', 'Reina-Valera 1909') === 0, 'Reina-Valera 1909 is the Spanish recording')
assert(bibleRank('es', 'SPAR60', 'Reina-Valera 1960') === null, 'Reina-Valera 1960 audio is not requested')
assert(bibleRank('pt', 'PORBLV', 'Bíblia Livre') === 0, 'Bíblia Livre can be a Portuguese recording')
assert(bibleRank('pt', 'PORNVI', 'Nova Versão Internacional') === null, 'NVI audio is not requested')

const filesets = selectAudioFilesets(
  [
    { id: 'ENGESVN2DA', type: 'audio_drama', size: 'NT' },
    { id: 'ENGKJVN1DA', type: 'audio', size: 'NT' },
    { id: 'ENGKJVN2DA', type: 'audio_drama', size: 'NT' },
    { id: 'ENGKJVO2DA', type: 'audio_drama', size: 'OT' },
    { id: 'ENGKJVN2DA-opus16', type: 'audio_drama', size: 'NT' },
  ],
  'nt',
)
assert(filesets[0]?.id === 'ENGKJVN2DA', 'dramatized KJV mp3 is chosen before other KJV filesets')
assert(
  filesets.every((fileset) => !fileset.id.includes('ESV')),
  'an ESV fileset is dropped even beside KJV',
)
assert(
  filesets.every((fileset) => !fileset.id.includes('O2DA')),
  'an Old Testament fileset is not used for the New Testament',
)

const clips = parseChapterClips({
  data: [
    {
      book_id: 'JHN',
      verse_start: '1',
      verse_end: '36',
      path: 'https://cdn.example/jhn-3.mp3?signature=1',
    },
    { path: '/relative/not-used.mp3', verse_start: 1 },
  ],
})
assert(clips.length === 1, 'only an absolute recording URL is kept')
assert(clips[0].verseEnd === 36, 'the chapter clip keeps its verse span')

const marks = parseTimestamps({
  data: [
    { verse_start: '2', timestamp: 9.5 },
    { verse_start: '1', timestamp: 0.2 },
    { verse_start: '1', timestamp: 4 },
  ],
})
assert(marks.length === 2 && marks[0].verse === 1 && marks[1].verse === 2, 'verse timings stay in order')

const chapter = {
  filesetId: 'ENGKJVN2DA',
  label: 'King James Version',
  bookIndex: 42,
  chapter: 3,
  clips,
  marks,
}
assert(playbackQueue(chapter, 'verse', 2)?.[0].start === 9.5, 'a verse seeks to its timestamp')
assert(playbackQueue(chapter, 'verse', 9) === null, 'a verse without a timestamp is left to the phone voice')
assert(playbackQueue(chapter, 'chapter', 1)?.[0].start === 0, 'a chapter plays from the start of the file')
assert(verseAtTime(10, marks) === 2, 'playback time maps back to the verse')

console.log('recorded scripture checks passed')
