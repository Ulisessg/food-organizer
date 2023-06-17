const getUomDataBridge = require('./bridges/getUomDataBridge')
const getDaysDataBridge = require('./bridges/getDaysDataBridge')

/**
 * Enable all electron bridges to handle database requests
 */
const openBridges = () => {
  getUomDataBridge()
  getDaysDataBridge()
}

module.exports = openBridges
