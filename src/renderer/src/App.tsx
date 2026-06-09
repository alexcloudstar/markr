import { type JSX } from 'react'

import { useSession } from './hooks/useSession'
import { Timer } from './components/Timer'
import { Controls } from './components/Controls'
import { MarksList } from './components/MarksList'

function App(): JSX.Element {
  const { isRunning, elapsedMs, marks, start, stop, addMark } = useSession()

  return (
    <div className="flex h-screen flex-col gap-5 bg-background p-6 text-foreground">
      <header className="text-center">
        <h1 className="text-lg font-semibold tracking-tight">Markr</h1>
      </header>

      <Timer elapsedMs={elapsedMs} isRunning={isRunning} />

      <Controls isRunning={isRunning} onStart={start} onStop={stop} onMark={addMark} />

      <MarksList marks={marks} />
    </div>
  )
}

export default App
