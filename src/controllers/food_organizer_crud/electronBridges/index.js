const getUomDataBridge = require('./bridges/getUomDataBridge')

/**
 * Enable all electron bridges to handle database requests
 */
const openBridges = () => {
  getUomDataBridge()
}

module.exports = openBridges
