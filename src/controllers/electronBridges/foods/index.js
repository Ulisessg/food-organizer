const getFoodTypesDataBridge = require('./getFoodTypesDataBridge')
const getFoodsDataBridge = require('./getFoodsDataBridge')
const createFoodsBridge = require('./createFoodsBridge')
const createFoodtypeBridge = require('./createFoodTypeBridge')
const updateFoodTypesBridge = require('./updateFoodTypesBridge')
const updateFoodsBridge = require('./updateFoodsBridge')

module.exports = {
  createFoodsBridge,
  createFoodtypeBridge,
  getFoodTypesDataBridge,
  getFoodsDataBridge,
  updateFoodTypesBridge,
  updateFoodsBridge
}
