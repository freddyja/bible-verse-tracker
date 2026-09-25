import type { ReactNode } from 'react'
import { useLanguage } from '../i18n/useLanguage'

type ExploreGridProps = {
  onRead: () => void
  onTopics: () => void
  onPlan: () => void
  onGrow: () => void
  onSaved: () => void
  onListen: () => void
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function TileIcon({ children }: { children: ReactNode }) {
  return (
    <svg className="explore-icon" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  )
}

export function ExploreGrid({ onRead, onTopics, onPlan, onGrow, onSaved, onListen }: ExploreGridProps) {
  const { t } = useLanguage()
  const tiles = [
    {
      id: 'read',
      label: t('navRead'),
      onClick: onRead,
      icon: (
        <TileIcon>
          <path d="M5 5.5h6.2c1.2 0 2.3.6 2.8 1.5.5-.9 1.6-1.5 2.8-1.5H21V18h-4.2c-1.1 0-2.1.4-2.8 1.1-.7-.7-1.7-1.1-2.8-1.1H5V5.5z" {...stroke} />
          <path d="M12 7.2v11.2" {...stroke} />
        </TileIcon>
      ),
    },
    {
      id: 'topics',
      label: t('searchModeTopics'),
      onClick: onTopics,
      icon: (
        <TileIcon>
          <circle cx="11" cy="11" r="5.4" {...stroke} />
          <path d="M15.4 15.4 19.2 19.2" {...stroke} />
        </TileIcon>
      ),
    },
    {
      id: 'plan',
      label: t('explorePlan'),
      onClick: onPlan,
      icon: (
        <TileIcon>
          <rect x="5" y="4.5" width="14" height="15" rx="2" {...stroke} />
          <path d="M8.5 3.8v2.2M15.5 3.8v2.2M5 9h14M8.5 13h3M8.5 16h5" {...stroke} />
        </TileIcon>
      ),
    },
    {
      id: 'grow',
      label: t('navGrow'),
      onClick: onGrow,
      icon: (
        <TileIcon>
          <path d="M12 20.2V11" {...stroke} />
          <path d="M12 15c0-3.1-2.3-5-6-6 1.5 3.3 3.3 5 6 6z" {...stroke} />
          <path d="M12 13.2c0-3.3 2.7-5.8 6.7-7-1.3 3.5-3.4 5.4-6.7 7z" {...stroke} />
        </TileIcon>
      ),
    },
    {
      id: 'saved',
      label: t('navSaved'),
      onClick: onSaved,
      icon: (
        <TileIcon>
          <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" {...stroke} />
        </TileIcon>
      ),
    },
    {
      id: 'listen',
      label: t('listen'),
      onClick: onListen,
      icon: (
        <TileIcon>
          <path d="M5 10.2v3.6M8.2 8.2v7.6M11.4 5.5v13M14.6 8.6v6.8M17.8 10.6v2.8" {...stroke} />
        </TileIcon>
      ),
    },
  ] as const

  return (
    <section className="explore" aria-labelledby="explore-title">
      <h2 id="explore-title" className="explore-title">
        {t('explore')}
      </h2>
      <div className="explore-grid">
        {tiles.map((tile) => (
          <button key={tile.id} type="button" className="explore-tile" data-tile={tile.id} onClick={tile.onClick}>
            {tile.icon}
            <span>{tile.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
