/**
 * Voice selection checks. Run with: npx vite-node scripts/check-voices.ts
 * These lock the Male rules used by Settings preview and Read Out Loud.
 */
import type { VoicePrefs } from '../src/speech/prefs'

type VoiceInit = {
  name: string
  lang?: string
  voiceURI?: string
  localService?: boolean
  default?: boolean
}

const nav = {
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0',
  platform: 'Linux',
  maxTouchPoints: 0,
}

Object.defineProperty(globalThis, 'navigator', { value: nav, configurable: true })

const store = new Map<string, string>()
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
  },
  configurable: true,
})

let installed: SpeechSynthesisVoice[] = []

class FakeUtterance {
  text: string
  voice: SpeechSynthesisVoice | null = null
  lang = ''
  pitch = 1
  rate = 1
  volume = 1
  constructor(text: string) {
    this.text = text
  }
}

Object.defineProperty(globalThis, 'window', {
  value: {
    speechSynthesis: {
      getVoices: () => installed,
      speaking: false,
      pending: false,
      cancel() {},
      addEventListener() {},
      removeEventListener() {},
    },
  },
  configurable: true,
})

Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
  value: FakeUtterance,
  configurable: true,
})

const voices = await import('../src/speech/voices')

const male: VoicePrefs = { gender: 'male', style: 'clear' }
const female: VoicePrefs = { gender: 'female', style: 'clear' }

function voice(init: VoiceInit): SpeechSynthesisVoice {
  return {
    name: init.name,
    lang: init.lang ?? 'en-US',
    voiceURI: init.voiceURI ?? init.name,
    localService: init.localService ?? true,
    default: init.default ?? false,
  } as SpeechSynthesisVoice
}

function setPlatform(kind: 'ios' | 'android' | 'desktop') {
  if (kind === 'ios') {
    nav.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Version/17.5 Mobile/15E148 Safari/604.1'
    nav.platform = 'iPhone'
    nav.maxTouchPoints = 5
    return
  }
  if (kind === 'android') {
    nav.userAgent = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36'
    nav.platform = 'Linux armv8l'
    nav.maxTouchPoints = 5
    return
  }
  nav.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0'
  nav.platform = 'Linux'
  nav.maxTouchPoints = 0
}

function picked(list: SpeechSynthesisVoice[], language: 'en' | 'es' | 'pt', prefs: VoicePrefs) {
  installed = list
  const voice = voices.selectVoice(list, language, prefs)
  return voice ? `${voice.name} ${voice.voiceURI}` : undefined
}

function spoken(list: SpeechSynthesisVoice[], language: 'en' | 'es' | 'pt', prefs: VoicePrefs) {
  installed = list
  const utterance = new FakeUtterance('In the beginning God created the heaven and the earth.')
  voices.applyVoice(utterance as unknown as SpeechSynthesisUtterance, language, prefs)
  return {
    voice: utterance.voice ? `${utterance.voice.name} ${utterance.voice.voiceURI}` : '',
    pitch: utterance.pitch,
    rate: utterance.rate,
    lang: utterance.lang,
  }
}

const failures: string[] = []

function expect(cond: boolean, message: string) {
  if (!cond) failures.push(message)
}

const samantha = voice({ name: 'Samantha', voiceURI: 'com.apple.voice.compact.en-US.Samantha' })
const aaron = voice({ name: 'Aaron', voiceURI: 'com.apple.voice.compact.en-US.Aaron' })
const alex = voice({ name: 'Alex', voiceURI: 'com.apple.speech.synthesis.voice.Alex' })
const fred = voice({ name: 'Fred', voiceURI: 'com.apple.speech.synthesis.voice.Fred' })
const tpf = voice({
  name: 'English United States',
  lang: 'en_US',
  voiceURI: 'en-us-x-tpf-local',
})
const iom = voice({
  name: 'English United States',
  lang: 'en_US',
  voiceURI: 'en-us-x-iom-local',
})
const iol = voice({
  name: 'English United States',
  lang: 'en_US',
  voiceURI: 'en-us-x-iol-local',
})
const tpd = voice({
  name: 'English United States',
  lang: 'en_US',
  voiceURI: 'en-us-x-tpd-local',
})
const sfgFemale = voice({
  name: 'English United States',
  lang: 'en_US',
  voiceURI: 'en-us-x-sfg#female_2-local',
})
const sfgMale = voice({
  name: 'English United States',
  lang: 'en_US',
  voiceURI: 'en-us-x-sfg#male_1-local',
})
const googleUs = voice({
  name: 'Google US English',
  lang: 'en-US',
  voiceURI: 'Google US English',
  localService: false,
})
const googleUkMale = voice({
  name: 'Google UK English Male',
  lang: 'en-GB',
  voiceURI: 'Google UK English Male',
  localService: false,
})
const googleUkFemale = voice({
  name: 'Google UK English Female',
  lang: 'en-GB',
  voiceURI: 'Google UK English Female',
  localService: false,
})
const david = voice({ name: 'Microsoft David', lang: 'en-US', voiceURI: 'Microsoft David Desktop' })
const daniel = voice({ name: 'Daniel', lang: 'en-GB', voiceURI: 'com.apple.voice.compact.en-GB.Daniel' })
const jorge = voice({ name: 'Jorge', lang: 'es-ES', voiceURI: 'com.apple.voice.compact.es-ES.Jorge' })
const monica = voice({ name: 'Mónica', lang: 'es-ES', voiceURI: 'com.apple.voice.compact.es-ES.Monica' })
const felipe = voice({ name: 'Felipe', lang: 'pt-BR', voiceURI: 'com.apple.voice.compact.pt-BR.Felipe' })
const luciana = voice({ name: 'Luciana', lang: 'pt-BR', voiceURI: 'com.apple.voice.compact.pt-BR.Luciana' })

