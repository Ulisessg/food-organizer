const getIngredientsDataBridge = require('./getIngredientsDataBridge')
const createIngredientsBridge = require('./createIngredientsBridge')
const createIngredientPurchasePlacesBridge = require('./createIngredientPurchasePlacesBridge')
const updateIngredientBridge = require('./updateIngredientBridge')

module.exports = {
  createIngredientPurchasePlacesBridge,
  createIngredientsBridge,
  getIngredientsDataBridge,
  updateIngredientBridge
}
