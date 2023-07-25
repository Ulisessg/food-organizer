const getParametrizedValuesSqlSentence =
  require('../../../utils/getParametrizedValuesSqlSentence')

/**
 *  Params order and types
 *  + id - null
 *  + menu_id - number
 *  + food_id - number
 *
 * @param {number} recordsAmount
 * @returns {string}
 */
const createMenuFoodsSql = (recordsAmount) => `INSERT INTO menu_foods (
  id,
  menu_id,
  food_id
)
${getParametrizedValuesSqlSentence(
  3,
  recordsAmount
)}
`

module.exports = createMenuFoodsSql
