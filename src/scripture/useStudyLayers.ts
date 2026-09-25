import { useEffect, useState } from 'react'
import { audienceFor, contextFor, todayFor } from './api'
import type { ContextSource, TodaySource } from './studyNotes'

export type StudyLayers = {
  contextText: string | null
  contextRange: { start: number; end: number } | null
  contextSource: ContextSource | null
  thenNote: string | null
  todayNote: string | null
  todaySource: TodaySource | null
}

/** Context, original audience, and today — the three public-domain study layers. */
export function useStudyLayers(bookIndex: number, chapter: number, verse: number): StudyLayers | null {
  const key = `${bookIndex}:${chapter}:${verse}`
  const [loaded, setLoaded] = useState<(StudyLayers & { key: string }) | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      contextFor({ bookIndex, chapter, verse }),
      audienceFor({ bookIndex, chapter, verse }),
      todayFor({ bookIndex, chapter, verse }),
    ])
      .then(([context, thenNote, today]) => {
        if (cancelled) return
        setLoaded({
          key,
          contextText: context?.text ?? null,
          contextRange: context ? { start: context.start, end: context.end } : null,
          contextSource: context?.source ?? null,
          thenNote,
          todayNote: today?.text ?? null,
          todaySource: today?.source ?? null,
        })
      })
      .catch(() => {
        if (cancelled) return
        setLoaded({
          key,
          contextText: null,
          contextRange: null,
          contextSource: null,
          thenNote: null,
          todayNote: null,
          todaySource: null,
        })
      })
    return () => {
      cancelled = true
    }
  }, [bookIndex, chapter, verse, key])

  if (!loaded || loaded.key !== key) return null
  return loaded
}
