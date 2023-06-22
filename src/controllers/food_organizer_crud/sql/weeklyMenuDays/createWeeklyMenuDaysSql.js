const getParametrizedValuesSqlSentence =
  require('../../../../utils/getParametrizedValuesSqlSentence')

/**
 * Params order
 * + id
 * + weekly_menu_id
 * + menu_id
 * + day_id
 * @param {string} recordsAmount
 * @returns {string}
 */
const createWeeklyMenuDaysSql = (recordsAmount) => `INSERT INTO weekly_menu_days (
    id,
    weekly_menu_id,
    menu_id,
    day_id
  )
  ${getParametrizedValuesSqlSentence(
  4,
  recordsAmount
)}
  `

module.exports = createWeeklyMenuDaysSql
