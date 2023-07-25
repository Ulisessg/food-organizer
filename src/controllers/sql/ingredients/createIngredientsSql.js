const getParametrizedValuesSqlSentence =
  require('../../../utils/getParametrizedValuesSqlSentence')

/**
 * Params order and types
 *
 * + id - null,
 * + name - string
 * + uom_id - number
 * + image - string | null
 * + comment - string | null
 *
 * @param {number} recordsAmount
 * @returns {string}
 */
const createingredientSql = (recordsAmount) => `INSERT INTO ingredients (
  id,
  name,
  uom_id,
  image,
  comment
)
${getParametrizedValuesSqlSentence(
  5,
  recordsAmount
)}
`

module.exports = createingredientSql
