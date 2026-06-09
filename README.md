# Markr

A minimal desktop timer for marking timestamps during a live session. Start a session, drop markers with a button or a global hotkey (works even when Markr is in the background), and review them in order. Everything lives in memory: no saving, no database, no accounts.

## Stack

- Electron + React (TypeScript), bundled with electron-vite
- Tailwind CSS v4
- shadcn/ui components
- Global hotkey via Electron `globalShortcut`

## Usage

- **Start Session** sets `t = 0` and starts the timer.
- **Mark** logs the current elapsed time as `mm:ss`.
- Global hotkey: **Cmd+M** (macOS) / **Ctrl+M** (Windows, Linux) does the same as Mark, even when the app is not focused. It is only active while a session is running.
- **Stop Session** freezes the timer and keeps the markers visible.
- Starting a new session resets the timer and clears the markers.

## Development

```bash
bun install
bun dev          # launch in development
bun run build    # production build into out/
bun run typecheck
```
