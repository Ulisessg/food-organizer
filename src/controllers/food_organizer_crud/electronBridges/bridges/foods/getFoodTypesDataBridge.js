const { contextBridge } = require('electron')
const { getFoodTypesData } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const getFoodTypesSql = require('../../../sql/foodTypes/getFoodTypesSql')

const getFoodTypesDataBridge = () => {
  const db = electronOpenDb()

  /**
   * @returns {import('../../../sql/foodTypes/types').GetFoodTypes}
   */
  const getData = () => {
    const data = db.prepare(getFoodTypesSql()).all()
    return data
  }

  contextBridge.exposeInMainWorld(
    getFoodTypesData,
    getData
  )
}

module.exports = getFoodTypesDataBridge
