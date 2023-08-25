// @ts-check
/* eslint-disable max-statements */
/* eslint-disable lines-around-comment */

// Electron entry point
const { BrowserWindow, app, ipcMain, dialog } = require('electron')
const { join, basename } = require('path')
const electronOpenDb = require('./src/controllers/db/electronOpenDb')
const { selectImage } = require('./src/controllers/electronBridges/bridgesNames')
const { rmSync } = require('fs')
const checkImagesStorage = require('./src/utils/electronCheckImagesStorage')

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
      try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        rmSync(
          join(
            app.getPath('temp'),
            'Food Organizer'
          ),
          {
            recursive: true
          }
        )
      } catch {
        //
      }
    }
  )
}

ipcMain.handle(
  'imagesPath',
  (_ev, path, table) => {
    if (path === 'pictures') {
      return checkImagesStorage(
        'pictures',
        table
      )
    } else if (path === 'temp') {
      return checkImagesStorage(
        'temp',
        table
      )
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

    /**
     * If cancelled use an empty string to avoid error
     *
     * If your function sets new image directly from 'fileName' property
     * and "select image" is cancelled, the original image will disappear
     */

    const fileName = basename(image.filePaths[0] ?? '')
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
