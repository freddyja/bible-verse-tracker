import type { PrayerGuideCard } from './types'

export function guidePlainText(guide: PrayerGuideCard): string {
  const lines: string[] = [
    `${guide.titleHow} ${guide.titleFor}`,
    '',
    guide.tagline,
    '',
  ]
  for (const item of guide.items) {
    const num = String(item.n).padStart(2, '0')
    lines.push(`${num}  ${item.heading}`)
    lines.push(item.prayer)
    lines.push(item.ref)
    lines.push('')
  }
  lines.push(guide.footer.prayer)
  lines.push(guide.footer.ref)
  lines.push('')
  lines.push('Designed by Freddy / Living Word')
  return lines.join('\n')
}
