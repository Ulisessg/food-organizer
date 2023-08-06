// @ts-check

// Electron entry point
const { BrowserWindow, app, ipcMain, dialog } = require('electron')
const { join, basename } = require('path')
const electronOpenDb = require('./src/controllers/db/electronOpenDb')
const { selectImage } = require('./src/controllers/electronBridges/bridgesNames')

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

ipcMain.handle(
  'imagesPath',
  (_ev, path) => {
    if (path === 'pictures') {
      return app.getPath('pictures')
    } else if (path === 'temp') {
      return app.getPath('temp')
    }
    return ''
  }
)

ipcMain.handle(
  selectImage,
  async (ev) => {
    const image = await dialog.showOpenDialog({
      filters: [
        {
          extensions: [
            'jpg',
            'png',
            'gif',
            'jpeg',
            'webp'
          ],
          name: 'Images'
        }
      ],
      properties: ['openFile']
    })
    const fileName = basename(image.filePaths[0])
    return {
      ...image,
      fileName
    }
  }
)

app.on(
  'ready',
  createInitialWindow
)
