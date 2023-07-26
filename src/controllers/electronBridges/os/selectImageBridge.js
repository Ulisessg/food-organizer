const { contextBridge, ipcRenderer } = require('electron')
const { selectImage } = require('../bridgesNames')
const fs = require('fs')

const selectImageBridge = () => {
  // eslint-disable-next-line padded-blocks
  const openDialogToSelectImage = async () => {

    /**
     * @type {Awaited<ReturnType<import('electron').Dialog['showOpenDialog']>>}
     */
    const image = await ipcRenderer.invoke(selectImage)
    if (!image.canceled) {
      const imageBase64 = await new Promise((resolve, reject) => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs.readFile(
          image.filePaths[0],
          {
            encoding: 'base64'
          },
          (err, img) => {
            if (err) reject(err)
            resolve(img)
          }
        )
      })
      return {
        ...image,
        base64Image: `data:image/jpeg;base64,${imageBase64}`
      }
    }

    return {
      ...image,
      base64Image: ''
    }
  }
  contextBridge.exposeInMainWorld(
    selectImage,
    openDialogToSelectImage
  )
}

module.exports = selectImageBridge
