import type { SermonOutline } from './types'
import { CALL } from './banks/call'
import { HANDS } from './banks/hands'
import { HEART } from './banks/heart'
import { HOUSE } from './banks/house'
import { REST, FALLBACK } from './banks/rest'
import { TRIAL } from './banks/trial'
import { WALK } from './banks/walk'

export const OUTLINES: readonly SermonOutline[] = [
  ...HEART,
  ...WALK,
  ...TRIAL,
  ...HANDS,
  ...HOUSE,
  ...CALL,
  ...REST,
]

export { FALLBACK }
