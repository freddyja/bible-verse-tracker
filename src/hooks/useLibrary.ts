import { useCallback, useEffect, useState } from 'react'
import {
  createCategory as createCategoryRecord,
  deleteCategory as deleteCategoryRecord,
  deleteVerse as deleteVerseRecord,
  loadLibrary,
  renameCategory as renameCategoryRecord,
  saveVerse as saveVerseRecord,
} from '../data/db'
import type { Category, Verse, VerseDraft } from '../data/types'

type LibraryStatus = 'loading' | 'ready' | 'error'

export function useLibrary() {
  const [verses, setVerses] = useState<Verse[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [status, setStatus] = useState<LibraryStatus>('loading')

  const refresh = useCallback(async () => {
    const snapshot = await loadLibrary()
    setVerses(snapshot.verses)
    setCategories(snapshot.categories)
  }, [])

  useEffect(() => {
    let cancelled = false
    loadLibrary()
      .then((snapshot) => {
        if (cancelled) return
        setVerses(snapshot.verses)
        setCategories(snapshot.categories)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const reload = useCallback(async () => {
    setStatus('loading')
    try {
      await refresh()
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }, [refresh])

  const saveVerse = useCallback(
    async (draft: VerseDraft, id?: string) => {
      await saveVerseRecord(draft, id)
      await refresh()
    },
    [refresh],
  )

  const deleteVerse = useCallback(
    async (id: string) => {
      await deleteVerseRecord(id)
      await refresh()
    },
    [refresh],
  )

  const createCategory = useCallback(
    async (name: string) => {
      const category = await createCategoryRecord(name)
      await refresh()
      return category
    },
    [refresh],
  )

  const renameCategory = useCallback(
    async (id: string, name: string) => {
      await renameCategoryRecord(id, name)
      await refresh()
    },
    [refresh],
  )

  const deleteCategory = useCallback(
    async (id: string) => {
      await deleteCategoryRecord(id)
      await refresh()
    },
    [refresh],
  )

  return {
    verses,
    categories,
    status,
    reload,
    saveVerse,
    deleteVerse,
    createCategory,
    renameCategory,
    deleteCategory,
  }
}
