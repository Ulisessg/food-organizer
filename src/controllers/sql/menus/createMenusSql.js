const getParametrizedValuesSqlSentence =
  require('../../../utils/getParametrizedValuesSqlSentence')

/**
 * Fields order:
 * - id  null
 * - comment string
 * @param {number} recordsAmount
 */
const createMenusSql = (recordsAmount) => `INSERT INTO menus
(id, comment)
${getParametrizedValuesSqlSentence(
  2,
  recordsAmount
)}
`

module.exports = createMenusSql
