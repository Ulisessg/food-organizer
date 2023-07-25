/* eslint-disable max-statements */
const {
  getUomDataBridge,
  createUnitsOfMeasureBridge,
  updateUnitsOfMeasureBridge
} = require('./unitsOfMeasure')

const {
  createUnitsOfMeasureTypesBridge,
  updateUnitsOfMeasureTypesBridge
} = require('./unitsOfMeasureTypes')

const getDaysDataBridge = require('./getDaysDataBridge')

const {
  createPurchasePlacesBridge,
  getPurchasePlacesDataBridge
} = require('./purchasePlaces')

const {
  createIngredientPurchasePlacesBridge,
  getIngredientsDataBridge,
  createIngredientsBridge
} = require('./ingredients')

const {
  createIngredientsStockBridge,
  getIngredientsStockBridge
} = require('./ingredientsStock')

const {
  createMenusBridge,
  getMenusDataBridge,
  getMenusIngredientsBridge
} = require('./menus')

const {
  createWeeklyMenuBridge,
  getWeeklyMenusDataBridge
} = require('./weeklyMenus')

const {
  getFoodsDataBridge,
  getFoodTypesDataBridge,
  createFoodsBridge,
  createFoodtypeBridge
} = require('./foods')

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
  createFoodtypeBridge()
  createIngredientsBridge()
  createIngredientsStockBridge()
  createMenusBridge()
  createUnitsOfMeasureBridge()
  createUnitsOfMeasureTypesBridge()
  createPurchasePlacesBridge()
  createIngredientPurchasePlacesBridge()
  createWeeklyMenuBridge()

  updateUnitsOfMeasureTypesBridge()
  updateUnitsOfMeasureBridge()
}

module.exports = openBridges
