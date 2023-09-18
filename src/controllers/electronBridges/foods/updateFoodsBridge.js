/* eslint-disable lines-around-comment */
const { contextBridge } = require('electron')
const { updateFoods } = require('../bridgesNames')
const openDb = require('../../db/electronOpenDb')
const updateFoodsSql = require('../../sql/foods/updateFoodsSql')
const getUpdatedFoodSql = require('../../sql/foods/getFoodsGroupedByTypeSql')
const capitalize = require('../../../utils/capitalize')
const electronCopyImageFromTemp = require('../../../utils/electronCopyImageFromTemp')

const updateFoodsBridge = () => {
  /**
   * @param {import('../../dbTablesTypes').foods} food
   */
  const update = async (food) => {
    const db = openDb()
    const foodNameCapitalized = capitalize(food.name)

    db.prepare(updateFoodsSql).run([
      foodNameCapitalized,
      food.preparation_time,
      food.food_type_id,
      food.image,
      food.id
    ])
    if (typeof food.image === 'string' && food.image.length >= 1) {
      await electronCopyImageFromTemp(
        'foods',
        food.image
      )
    }
    /**
     * @type {import('../../sql/foods/types.d').UpdateFoods}
     */
    const updatedFood = db.prepare(getUpdatedFoodSql('WHERE foods.id = ?')).get([food.id])
    /**
     * @type {import('../../sql/foods/types.d').UpdateFoods}
     */
    const parsedFood = {
      ...updatedFood,
      foods: JSON.parse(updatedFood.foods)
    }
    return {
      ...parsedFood
    }
  }

  contextBridge.exposeInMainWorld(
    updateFoods,
    update
  )
}

module.exports = updateFoodsBridge
