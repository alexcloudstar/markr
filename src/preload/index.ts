import { contextBridge, ipcRenderer } from 'electron'

const api = {
  // Subscribe to global-hotkey mark events. Returns an unsubscribe function.
  onMark: (callback: () => void): (() => void) => {
    const listener = (): void => callback()
    ipcRenderer.on('mark', listener)
    return () => ipcRenderer.removeListener('mark', listener)
  },
  setSessionActive: (): void => ipcRenderer.send('session:active'),
  setSessionInactive: (): void => ipcRenderer.send('session:inactive')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('markr', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // Fallback when context isolation is disabled (should not happen here).
  // @ts-expect-error window is not typed in the isolated-disabled branch
  window.markr = api
}
