const getUomDataBridge = require('./bridges/getUomDataBridge')
const getDaysDataBridge = require('./bridges/getDaysDataBridge')
const getPurchasePlacesDataBridge = require('./bridges/purchasePlacesDataBridge')

/**
 * Enable all electron bridges to handle database requests
 */
const openBridges = () => {
  getUomDataBridge()
  getDaysDataBridge()
  getPurchasePlacesDataBridge()
}

module.exports = openBridges
