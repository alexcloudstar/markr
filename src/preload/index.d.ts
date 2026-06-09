export type MarkrApi = {
  onMark: (callback: () => void) => () => void
  setSessionActive: () => void
  setSessionInactive: () => void
}

declare global {
  interface Window {
    markr: MarkrApi
  }
}
