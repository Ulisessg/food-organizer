const { contextBridge } = require('electron')
const { createIngredientsStok } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const createIngredientStockSql = require('../../../sql/ingredientStock/createIngredientStockSql')
const getIngredientsStockSql = require('../../../sql/ingredientStock/getIngredientsStockSql')

const createIngredientsStokBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../../sql/ingredientStock/types').CreateIngredientStock} ingredientStock
   */
  const create = (ingredientStock) => {
    const ingredientStockCreatedId = db.prepare(createIngredientStockSql(1)).run([
      null,
      ingredientStock.ingredient_id,
      ingredientStock.ingredient_qty,
      ingredientStock.comment
    ]).lastInsertRowid
    const ingredientStockCreated = db
      .prepare(getIngredientsStockSql('WHERE ingredient_stock.id = ?'))
      .get([ingredientStockCreatedId])
    return ingredientStockCreated
  }

  contextBridge.exposeInMainWorld(
    createIngredientsStok,
    create
  )
}

module.exports = createIngredientsStokBridge
