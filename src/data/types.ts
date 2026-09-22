/**
 * Local library model.
 *
 * Ids are stable and every record carries createdAt/updatedAt so a later
 * sync or account layer can mirror these objects without a new shape.
 * schemaVersion on the meta record is the migration hook.
 */
export const SCHEMA_VERSION = 1

export type Category = {
  id: string
  name: string
  createdAt: number
  updatedAt: number
}

export type Verse = {
  id: string
  /** Book, chapter, and verse — or any freeform reference. */
  reference: string
  text: string
  /** Personal note. Empty string when the verse has none. */
  note: string
  categoryIds: string[]
  createdAt: number
  updatedAt: number
}

export type VerseDraft = {
  reference: string
  text: string
  note: string
  categoryIds: string[]
}

export type LibraryMeta = {
  id: 'app'
  schemaVersion: number
  seeded: boolean
}

export type LibrarySnapshot = {
  verses: Verse[]
  categories: Category[]
}
