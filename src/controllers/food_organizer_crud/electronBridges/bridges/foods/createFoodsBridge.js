/* eslint-disable max-lines-per-function */
// @ts-check
const { contextBridge } = require('electron')
const { createFoods } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const createFoodsSql = require('../../../sql/foods/createFoodsSql')
const createFoodIngredientsSql = require('../../../sql/foodIngredients/createFoodIngredientsSql')
const getFoodsGroupedByTypeSql = require('../../../sql/foods/getFoodsGroupedByTypeSql')

const createFoodsBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../../../../redux/slices/foodsSlice/types').CreateFood} food
   */
  const createFood = (food) => {
    const food_id = db.prepare(createFoodsSql(1)).run([
      null,
      food.name,
      food.preparation_time || 0,
      food.food_type_id,
      food.image
    ]).lastInsertRowid
    const createFoodIngredient = db.prepare(createFoodIngredientsSql(1))

    /**
     * @type {import('../../../sql/foodIngredients/types').CreateFoodIngredients}
     */
    const foodIngredients = food.ingredients
    foodIngredients.forEach(({
      ingredient_id,
      ingredient_qty
    }) => {
      createFoodIngredient.run([
        null,
        food_id,
        ingredient_id,
        ingredient_qty
      ])
    })

    /**
     * @type {import('../../../sql/foods/types').GetFoods[0]}
     */
    const foodCreated = db.prepare(getFoodsGroupedByTypeSql('WHERE foods.id = ?'))
      .get([Number(food_id)])

    return {
      ...foodCreated,
      // @ts-ignore
      foods: JSON.parse(foodCreated.foods)
    }
  }
  contextBridge.exposeInMainWorld(
    createFoods,
    createFood
  )
}

module.exports = createFoodsBridge
