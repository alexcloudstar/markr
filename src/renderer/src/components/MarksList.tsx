import { type JSX } from 'react'

import { type Mark } from '@/hooks/useSession'
import { formatTime } from '@/lib/formatTime'
import { Card } from '@/components/ui/card'

type MarksListProps = {
  marks: Mark[]
}

export const MarksList = ({ marks }: MarksListProps): JSX.Element => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-sm font-medium text-muted-foreground">Markers</h2>
        <span className="text-xs text-muted-foreground tabular-nums">{marks.length}</span>
      </div>

      <Card className="min-h-0 flex-1 overflow-y-auto p-0">
        {marks.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground">
            No markers yet. Hit Mark to log the current time.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {marks.map((mark, index) => (
              <li
                key={mark.id}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="text-muted-foreground tabular-nums">#{index + 1}</span>
                <span className="font-mono tabular-nums">{formatTime(mark.elapsedMs)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
