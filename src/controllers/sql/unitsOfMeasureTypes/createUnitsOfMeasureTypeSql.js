const getParametrizedValuesSqlSentence =
  require('../../../utils/getParametrizedValuesSqlSentence')

/**
 * Params order:
 * + id
 * + name
 * @param {number} recordsAmount
 * @returns {string}
 */
const createUnitOfMeasureTypeSql =
  (recordsAmount) => `INSERT INTO units_of_measure_types (
  id,
  name
)
${getParametrizedValuesSqlSentence(
    2,
    recordsAmount
  )}
`

module.exports = createUnitOfMeasureTypeSql
