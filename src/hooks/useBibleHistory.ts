import { useCallback, useEffect, useRef, useState } from 'react'

export type ChapterView = {
  kind: 'chapter'
  bookIndex: number
  chapter: number
  verse: number | null
  startBook: number
  startChapter: number
  startVerse: number | null
}

export type ReadPlace = { kind: 'home' } | { kind: 'book'; bookIndex: number } | ChapterView

const HOME: ReadPlace = { kind: 'home' }
const HISTORY_MARK = 'lw-bible'

/**
 * Bible-tab drill-down history (books → chapters → reader) with browser-style
 * back/forward and a single History API trap so Android/system Back walks the
 * stack before leaving the app.
 */
export function useBibleHistory(active: boolean) {
  const [stack, setStack] = useState<ReadPlace[]>([HOME])
  const [index, setIndex] = useState(0)
  const stackRef = useRef(stack)
  const indexRef = useRef(index)
  const activeRef = useRef(active)
  const armedRef = useRef(false)
  const suppressPopRef = useRef(false)

  useEffect(() => {
    stackRef.current = stack
    indexRef.current = index
    activeRef.current = active
  }, [stack, index, active])

  const read = stack[index] ?? HOME
  const canBack = index > 0
  const canForward = index < stack.length - 1

  const applyIndex = useCallback((nextIndex: number) => {
    indexRef.current = nextIndex
    setIndex(nextIndex)
  }, [])

  const push = useCallback(
    (place: ReadPlace) => {
      const clipped = stackRef.current.slice(0, indexRef.current + 1)
      clipped.push(place)
      stackRef.current = clipped
      setStack(clipped)
      applyIndex(clipped.length - 1)
    },
    [applyIndex],
  )

  const replace = useCallback((place: ReadPlace) => {
    const next = stackRef.current.slice()
    next[indexRef.current] = place
    stackRef.current = next
    setStack(next)
  }, [])

  const reset = useCallback(
    (places: readonly ReadPlace[]) => {
      const next = places.length > 0 ? [...places] : [HOME]
      stackRef.current = next
      setStack(next)
      applyIndex(next.length - 1)
    },
    [applyIndex],
  )

  const back = useCallback(() => {
    if (indexRef.current <= 0) return false
    applyIndex(indexRef.current - 1)
    return true
  }, [applyIndex])

  const forward = useCallback(() => {
    if (indexRef.current >= stackRef.current.length - 1) return false
    applyIndex(indexRef.current + 1)
    return true
  }, [applyIndex])

  useEffect(() => {
    const nested = active && index > 0
    if (nested && !armedRef.current) {
      const state = history.state as { lw?: string } | null
      if (state?.lw === HISTORY_MARK) {
        armedRef.current = true
      } else {
        history.pushState({ lw: HISTORY_MARK }, '')
        armedRef.current = true
      }
      return
    }
    if (!nested && armedRef.current) {
      suppressPopRef.current = true
      armedRef.current = false
      history.back()
    }
  }, [active, index])

  useEffect(() => {
    function onPopState() {
      if (suppressPopRef.current) {
        suppressPopRef.current = false
        return
      }
      armedRef.current = false
      if (!activeRef.current) return
      if (indexRef.current <= 0) return
      applyIndex(indexRef.current - 1)
      if (indexRef.current > 0) {
        history.pushState({ lw: HISTORY_MARK }, '')
        armedRef.current = true
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [applyIndex])

  return { read, canBack, canForward, push, replace, reset, back, forward }
}
