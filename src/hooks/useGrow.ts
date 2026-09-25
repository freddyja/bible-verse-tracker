import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'bible-verse-tracker.grow'
const TEXT_LIMIT = 400
const LIST_LIMIT = 80

export type GratitudeEntry = { id: string; text: string; createdAt: number }
export type GoalEntry = { id: string; text: string; done: boolean }

export type GrowStore = {
  gratitude: GratitudeEntry[]
  purposeWho: string
  purposeLove: string
  purposeServe: string
  purposeStatement: string
  goals: GoalEntry[]
  habitKeep: string
  habitRelease: string
  triviaDay: number | null
  triviaChoice: number | null
  gameDay: number | null
  gameChoice: number | null
  practiceDoneDay: number | null
}

const EMPTY: GrowStore = {
  gratitude: [],
  purposeWho: '',
  purposeLove: '',
  purposeServe: '',
  purposeStatement: '',
  goals: [],
  habitKeep: '',
  habitRelease: '',
  triviaDay: null,
  triviaChoice: null,
  gameDay: null,
  gameChoice: null,
  practiceDoneDay: null,
}

function clip(value: unknown, limit = TEXT_LIMIT): string {
  return typeof value === 'string' ? value.trim().slice(0, limit) : ''
}

function newId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function readGrow(): GrowStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<GrowStore>
    const gratitude = Array.isArray(parsed.gratitude)
      ? parsed.gratitude
          .filter((entry): entry is GratitudeEntry => {
            return Boolean(entry) && typeof entry.id === 'string' && typeof entry.text === 'string'
          })
          .slice(0, LIST_LIMIT)
          .map((entry) => ({
            id: entry.id,
            text: clip(entry.text),
            createdAt: typeof entry.createdAt === 'number' ? entry.createdAt : Date.now(),
          }))
      : []
    const goals = Array.isArray(parsed.goals)
      ? parsed.goals
          .filter((entry): entry is GoalEntry => Boolean(entry) && typeof entry.id === 'string' && typeof entry.text === 'string')
          .slice(0, 40)
          .map((entry) => ({ id: entry.id, text: clip(entry.text, 160), done: entry.done === true }))
      : []
    const dayOrNull = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : null)
    const choiceOrNull = (value: unknown) => (value === 0 || value === 1 || value === 2 ? value : null)
    return {
      gratitude,
      purposeWho: clip(parsed.purposeWho),
      purposeLove: clip(parsed.purposeLove),
      purposeServe: clip(parsed.purposeServe),
      purposeStatement: clip(parsed.purposeStatement, 800),
      goals,
      habitKeep: clip(parsed.habitKeep, 240),
      habitRelease: clip(parsed.habitRelease, 240),
      triviaDay: dayOrNull(parsed.triviaDay),
      triviaChoice: choiceOrNull(parsed.triviaChoice),
      gameDay: dayOrNull(parsed.gameDay),
      gameChoice: choiceOrNull(parsed.gameChoice),
      practiceDoneDay: dayOrNull(parsed.practiceDoneDay),
    }
  } catch {
    return EMPTY
  }
}

function writeGrow(store: GrowStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // The visit keeps the change in memory if the phone refuses storage.
  }
}

let memory = readGrow()
const listeners = new Set<() => void>()

function commit(recipe: (current: GrowStore) => GrowStore) {
  memory = recipe(memory)
  writeGrow(memory)
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return memory
}

export function useGrow() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const change = useCallback((recipe: (current: GrowStore) => GrowStore) => {
    commit(recipe)
  }, [])

  const addThanks = useCallback(
    (text: string) => {
      const clean = clip(text, 280)
      if (!clean) return
      change((current) => ({
        ...current,
        gratitude: [{ id: newId(), text: clean, createdAt: Date.now() }, ...current.gratitude].slice(0, LIST_LIMIT),
      }))
    },
    [change],
  )

  const removeThanks = useCallback(
    (id: string) => {
      change((current) => ({ ...current, gratitude: current.gratitude.filter((entry) => entry.id !== id) }))
    },
    [change],
  )

  const savePurpose = useCallback(
    (next: { who: string; love: string; serve: string; statement: string }) => {
      change((current) => ({
        ...current,
        purposeWho: clip(next.who),
        purposeLove: clip(next.love),
        purposeServe: clip(next.serve),
        purposeStatement: clip(next.statement, 800),
      }))
    },
    [change],
  )

  const addGoal = useCallback(
    (text: string) => {
      const clean = clip(text, 160)
      if (!clean) return
      change((current) => ({
        ...current,
        goals: [{ id: newId(), text: clean, done: false }, ...current.goals].slice(0, 40),
      }))
    },
    [change],
  )

  const toggleGoal = useCallback(
    (id: string) => {
      change((current) => ({
        ...current,
        goals: current.goals.map((goal) => (goal.id === id ? { ...goal, done: !goal.done } : goal)),
      }))
    },
    [change],
  )

  const removeGoal = useCallback(
    (id: string) => {
      change((current) => ({ ...current, goals: current.goals.filter((goal) => goal.id !== id) }))
    },
    [change],
  )

  const saveHabits = useCallback(
    (keep: string, release: string) => {
      change((current) => ({ ...current, habitKeep: clip(keep, 240), habitRelease: clip(release, 240) }))
    },
    [change],
  )

  const answerTrivia = useCallback(
    (day: number, choice: number) => {
      change((current) => (current.triviaDay === day ? current : { ...current, triviaDay: day, triviaChoice: choice }))
    },
    [change],
  )

  const answerGame = useCallback(
    (day: number, choice: number) => {
      change((current) => (current.gameDay === day ? current : { ...current, gameDay: day, gameChoice: choice }))
    },
    [change],
  )

  const setPracticeDone = useCallback(
    (day: number, done: boolean) => {
      change((current) => ({ ...current, practiceDoneDay: done ? day : null }))
    },
    [change],
  )

  return {
    store,
    addThanks,
    removeThanks,
    savePurpose,
    addGoal,
    toggleGoal,
    removeGoal,
    saveHabits,
    answerTrivia,
    answerGame,
    setPracticeDone,
  }
}
