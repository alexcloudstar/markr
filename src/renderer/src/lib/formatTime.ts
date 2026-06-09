const SECONDS_PER_MINUTE = 60
const MS_PER_SECOND = 1000

const pad = (value: number): string => {
  return value.toString().padStart(2, '0')
}

// Formats an elapsed duration in milliseconds as mm:ss.
export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / MS_PER_SECOND)
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE)
  const seconds = totalSeconds % SECONDS_PER_MINUTE
  return `${pad(minutes)}:${pad(seconds)}`
}
