/* eslint-disable max-statements */
const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')
const { getBase64Image } = require('../bridgesNames')
const { join } = require('path')

const getBase64ImageBridge = () => {
  const getImage = async (fileName, imageIsInTemporal) => {
    if (typeof fileName !== 'string' || fileName.length === 0) {
      return ''
    }
    let imagePath = ''
    if (imageIsInTemporal) {
      const temPath = await ipcRenderer.invoke(
        'imagesPath',
        'temp'
      )
      imagePath = join(
        temPath,
        fileName
      )
    } else {
      const picturesPath = await ipcRenderer.invoke(
        'imagesPath',
        'pictures'
      )
      imagePath = join(
        picturesPath,
        fileName
      )
    }
    try {
      const base64Image = await new Promise((resolve, reject) => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs.readFile(
          imagePath,
          {
            encoding: 'base64'
          },
          (err, image) => {
            if (err) reject(err)
            resolve(image)
          }
        )
      })
      return `data:image;base64,${base64Image}`
    } catch (error) {
      return ''
    }
  }

  contextBridge.exposeInMainWorld(
    getBase64Image,
    getImage
  )
}

module.exports = getBase64ImageBridge
