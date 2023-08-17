/* eslint-disable max-statements */
// @ts-check
/* eslint-disable lines-around-comment */
/* eslint-disable multiline-comment-style */
const { app } = require('electron')
const { existsSync, mkdirSync } = require('fs')
const { join } = require('path')

/**
 * Verify if '{temp || pictures }/Food Organizer/{table}' folder exists, create otherwise
 * @param {'pictures' | 'temp'} folder
 * @param {keyof import('./constants')['DbTablesNames']} table
 * @returns {string} - Folder structure
 */
const electronCheckImagesStorage = (folder, table) => {
  /**
     * Folder structure independently if path is 'pictures' or 'temp' to finally get
     *  '{pictures}/Food Organizer/{table}'
     *  or
     *  '{temp}/Food Organizer/{table}'
     */
  const folderStructure = join(
    'Food Organizer',
    table
  )
  if (folder === 'pictures') {
    const picturesFolder = join(
      app.getPath('pictures'),
      folderStructure
    )
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!existsSync(picturesFolder)) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      mkdirSync(
        picturesFolder,
        {
          recursive: true
        }
      )
    }
    return picturesFolder
  } else if (folder === 'temp') {
    const tempFolder = join(
      app.getPath('temp'),
      folderStructure
    )
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!existsSync(tempFolder)) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      mkdirSync(
        tempFolder,
        {
          recursive: true
        }
      )
    }
    return tempFolder
  }
  throw new Error('Invalid folder')
}

module.exports = electronCheckImagesStorage
