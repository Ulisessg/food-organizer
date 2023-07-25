const weeklyMenuDaySql = require('./getWeeklyMenuDaysSql')

/**
 * @param {string} filter
 * @returns {string}
 */
const getWeeklyMenusSql = (filter = '') => `
SELECT
weekly_menus.id,
weekly_menus.creation_date,
${weeklyMenuDaySql(
  1,
  'monday'
)},
${weeklyMenuDaySql(
  2,
  'tuesday'
)},
${weeklyMenuDaySql(
  3,
  'wednesday'
)},
${weeklyMenuDaySql(
  4,
  'thursday'
)},
${weeklyMenuDaySql(
  5,
  'friday'
)},
${weeklyMenuDaySql(
  6,
  'saturday'
)},
${weeklyMenuDaySql(
  7,
  'sunday'
)}
FROM weekly_menus
${filter}
GROUP BY weekly_menus.id
ORDER BY weekly_menus.creation_date
`
module.exports = getWeeklyMenusSql
