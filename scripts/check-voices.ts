/**
 * Voice checks. Run with: npx vite-node scripts/check-voices.ts
 * Read Out Loud keeps the device's default voice and only changes style.
 */
import type { VoicePrefs, VoiceStyle } from '../src/speech/prefs'

const nav = {
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0',
  platform: 'Linux',
  maxTouchPoints: 0,
}

Object.defineProperty(globalThis, 'navigator', { value: nav, configurable: true })

const store = new Map<string, string>()
store.set('bible-verse-tracker.voice', JSON.stringify({ gender: 'male', style: 'warm' }))
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

const installed: SpeechSynthesisVoice[] = [
  {
    name: 'Samantha',
    lang: 'en-US',
    voiceURI: 'com.apple.voice.compact.en-US.Samantha',
    localService: true,
    default: true,
  } as SpeechSynthesisVoice,
  {
    name: 'Aaron',
    lang: 'en-US',
    voiceURI: 'com.apple.voice.compact.en-US.Aaron',
    localService: true,
    default: false,
  } as SpeechSynthesisVoice,
]

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
const prefs = await import('../src/speech/prefs')

const failures: string[] = []

function expect(cond: boolean, message: string) {
  if (!cond) failures.push(message)
}

const STYLE: Record<VoiceStyle, { rate: number; pitch: number }> = {
  calm: { rate: 0.82, pitch: 0.92 },
  clear: { rate: 0.96, pitch: 1 },
  warm: { rate: 0.9, pitch: 1.08 },
}

function spoken(language: 'en' | 'es' | 'pt', style: VoiceStyle) {
  const utterance = new FakeUtterance('In the beginning God created the heaven and the earth.')
  voices.applyVoice(utterance as unknown as SpeechSynthesisUtterance, language, { style })
  return {
    voice: utterance.voice,
    pitch: utterance.pitch,
    rate: utterance.rate,
    lang: utterance.lang,
  }
}

expect(prefs.readVoicePrefs().style === 'warm', 'a stored Warm style is kept')
{
  const stored = JSON.parse(store.get('bible-verse-tracker.voice') || '{}') as { gender?: unknown; style?: unknown }
  expect(!('gender' in stored), 'a stored Male or Female choice is removed')
  expect(stored.style === 'warm', 'migration keeps the style')
}

for (const style of ['calm', 'clear', 'warm'] as const) {
  const said = spoken('en', style)
  expect(said.voice === null, `${style} leaves the system voice unset, got ${said.voice?.name}`)
  expect(said.rate === STYLE[style].rate, `${style} rate is ${STYLE[style].rate}, got ${said.rate}`)
  expect(said.pitch === STYLE[style].pitch, `${style} pitch is ${STYLE[style].pitch}, got ${said.pitch}`)
  expect(said.lang === 'en-US', `${style} lang stays en-US, got ${said.lang}`)
}

expect(spoken('es', 'clear').lang === 'es-ES', 'Spanish uses es-ES')
expect(spoken('pt', 'clear').lang === 'pt-BR', 'Portuguese uses pt-BR')
expect(spoken('es', 'calm').voice === null, 'Spanish does not assign Aaron or Samantha')

const remembered: VoicePrefs = prefs.readVoicePrefs()
{
  const utterance = new FakeUtterance('For God so loved the world.')
  voices.applyVoice(utterance as unknown as SpeechSynthesisUtterance, 'en', remembered)
  expect(utterance.voice === null, 'stored prefs still use the system voice')
  expect(utterance.rate === STYLE.warm.rate, 'stored Warm rate is applied')
  expect(utterance.pitch === STYLE.warm.pitch, 'stored Warm pitch is applied')
}

prefs.setVoiceStyle('clear')
expect(prefs.readVoicePrefs().style === 'clear', 'Clear can be saved')
expect(!('gender' in JSON.parse(store.get('bible-verse-tracker.voice') || '{}')), 'saving a style does not write a gender')

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('voice checks passed')
