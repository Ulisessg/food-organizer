// @ts-check

// Electron entry point
const { BrowserWindow, app } = require('electron')
const { join } = require('path')
const electronOpenDb = require('./src/controllers/db/electronOpenDb')

const createInitialWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: join(
        __dirname,
        'preload.js'
      )
    }
  })
  win.maximize()
  win.loadURL('http://localhost:3000')

  win.on(
    'closed',
    () => {
      const db = electronOpenDb()
      db.close()
    }
  )
}

app.on(
  'ready',
  createInitialWindow
)
