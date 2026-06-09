import { type JSX } from 'react'

import { Button } from '@/components/ui/button'

const isMac = navigator.userAgent.includes('Mac')
const MARK_HINT = isMac ? '⌘M' : 'Ctrl+M'

type ControlsProps = {
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  onMark: () => void
}

export const Controls = ({ isRunning, onStart, onStop, onMark }: ControlsProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-3">
      {isRunning ? (
        <Button variant="destructive" size="lg" onClick={onStop}>
          Stop Session
        </Button>
      ) : (
        <Button
          size="lg"
          onClick={onStart}
          className="bg-emerald-600 text-white hover:bg-emerald-500"
        >
          Start Session
        </Button>
      )}

      <Button
        size="lg"
        variant="outline"
        onClick={onMark}
        disabled={!isRunning}
        className="text-base"
      >
        Mark
        <span className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
          {MARK_HINT}
        </span>
      </Button>
    </div>
  )
}
