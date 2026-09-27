import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'bible-verse-tracker.voice'

export type VoiceStyle = 'calm' | 'clear' | 'warm'

export type VoicePrefs = {
  style: VoiceStyle
}

const DEFAULT_PREFS: VoicePrefs = { style: 'clear' }

function parseStyle(value: unknown): VoiceStyle {
  return value === 'calm' || value === 'clear' || value === 'warm' ? value : 'clear'
}

/**
 * Style is kept. An older Male or Female choice is dropped so it cannot
 * change the voice again. Missing or broken data becomes Clear.
 */
function readStored(): VoicePrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PREFS }
    const data = JSON.parse(raw) as { gender?: unknown; style?: unknown } | null
    if (!data || typeof data !== 'object') return { ...DEFAULT_PREFS }
    const style = parseStyle(data.style)
    const next: VoicePrefs = { style }
    if ('gender' in data || data.style !== style) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // The style still applies until the page closes.
      }
    }
    return next
  } catch {
    return { ...DEFAULT_PREFS }
  }
}

let memory = readStored()
const listeners = new Set<() => void>()

function commit(next: VoicePrefs) {
  if (next.style === memory.style) return
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

export function setVoiceStyle(style: VoiceStyle) {
  commit({ ...memory, style: parseStyle(style) })
}

export function useVoicePrefs(): VoicePrefs {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
