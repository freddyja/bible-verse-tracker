import type { ReactNode } from 'react'
import { useLanguage } from '../i18n/useLanguage'

export type TabId = 'daily' | 'read' | 'saved'

function IconDaily() {
  return (
    <svg className="tab-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3.2v1.8M12 19v1.8M3.2 12h1.8M19 12h1.8M5.6 5.6l1.3 1.3M17.1 17.1l1.3 1.3M18.4 5.6l-1.3 1.3M6.9 17.1l-1.3 1.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconRead() {
  return (
    <svg className="tab-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5.5h6.2c1.2 0 2.3.6 2.8 1.5.5-.9 1.6-1.5 2.8-1.5H21V18h-4.2c-1.1 0-2.1.4-2.8 1.1-.7-.7-1.7-1.1-2.8-1.1H5V5.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 7.2v11.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function IconSaved() {
  return (
    <svg className="tab-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const TABS: { id: TabId; label: 'navDaily' | 'navRead' | 'navSaved'; icon: () => ReactNode }[] = [
  { id: 'daily', label: 'navDaily', icon: IconDaily },
  { id: 'read', label: 'navRead', icon: IconRead },
  { id: 'saved', label: 'navSaved', icon: IconSaved },
]

type TabBarProps = {
  tab: TabId
  onSelect: (tab: TabId) => void
}

export function TabBar({ tab, onSelect }: TabBarProps) {
  const { t } = useLanguage()
  return (
    <nav className="tab-bar" aria-label={t('brandName')}>
      {TABS.map((item) => {
        const Icon = item.icon
        const selected = tab === item.id
        return (
          <button
            key={item.id}
            type="button"
            className="tab-btn"
            aria-current={selected ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
          >
            <Icon />
            <span>{t(item.label)}</span>
          </button>
        )
      })}
    </nav>
  )
}
