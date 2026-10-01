import type { Language } from '../i18n/messages'

export type PrayerLang = Language

export type PrayerItem = {
  n: number
  heading: string
  prayer: string
  ref: string
}

export type PrayerGuideCard = {
  titleHow: string
  titleFor: string
  tagline: string
  items: PrayerItem[]
  footer: { prayer: string; ref: string }
}

export type PrayerTemplateId =
  | 'wife'
  | 'husband'
  | 'children'
  | 'parents'
  | 'friends'
  | 'church'
  | 'anxiety'
  | 'healing'
  | 'gratitude'
  | 'nation'

export type PrayerTemplate = {
  id: PrayerTemplateId
  /** Chip label shown in the UI for each language. */
  chip: Record<PrayerLang, string>
  /** Fuzzy match keywords (any language). */
  keywords: readonly string[]
  guides: Record<PrayerLang, PrayerGuideCard>
}
