const weeklyMenuDaySql = require('./getWeeklyMenuDaysSql')

const getWeeklyMenusSql = `
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
GROUP BY weekly_menus.id
ORDER BY weekly_menus.creation_date
`
module.exports = getWeeklyMenusSql
