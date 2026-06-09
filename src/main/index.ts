import { app, shell, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import { join } from 'path'

// Cmd+M on macOS, Ctrl+M on Windows/Linux. Resolved by Electron at register time.
const MARK_SHORTCUT = 'CommandOrControl+M'

let mainWindow: BrowserWindow | null = null

const registerMarkShortcut = (): void => {
  if (globalShortcut.isRegistered(MARK_SHORTCUT)) return
  const ok = globalShortcut.register(MARK_SHORTCUT, () => {
    mainWindow?.webContents.send('mark')
  })
  if (!ok) {
    // Another app may already own the binding. Surface it instead of failing silently.
    console.error(`Failed to register global shortcut: ${MARK_SHORTCUT}`)
  }
}

const unregisterMarkShortcut = (): void => {
  if (globalShortcut.isRegistered(MARK_SHORTCUT)) {
    globalShortcut.unregister(MARK_SHORTCUT)
  }
}

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 460,
    height: 720,
    minWidth: 380,
    minHeight: 560,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#0a0a0a',
    title: 'Markr',
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow?.show())

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // electron-vite sets ELECTRON_RENDERER_URL in dev; in prod load the built file.
  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // The shortcut is only live while a session is running, driven by the renderer.
  ipcMain.on('session:active', registerMarkShortcut)
  ipcMain.on('session:inactive', unregisterMarkShortcut)

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Release the OS-level binding so it does not leak after the app exits.
app.on('will-quit', unregisterMarkShortcut)
