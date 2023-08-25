const { copyFileSync, existsSync } = require('fs')
const { join } = require('path')
const { ipcRenderer } = require('electron')
const { DbTablesNames } = require('./constants.js')
const safeObjectGet = require('./safeObjectGet.js')

/**
 * @param {keyof import('./constants')['DbTablesNames']} table
 * @param {string} filename
 */
const electronCopyImageFromTemp = async (table, filename) => {
  // @ts-ignore
  if (typeof safeObjectGet(
    DbTablesNames,
    table
  ) === 'undefined') {
    throw new Error('Invalid table name')
  }

  const picturesImagePath = join(
    await ipcRenderer.invoke(
      'imagesPath',
      'pictures',
      table
    ),
    filename
  )

  // Return if image already copied
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (existsSync(picturesImagePath)) return

  const tempImagePath = join(
    await ipcRenderer.invoke(
      'imagesPath',
      'temp',
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
