import { useLanguage } from '../i18n/useLanguage'
import { clipSpoken, spokenParts } from '../scripture/redLetter'

type ScriptureTextProps = {
  bookIndex: number
  chapter: number
  verse: number
  text: string
  className?: string
  limit?: number
}

export function ScriptureText({ bookIndex, chapter, verse, text, className, limit }: ScriptureTextProps) {
  const { redLetter } = useLanguage()
  const parts = redLetter ? spokenParts(bookIndex, chapter, verse, text) : [{ spoken: false, text }]
  const shown = limit ? clipSpoken(parts, limit) : parts
  return (
    <span className={className}>
      {shown.map((part, index) =>
        part.spoken ? (
          <span key={index} className="words-of-jesus">
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </span>
  )
}
