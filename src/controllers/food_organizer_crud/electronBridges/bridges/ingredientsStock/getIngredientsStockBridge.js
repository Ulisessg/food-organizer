const { contextBridge } = require('electron')
const { getIngredientsStock } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const getIngredientsStockSql = require('../../../sql/ingredientStock/getIngredientsStockSql')

const getIngredientsStockBridge = () => {
  const db = electronOpenDb()
  const getData = () => db.prepare(getIngredientsStockSql()).all()

  contextBridge.exposeInMainWorld(
    getIngredientsStock,
    getData
  )
}

module.exports = getIngredientsStockBridge
