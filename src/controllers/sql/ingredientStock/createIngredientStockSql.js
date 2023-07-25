const getParametrizedValuesSqlSentence =
  require('../../../utils/getParametrizedValuesSqlSentence')

/**
 * Params order
 * + id - nul
 * + ingredient_id - number
 * + ingredient_qty - number
 * + comment - string
 *
 * @param {number} recordsAmount
 * @returns {string}
 */
const createIngredientStockSql = (recordsAmount) => `INSERT INTO ingredient_stock (
  id,
  ingredient_id,
  ingredient_qty,
  comment
)
${getParametrizedValuesSqlSentence(
  4,
  recordsAmount
)}
`

module.exports = createIngredientStockSql
