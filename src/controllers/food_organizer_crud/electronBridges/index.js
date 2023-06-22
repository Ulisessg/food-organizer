/* eslint-disable max-statements */
const {
  getUomDataBridge,
  createUnitsOfMeasureBridge
} = require('./bridges/unitsOfMeasure')
const { createUnitsOfMeasureTypesBridge } = require('./bridges/unitsOfMeasureTypes')
const getDaysDataBridge = require('./bridges/getDaysDataBridge')
const {
  createPurchasePlacesBridge,
  getPurchasePlacesDataBridge
} = require('./bridges/purchasePlaces')
const {
  getIngredientsDataBridge,
  createIngredientsBridge
} = require('./bridges/ingredients')
const {
  createIngredientsStockBridge,
  getIngredientsStockBridge
} = require('./bridges/ingredientsStock')
const {
  createMenusBridge,
  getMenusDataBridge,
  getMenusIngredientsBridge
} = require('./bridges/menus')
const getWeeklyMenusDataBridge = require('./bridges/getWeeklyMenusDataBridge')
const {
  getFoodsDataBridge,
  getFoodTypesDataBridge,
  createFoodsBridge
} = require('./bridges/foods')

/**
 * Enable all electron bridges to handle database requests
 */
const openBridges = () => {
  getUomDataBridge()
  getDaysDataBridge()
  getPurchasePlacesDataBridge()
  getFoodTypesDataBridge()
  getIngredientsDataBridge()
  getIngredientsStockBridge()
  getFoodsDataBridge()
  getMenusDataBridge()
  getWeeklyMenusDataBridge()
  getMenusIngredientsBridge()

  createFoodsBridge()
  createIngredientsBridge()
  createIngredientsStockBridge()
  createMenusBridge()
  createUnitsOfMeasureBridge()
  createUnitsOfMeasureTypesBridge()
  createPurchasePlacesBridge()
}

module.exports = openBridges
