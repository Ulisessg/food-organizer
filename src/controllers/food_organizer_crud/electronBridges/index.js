const getUomDataBridge = require('./bridges/getUomDataBridge')
const getDaysDataBridge = require('./bridges/getDaysDataBridge')
const getPurchasePlacesDataBridge = require('./bridges/purchasePlacesDataBridge')
const getFoodTypesDataBridge = require('./bridges/getFoodTypesDataBridge')
const getIngredientsDataBridge = require('./bridges/getIngredientsDataBridge')
const getIngredientsStockBridge = require('./bridges/getIngredientsStockBridge')
const getFoodsDataBridge = require('./bridges/getFoodsDataBridge')
const getMenusDataBridge = require('./bridges/getMenusDataBridge')
const getWeeklyMenusDataBridge = require('./bridges/getWeeklyMenusDataBridge')

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
}

module.exports = openBridges
