const getFoodTypesSql = (filter = '') => `SELECT
food_types.id,
food_types.name

FROM food_types
${filter}
ORDER BY food_types.name ASC
`

module.exports = getFoodTypesSql
