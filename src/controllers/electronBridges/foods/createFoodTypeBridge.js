const { contextBridge } = require('electron')
const { createFoodType } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const createFoodTypesSql = require('../../sql/foodTypes/createFoodTypesSql')
const getFoodTypesSql = require('../../sql/foodTypes/getFoodTypesSql')
const capitalize = require('../../../utils/capitalize')

const createFoodTypeElectronBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../sql/foodTypes/types').CreateFoodType} foodType
   */
  const create = (foodType) => {
    const foodtypeCreatedId = db.prepare(createFoodTypesSql(1)).run([
      null,
      capitalize(foodType.name)
    ]).lastInsertRowid
    const foodTypeCreated = db.prepare(getFoodTypesSql('WHERE food_types.id = ?'))
      .get([foodtypeCreatedId])
    return foodTypeCreated
  }
  contextBridge.exposeInMainWorld(
    createFoodType,
    create
  )
}

module.exports = createFoodTypeElectronBridge
