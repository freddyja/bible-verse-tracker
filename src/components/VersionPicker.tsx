import { useEffect, useId, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'

export function VersionPicker() {
  const { versionId, versionName, versions, setVersion, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="version-picker" ref={rootRef}>
      <button
        type="button"
        className="version-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{versionName}</span>
        <span className="version-chevron" aria-hidden="true">
          {open ? '▴' : '▾'}
        </span>
      </button>
      {open ? (
        <ul className="version-menu" id={listId} role="listbox" aria-label={t('bibleVersion')}>
          {versions.map((version) => {
            const selected = version.id === versionId
            return (
              <li key={version.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  className={selected ? 'version-option is-selected' : 'version-option'}
                  aria-selected={selected}
                  onClick={() => {
                    setVersion(version.id)
                    setOpen(false)
                  }}
                >
                  {version.name}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
