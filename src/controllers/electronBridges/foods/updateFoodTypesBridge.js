/* eslint-disable lines-around-comment */
/* eslint-disable no-trailing-spaces */
const { contextBridge } = require('electron')
const { updateFoodTypes } = require('../bridgesNames')
const openDb = require('../../db/electronOpenDb')
const updateFoodTypesSql = require('../../sql/foodTypes/updateFoodTypesSql')
const getFoodTypesSql = require('../../sql/foodTypes/getFoodTypesSql')

const updateFoodTypesBridge = () => {
  /** 
   * @param {import('../../sql/foodTypes/types').UpdateFoodType} foodType
   */
  const update = (foodType) => {
    const db = openDb()
    db.prepare(updateFoodTypesSql).run([
      foodType.name,
      foodType.id
    ])
    const updatedFoodType = db.prepare(getFoodTypesSql('WHERE food_types.id = ?'))
      .get([foodType.id])

    return updatedFoodType
  }
  contextBridge.exposeInMainWorld(
    updateFoodTypes,
    update
  )
}

module.exports = updateFoodTypesBridge
