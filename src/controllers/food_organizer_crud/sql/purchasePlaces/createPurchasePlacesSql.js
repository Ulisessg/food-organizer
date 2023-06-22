const getParametrizedValuesSqlSentence =
  require('../../../../utils/getParametrizedValuesSqlSentence')

/**
 * Params order
 * + id
 * + name
 * + address
 *
 * @param {number} recordsAmourt
 * @returns {string}
 */
const createPurchasePlaceSql = (recordsAmourt) => `INSERT INTO purchase_places (
  id,
  name,
  address
)
${getParametrizedValuesSqlSentence(
  3,
  recordsAmourt
)}
`
module.exports = createPurchasePlaceSql
