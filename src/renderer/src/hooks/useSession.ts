import { useCallback, useEffect, useRef, useState } from 'react'

// How often the on-screen timer refreshes. The displayed value is always
// computed from the real start time, so this only affects smoothness, not drift.
const TICK_MS = 250

export type Mark = {
  id: number
  elapsedMs: number
}

export type Session = {
  isRunning: boolean
  elapsedMs: number
  marks: Mark[]
  start: () => void
  stop: () => void
  addMark: () => void
}

export const useSession = (): Session => {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [marks, setMarks] = useState<Mark[]>([])

  // Mirror startTime in a ref so the hotkey handler (subscribed once) always
  // reads the current value without re-subscribing on every tick.
  const startTimeRef = useRef<number | null>(null)
  const nextIdRef = useRef(1)

  const isRunning = startTime !== null

  useEffect(() => {
    startTimeRef.current = startTime
  }, [startTime])

  // Drive the visible timer from wall-clock time so it never drifts.
  useEffect(() => {
    if (startTime === null) return
    setElapsedMs(Date.now() - startTime)
    const intervalId = window.setInterval(() => {
      setElapsedMs(Date.now() - startTime)
    }, TICK_MS)
    return () => window.clearInterval(intervalId)
  }, [startTime])

  const addMark = useCallback(() => {
    const begin = startTimeRef.current
    if (begin === null) return
    const elapsed = Date.now() - begin
    setMarks((prev) => [...prev, { id: nextIdRef.current++, elapsedMs: elapsed }])
  }, [])

  const start = useCallback(() => {
    nextIdRef.current = 1
    setMarks([])
    setElapsedMs(0)
    setStartTime(Date.now())
    window.markr.setSessionActive()
  }, [])

  const stop = useCallback(() => {
    setStartTime(null)
    window.markr.setSessionInactive()
  }, [])

  // The global hotkey marks through the exact same path as the Mark button.
  useEffect(() => {
    return window.markr.onMark(addMark)
  }, [addMark])

  return { isRunning, elapsedMs, marks, start, stop, addMark }
}
