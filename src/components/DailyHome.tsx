import type { Verse, VerseDraft, VoiceNoteUpdate } from '../data/types'
import { dailyVerse } from '../scripture/daily'
import { DailyStudy } from './DailyStudy'
import { ExploreGrid } from './ExploreGrid'
import { InstallBanner } from './InstallOffer'
import { VerseOfTheDay } from './VerseOfTheDay'

type DailyHomeProps = {
  verses: readonly Verse[]
  onOpenPassage: (bookIndex: number, chapter: number, verse: number) => void
  onOpenSaved: (verseId: string) => void
  onSaveVerse: (draft: VerseDraft, id: string | undefined, voice: VoiceNoteUpdate) => Promise<void>
  onOpenRead: () => void
  onOpenTopics: () => void
  onOpenPlan: () => void
  onOpenGrow: () => void
  onOpenSavedTab: () => void
  onOpenListen: () => void
}

export function DailyHome({
  verses,
  onOpenPassage,
  onOpenSaved,
  onSaveVerse,
  onOpenRead,
  onOpenTopics,
  onOpenPlan,
  onOpenGrow,
  onOpenSavedTab,
  onOpenListen,
}: DailyHomeProps) {
  const passage = dailyVerse()

  return (
    <div className="daily-home">
      <InstallBanner />
      <VerseOfTheDay
        verses={verses}
        onOpen={onOpenPassage}
        onOpenSaved={onOpenSaved}
        onSaveVerse={onSaveVerse}
      />
      <ExploreGrid
        onRead={onOpenRead}
        onTopics={onOpenTopics}
        onPlan={onOpenPlan}
        onGrow={onOpenGrow}
        onSaved={onOpenSavedTab}
        onListen={onOpenListen}
      />
      <DailyStudy bookIndex={passage.bookIndex} chapter={passage.chapter} verse={passage.verse} />
    </div>
  )
}
