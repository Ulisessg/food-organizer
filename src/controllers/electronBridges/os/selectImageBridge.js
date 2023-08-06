/* eslint-disable lines-around-comment */
// @ts-check
const { copyFile } = require('fs')
const { contextBridge, ipcRenderer } = require('electron')
const { selectImage } = require('../bridgesNames')
const { join } = require('path')

const selectImageBridge = () => {
  // eslint-disable-next-line padded-blocks
  /**
   * @returns {Promise<import('../../../../global').SelectImageResult>}
   */
  const openDialogToSelectImage = async () => {
    /**
     * @type {import('../../../../global').SelectImageResultMainProcess}
     */
    const image = await ipcRenderer.invoke(selectImage)
    const tempFolder = await ipcRenderer.invoke(
      'imagesPath',
      'temp'
    )
    console.log(tempFolder)
    console.log(image)
    await new Promise((resolve, reject) => {
      try {
        copyFile(
          image.filePaths[0],
          join(
            tempFolder,
            image.fileName
          ),
          (err) => {
            if (err) reject(err)
            resolve('')
          }
        )
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
    return {
      canceled: image.canceled,
      fileName: image.fileName
    }
  }
  contextBridge.exposeInMainWorld(
    selectImage,
    openDialogToSelectImage
  )
}

module.exports = selectImageBridge
