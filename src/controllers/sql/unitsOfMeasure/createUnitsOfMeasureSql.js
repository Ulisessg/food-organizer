const getParametrizedValuesSqlSentence =
  require('../../../utils/getParametrizedValuesSqlSentence')

/**
 * Params order
 * + id
 * + name
 * + abbreviation
 * + uomt_id
 * @param {number} recordsAmount
 * @returns
 */
const createUnitOfMeasureSql = (recordsAmount) => `INSERT INTO units_of_measure (
  id,
  name,
  abbreviation,
  uomt_id
)
${getParametrizedValuesSqlSentence(
  4,
  recordsAmount
)}
`

module.exports = createUnitOfMeasureSql
