const { contextBridge } = require('electron')
const fs = require('fs')
const { getBase64Image } = require('../bridgesNames')

const getBase64ImageBridge = () => {
  const getImage = async (filePath) => {
    if (typeof filePath !== 'string' || filePath.length === 0) {
      return ''
    }
    try {
      const base64Image = await new Promise((resolve, reject) => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs.readFile(
          filePath,
          {
            encoding: 'base64'
          },
          (err, image) => {
            if (err) reject(err)
            resolve(image)
          }
        )
      })
      return `data:image/jpeg;base64,${base64Image}`
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
