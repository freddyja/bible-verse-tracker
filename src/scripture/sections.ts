import type { MessageKey } from '../i18n/messages'
import type { Testament } from './books'

export type SectionIcon = 'law' | 'history' | 'wisdom' | 'prophets' | 'gospels' | 'letters' | 'revelation'

export type CanonSection = {
  id: string
  testament: Testament
  label: MessageKey
  icon: SectionIcon
  /** Index in BOOKS, inclusive. */
  start: number
  /** Index in BOOKS, exclusive. */
  end: number
}

export const CANON_SECTIONS: readonly CanonSection[] = [
  { id: 'law', testament: 'ot', label: 'sectionLaw', icon: 'law', start: 0, end: 5 },
  { id: 'ot-history', testament: 'ot', label: 'sectionHistory', icon: 'history', start: 5, end: 17 },
  { id: 'wisdom', testament: 'ot', label: 'sectionWisdom', icon: 'wisdom', start: 17, end: 22 },
  { id: 'major', testament: 'ot', label: 'sectionMajorProphets', icon: 'prophets', start: 22, end: 27 },
  { id: 'minor', testament: 'ot', label: 'sectionMinorProphets', icon: 'prophets', start: 27, end: 39 },
  { id: 'gospels', testament: 'nt', label: 'sectionGospels', icon: 'gospels', start: 39, end: 43 },
  { id: 'nt-history', testament: 'nt', label: 'sectionHistory', icon: 'history', start: 43, end: 44 },
  { id: 'pauline', testament: 'nt', label: 'sectionPauline', icon: 'letters', start: 44, end: 57 },
  { id: 'general', testament: 'nt', label: 'sectionGeneral', icon: 'letters', start: 57, end: 65 },
  { id: 'revelation', testament: 'nt', label: 'sectionRevelation', icon: 'revelation', start: 65, end: 66 },
]
