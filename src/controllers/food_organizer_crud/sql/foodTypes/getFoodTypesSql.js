const getFoodTypesSql = `SELECT
food_types.id,
food_types.name

FROM food_types
ORDER BY food_types.name ASC
`

module.exports = getFoodTypesSql
