const { contextBridge } = require('electron')
const electronOpenDb = require('../../../db/electronOpenDb')
const { getMenusIngredients } = require('../bridgesNames')
const getMenusIngredientsSql = require('../../../sql/menus/getMenusIngredientsSql')

const getMenusIngredientsBridge = () => {
  const getData = () => {
    const db = electronOpenDb()
    const data = db.prepare(getMenusIngredientsSql).all()
    return data
  }

  contextBridge.exposeInMainWorld(
    getMenusIngredients,
    getData
  )
}

module.exports = getMenusIngredientsBridge
