const { copyFileSync } = require('fs')
const { join } = require('path')
const { ipcRenderer } = require('electron')

/**
 * @param {keyof import('./constants')['DbTablesNames']} table
 * @param {string} filename
 */
const electronCopyImageFromTemp = async (table, filename) => {
  const tempImagePath = join(
    await ipcRenderer.invoke(
      'imagesPath',
      'temp',
      table
    ),
    filename
  )
  const picturesImagePath = join(
    await ipcRenderer.invoke(
      'imagesPath',
      'pictures',
      table
    ),
    filename
  )
  copyFileSync(
    tempImagePath,
    picturesImagePath
  )
}

module.exports = electronCopyImageFromTemp