setPlatform('ios')
expect(picked([samantha], 'en', male) === undefined, 'iOS Samantha alone is not a male voice')
expect(voices.maleVoiceLabel([samantha], 'en', male).mode === 'pitch', 'iOS Samantha shows the pitch fallback')
expect(picked([samantha, aaron], 'en', male)?.includes('Aaron') === true, 'iOS prefers Aaron over Samantha')
expect(
  /Alex|Fred/.test(picked([samantha, alex, fred], 'en', male) || ''),
  'iOS uses Alex or Fred',
)
{
  const said = spoken([samantha], 'en', male)
  expect(said.voice === '', `iOS male fallback clears the voice, got ${said.voice}`)
  expect(said.pitch === 0.5, `iOS male fallback pitch is 0.5, got ${said.pitch}`)
  expect(said.rate < 0.96 && said.rate >= 0.55, `iOS male fallback is slower, got ${said.rate}`)
}
{
  const said = spoken([samantha], 'en', female)
  expect(said.voice.includes('Samantha'), `Female still uses Samantha, got ${said.voice}`)
  expect(said.pitch === 1, `Matched female pitch stays at the style pitch, got ${said.pitch}`)
  expect(said.rate === 0.96, `Female rate is unchanged, got ${said.rate}`)
}
{
  const said = spoken([aaron], 'en', male)
  expect(said.voice.includes('Aaron'), `Matched male voice is Aaron, got ${said.voice}`)
  expect(said.pitch === 1, `Matched male pitch stays natural, got ${said.pitch}`)
  expect(said.rate === 0.96, `Matched male rate stays at the style rate, got ${said.rate}`)
}

setPlatform('android')
expect(picked([tpf], 'en', male) === undefined, 'Android en-us-x-tpf is not male')
expect(picked([googleUs], 'en', male) === undefined, 'Android unlabeled Google US English is not male')
expect(voices.maleVoiceLabel([googleUs, tpf], 'en', male).mode === 'pitch', 'Android without a male code shows pitch fallback')
expect(picked([tpf, iom], 'en', male)?.includes('iom') === true, 'Android prefers en-us-x-iom over tpf')
expect(picked([tpf, iol, tpd], 'en', male)?.includes('iol') === true || picked([tpf, iol, tpd], 'en', male)?.includes('tpd') === true, 'Android iol and tpd count as male')
expect(picked([sfgFemale, sfgMale], 'en', male)?.includes('male_1') === true, 'Android #male wins over #female')
expect(picked([sfgFemale], 'en', male) === undefined, 'Android #female is refused')
expect(picked([googleUkMale, googleUkFemale, tpf], 'en', male) === undefined, 'Android does not use UK English for Male')
{
  const said = spoken([tpf, googleUs], 'en', male)
  expect(said.voice === '', `Android male fallback does not assign the female default, got ${said.voice}`)
  expect(said.pitch === 0.35, `Android male fallback pitch is 0.35, got ${said.pitch}`)
  expect(said.rate < 0.96, `Android male fallback is slower, got ${said.rate}`)
  expect(said.lang === 'en-US', `Fallback lang stays en-US, got ${said.lang}`)
}
{
  const said = spoken([tpf, iom], 'en', male)
  expect(said.voice.includes('iom') === true, `Android assigns the iom voice, got ${said.voice}`)
  expect(said.lang === 'en_US', `Android keeps the voice lang en_US, got ${said.lang}`)
  expect(said.pitch === 1, `Matched Android male pitch stays natural, got ${said.pitch}`)
}
{
  const said = spoken([tpf], 'en', female)
  expect(said.pitch >= 1.25, `Female fallback stays high, got ${said.pitch}`)
  expect(said.rate === 0.96, `Female fallback rate is unchanged, got ${said.rate}`)
}

setPlatform('desktop')
expect(picked([googleUs], 'en', male)?.includes('Google US English') === true, 'Desktop remote Google US English stays male')
expect(
  picked([voice({ name: 'Google US English', lang: 'en-US', voiceURI: 'Google US English', localService: true })], 'en', male)?.includes(
    'Google US English',
  ) === true,
  'Desktop local Google US English stays male',
)
expect(picked([googleUkMale, googleUs], 'en', male)?.includes('Google US English') === true, 'Desktop Male refuses UK English')
expect(picked([david, samantha], 'en', male)?.includes('David') === true, 'Microsoft David is male')
{
  const said = spoken([googleUs], 'en', female)
  expect(said.voice === '', `Female does not take the desktop male Google voice, got ${said.voice}`)
  expect(said.pitch >= 1.25, `Female pitch fallback stays high, got ${said.pitch}`)
}

expect(picked([monica, jorge], 'es', male)?.includes('Jorge') === true, 'Spanish Male uses Jorge')
expect(picked([monica], 'es', male) === undefined, 'Spanish Mónica is not male')
expect(picked([monica, jorge], 'es', female)?.includes('Mónica') === true, 'Spanish Female still uses Mónica')
expect(picked([luciana, felipe], 'pt', male)?.includes('Felipe') === true, 'Portuguese Male uses Felipe')
expect(picked([luciana], 'pt', male) === undefined, 'Portuguese Luciana is not male')
expect(picked([luciana, felipe], 'pt', female)?.includes('Luciana') === true, 'Portuguese Female still uses Luciana')
expect(picked([daniel, aaron], 'en', male)?.includes('Aaron') === true, 'English Male refuses Daniel')

expect(voices.classifyGender(samantha) === 'female', 'Samantha classifies as female')
expect(voices.classifyGender(iom) === 'male', 'iom classifies as male')
expect(voices.classifyGender(tpf) === 'unknown', 'tpf is not labeled female, so Female selection is unchanged')

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('voice checks passed')
