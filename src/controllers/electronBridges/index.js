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
  createIngredientsBridge,
  updateIngredientBridge
} = require('./ingredients')

const {
  createIngredientsStockBridge,
  getIngredientsStockBridge,
  updateIngredientsStockBridge
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
  createFoodtypeBridge,
  updateFoodTypesBridge,
  updateFoodsBridge
} = require('./foods')

const {
  selectImageBridge,
  getBase64Image
} = require('./os')

/**
 * Enable all electron bridges to handle database requests
 */
const openBridges = () => {
  // Database
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
  updateIngredientBridge()
  updateIngredientsStockBridge()
  updateFoodTypesBridge()
  updateFoodsBridge()

  // Os
  selectImageBridge()
  getBase64Image()
}

module.exports = openBridges
