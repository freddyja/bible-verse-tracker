import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'bible-verse-tracker.voice'

export type VoiceGender = 'male' | 'female' | 'default'
export type VoiceStyle = 'calm' | 'clear' | 'warm'

export type VoicePrefs = {
  gender: VoiceGender
  style: VoiceStyle
}

const DEFAULT_PREFS: VoicePrefs = { gender: 'default', style: 'clear' }

function parseGender(value: unknown): VoiceGender {
  return value === 'male' || value === 'female' || value === 'default' ? value : 'default'
}

function parseStyle(value: unknown): VoiceStyle {
  return value === 'calm' || value === 'clear' || value === 'warm' ? value : 'clear'
}

function readStored(): VoicePrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PREFS }
    const data = JSON.parse(raw) as { gender?: unknown; style?: unknown }
    return { gender: parseGender(data.gender), style: parseStyle(data.style) }
  } catch {
    return { ...DEFAULT_PREFS }
  }
}

let memory = readStored()
const listeners = new Set<() => void>()

function commit(next: VoicePrefs) {
  if (next.gender === memory.gender && next.style === memory.style) return
  memory = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // The choice still applies until the page closes.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return memory
}

export function readVoicePrefs(): VoicePrefs {
  return memory
}

export function setVoiceGender(gender: VoiceGender) {
  commit({ ...memory, gender: parseGender(gender) })
}

export function setVoiceStyle(style: VoiceStyle) {
  commit({ ...memory, style: parseStyle(style) })
}

export function useVoicePrefs(): VoicePrefs {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
