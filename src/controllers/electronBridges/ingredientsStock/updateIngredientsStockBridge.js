/* eslint-disable lines-around-comment */
const { contextBridge } = require('electron')
const { updateIngredientsStock } = require('../bridgesNames')
const openDb = require('../../db/electronOpenDb')
const updateIngredientsStockSql = require('../../sql/ingredientStock/updateIngredientsStockSql')
const getIngredientsStockSql = require('../../sql/ingredientStock/getIngredientsStockSql')

const updateIngredientStockBridge = () => {
  /**
   *
   * @param {import('../../sql/ingredientStock/types').GetIngredientStock[0]} ingredientStock
   */
  const update = (ingredientStock) => {
    const db = openDb()
    db.prepare(updateIngredientsStockSql).run([
      ingredientStock.ingredient_id,
      ingredientStock.ingredient_qty,
      ingredientStock.comment,
      ingredientStock.ingredient_stock_id
    ])
    const ingredientStockUpdated = db
      .prepare(getIngredientsStockSql('WHERE ingredient_stock.id = ?'))
      .get([ingredientStock.ingredient_stock_id])

    return ingredientStockUpdated
  }

  contextBridge.exposeInMainWorld(
    updateIngredientsStock,
    update
  )
}

module.exports = updateIngredientStockBridge
