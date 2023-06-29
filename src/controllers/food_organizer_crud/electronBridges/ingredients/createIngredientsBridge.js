const { contextBridge } = require('electron')
const { createIngredients } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const createIngredientsSql = require('../../sql/ingredients/createIngredientsSql')
const getIngredientsSql = require('../../sql/ingredients/getIngredientsSql')

const createIngredientsBridge = () => {
  const db = electronOpenDb()

  /**
   * @returns {import('../../sql/ingredients/types').GetIngredients[0]}
   * @param {import('../../sql/ingredients/types').CreateIngredient} ingredient
   */
  const create = (ingredient) => {
    const ingredientCreatedId = db.prepare(createIngredientsSql(1)).run([
      null,
      ingredient.name,
      ingredient.uomId,
      ingredient.image || '',
      ingredient.comment || ''
    ]).lastInsertRowid
    const ingredientCreated = db.prepare(getIngredientsSql('WHERE ingredients.id = ?'))
      .get([ingredientCreatedId])
    return ingredientCreated
  }
  contextBridge.exposeInMainWorld(
    createIngredients,
    create
  )
}

module.exports = createIngredientsBridge
