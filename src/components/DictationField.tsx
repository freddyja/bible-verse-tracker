import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { MessageKey } from '../i18n/messages'
import { useLanguage } from '../i18n/useLanguage'
import {
  applyDictation,
  canDictate,
  startDictation,
  stopDictation,
  type DictationFailure,
} from '../speech/dictation'

type InsertPoint = {
  prefix: string
  suffix: string
}

type DictationFieldProps = {
  label: ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
  textareaClassName?: string
  /** Blocks a new dictation. Stop stays available while one is already listening. */
  disabled?: boolean
  onListeningChange?: (listening: boolean) => void
}

function noticeFor(failure: DictationFailure): MessageKey {
  if (failure === 'unavailable') return 'dictateUnavailable'
  if (failure === 'mic') return 'dictateMicDenied'
  return 'dictateFailed'
}

export function DictationField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  textareaClassName,
  disabled = false,
  onListeningChange,
}: DictationFieldProps) {
  const { language, t } = useLanguage()
  const fieldId = useId()
  const areaRef = useRef<HTMLTextAreaElement>(null)
  const valueRef = useRef(value)
  const onChangeRef = useRef(onChange)
  const onListeningChangeRef = useRef(onListeningChange)
  const mountedRef = useRef(true)
  const pendingInsert = useRef<InsertPoint | null>(null)
  const sessionRef = useRef<{ id: number; prefix: string; suffix: string; latest: string } | null>(null)
  const [listening, setListening] = useState(false)
  const [notice, setNotice] = useState<MessageKey | null>(null)
  const supported = canDictate()

  useEffect(() => {
    valueRef.current = value
    onChangeRef.current = onChange
    onListeningChangeRef.current = onListeningChange
  }, [value, onChange, onListeningChange])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (sessionRef.current) stopDictation({ discard: true })
    }
  }, [])

  useEffect(() => {
    if (sessionRef.current) stopDictation()
  }, [language])

  useEffect(() => {
    if (!listening) return
    const area = areaRef.current
    const session = sessionRef.current
    if (!area || !session) return
    const caret = area.value.length - session.suffix.length
    if (caret < 0) return
    area.setSelectionRange(caret, caret)
  }, [value, listening])

  function publish(next: boolean) {
    setListening(next)
    onListeningChangeRef.current?.(next)
  }

  function readInsert(): InsertPoint {
    const area = areaRef.current
    const current = area?.value ?? valueRef.current
    if (area && document.activeElement === area) {
      const start = area.selectionStart ?? current.length
      const end = area.selectionEnd ?? start
      return { prefix: current.slice(0, start), suffix: current.slice(end) }
    }
    return { prefix: current, suffix: '' }
  }

  function begin(insert: InsertPoint) {
    setNotice(null)
    const id = startDictation(language, {
      onUpdate(transcript) {
        const session = sessionRef.current
        if (!mountedRef.current || !session || session.id !== id) return
        session.latest = transcript
        onChangeRef.current(applyDictation(session.prefix, transcript, session.suffix))
      },
      onRestart() {
        const session = sessionRef.current
        if (!session || session.id !== id) return
        const folded = applyDictation(session.prefix, session.latest, session.suffix)
        session.prefix = folded.slice(0, Math.max(0, folded.length - session.suffix.length))
        session.latest = ''
      },
      onEnd() {
        if (sessionRef.current?.id === id) sessionRef.current = null
        if (!mountedRef.current) return
        publish(false)
      },
      onError(failure) {
        if (sessionRef.current?.id === id) sessionRef.current = null
        if (!mountedRef.current) return
        publish(false)
        setNotice(noticeFor(failure))
      },
    })
    if (id == null) return
    sessionRef.current = { id, prefix: insert.prefix, suffix: insert.suffix, latest: '' }
    publish(true)
  }

  function activate() {
    if (sessionRef.current) {
      stopDictation()
      return
    }
    if (disabled) return
    if (!supported) {
      setNotice('dictateUnavailable')
      return
    }
    const insert = pendingInsert.current ?? readInsert()
    pendingInsert.current = null
    begin(insert)
  }

  return (
    <div className="field dictate-field">
      <div className="dictate-label-row">
        <label className="label" htmlFor={fieldId}>
          {label}
        </label>
        <button
          type="button"
          className={listening ? 'button button-small' : 'button button-ghost button-small'}
          aria-pressed={listening}
          disabled={disabled && !listening}
          onPointerDown={() => {
            pendingInsert.current = readInsert()
          }}
          onClick={activate}
        >
          {listening ? <span className="rec-dot" aria-hidden="true" /> : null}
          {listening ? t('dictateStop') : t('dictate')}
        </button>
      </div>
      {listening ? (
        <p className="field-note dictate-status" role="status" aria-live="polite">
          {t('dictateListening')}
        </p>
      ) : null}
      <textarea
        ref={areaRef}
        id={fieldId}
        className={textareaClassName}
        value={value}
        rows={rows}
        required={required}
        placeholder={placeholder}
        onChange={(event) => {
          if (sessionRef.current) {
            publish(false)
            stopDictation({ discard: true })
          }
          onChange(event.target.value)
        }}
      />
      {notice && !listening ? (
        <p className="field-note" role="alert">
          {t(notice)}
        </p>
      ) : null}
    </div>
  )
}
