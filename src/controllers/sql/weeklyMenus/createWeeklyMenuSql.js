const getParametrizedValuesSqlSentence =
  require('../../../utils/getParametrizedValuesSqlSentence')

/**
 * Fields order:
 * - id {null}
 * - creation_date {string}
 * @param {number} recordsAmount
 * @returns {string}
 */
const createWeeklyMenuSql = (recordsAmount) => `INSERT INTO weekly_menus
(id, creation_date)
${getParametrizedValuesSqlSentence(
  2,
  recordsAmount
)}
`

module.exports = createWeeklyMenuSql
