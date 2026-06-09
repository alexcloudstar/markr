import { type JSX } from 'react'

import { formatTime } from '@/lib/formatTime'
import { cn } from '@/lib/utils'

type TimerProps = {
  elapsedMs: number
  isRunning: boolean
}

export const Timer = ({ elapsedMs, isRunning }: TimerProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <span className="font-mono text-7xl font-semibold tabular-nums tracking-tight">
        {formatTime(elapsedMs)}
      </span>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span
          className={cn(
            'size-2 rounded-full',
            isRunning ? 'animate-pulse bg-red-500' : 'bg-muted-foreground/40'
          )}
        />
        {isRunning ? 'Recording' : 'Idle'}
      </div>
    </div>
  )
}
