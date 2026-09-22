import { useEffect, useRef, useState } from 'react'
import { canRecordVoice, preferredAudioMimeType } from '../data/audio'

type VoiceNoteControlProps = {
  blob: Blob | null
  disabled?: boolean
  onChange: (blob: Blob | null) => void
  onRecordingChange: (recording: boolean) => void
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function VoiceNoteControl({
  blob,
  disabled = false,
  onChange,
  onRecordingChange,
}: VoiceNoteControlProps) {
  const canRecord = canRecordVoice()
  const [phase, setPhase] = useState<'idle' | 'recording' | 'playing'>('idle')
  const [elapsedMs, setElapsedMs] = useState(0)
  const [durationMs, setDurationMs] = useState<number | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      const recorder = recorderRef.current
      if (recorder && recorder.state !== 'inactive') recorder.stop()
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'recording') return
    const started = Date.now()
    const timer = window.setInterval(() => setElapsedMs(Date.now() - started), 200)
    return () => window.clearInterval(timer)
  }, [phase])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    setDurationMs(null)
    if (!blob) {
      audio.removeAttribute('src')
      audio.load()
      return
    }
    const url = URL.createObjectURL(blob)
    objectUrlRef.current = url
    audio.src = url
  }, [blob])

  function stopPlayback() {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    if (mountedRef.current) setPhase('idle')
  }

  function releaseStream() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }

  async function startRecording() {
    if (disabled || !canRecord) return
    stopPlayback()
    setNotice(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mimeType = preferredAudioMimeType()
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }
      recorder.onstop = () => {
        const type = recorder.mimeType || mimeType || 'audio/webm'
        const next = new Blob(chunksRef.current, { type })
        chunksRef.current = []
        recorderRef.current = null
        releaseStream()
        if (!mountedRef.current) return
        setPhase('idle')
        onRecordingChange(false)
        if (next.size === 0) {
          setNotice('That recording was empty. Try again. Your written note still saves.')
          return
        }
        onChange(next)
      }
      recorderRef.current = recorder
      recorder.start()
      setElapsedMs(0)
      setPhase('recording')
      onRecordingChange(true)
    } catch {
      releaseStream()
      if (!mountedRef.current) return
      setPhase('idle')
      onRecordingChange(false)
      setNotice('The microphone isn’t available. Your written note still saves.')
    }
  }

  function stopRecording() {
    const recorder = recorderRef.current
    if (recorder && recorder.state === 'recording') recorder.stop()
  }

  function play() {
    const audio = audioRef.current
    if (!audio || !blob) return
    setNotice(null)
    void audio.play().then(() => {
      if (!mountedRef.current || audio.paused) return
      setPhase('playing')
    }).catch(() => {
      if (!mountedRef.current) return
      setPhase('idle')
      setNotice('This recording couldn’t be played. Your written note still saves.')
    })
  }

  function remove() {
    stopPlayback()
    setNotice(null)
    onChange(null)
  }

  const primaryLabel = phase === 'recording'
    ? `Stop ${formatDuration(elapsedMs)}`
    : phase === 'playing'
      ? 'Stop'
      : blob
        ? `Play${durationMs ? ` ${formatDuration(durationMs)}` : ''}`
        : 'Record'

  function onPrimary() {
    if (phase === 'recording') {
      stopRecording()
      return
    }
    if (phase === 'playing') {
      stopPlayback()
      return
    }
    if (blob) {
      play()
      return
    }
    void startRecording()
  }

  return (
    <div className="voice">
      <span className="label">
        Voice note <span className="hint">Optional</span>
      </span>
      <audio
        ref={audioRef}
        className="voice-audio"
        playsInline
        preload="metadata"
        onLoadedMetadata={(event) => {
          const duration = event.currentTarget.duration
          if (Number.isFinite(duration)) setDurationMs(duration * 1000)
        }}
        onEnded={() => setPhase('idle')}
      />
      {canRecord || blob ? (
        <div className="voice-actions">
          <button
            type="button"
            className="button"
            disabled={disabled && phase !== 'recording' && phase !== 'playing'}
            onClick={onPrimary}
            aria-pressed={phase === 'recording' || phase === 'playing'}
          >
            {phase === 'recording' ? <span className="rec-dot" aria-hidden="true" /> : null}
            {primaryLabel}
          </button>
          {blob && phase === 'idle' ? (
            <>
              {canRecord ? (
                <button type="button" className="text-button" disabled={disabled} onClick={() => void startRecording()}>
                  Record again
                </button>
              ) : null}
              <button type="button" className="text-button text-button-danger" disabled={disabled} onClick={remove}>
                Remove
              </button>
            </>
          ) : null}
        </div>
      ) : null}
      {!canRecord ? (
        <p className="field-note">
          {blob
            ? 'This browser can’t record a new voice note. You can still play the one saved here.'
            : 'Voice recording isn’t available in this browser. Your written note still saves.'}
        </p>
      ) : null}
      {notice ? <p className="field-note">{notice}</p> : null}
    </div>
  )
}
