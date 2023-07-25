/**
 * @param {string | undefined} filter
 * @returns {string}
 */
const getFoodsGroupedByTypeSql = (filter) => `SELECT
food_types.id AS food_type_id,
food_types.name AS food_type_name,
COUNT(foods.id) AS total_foods,
json_group_array(JSON_OBJECT(
  'food_id', foods.id,
  'food_name', foods.name,
  'preparation_time', foods.preparation_time,
  'image', foods.image
)) AS foods
FROM food_types
JOIN foods ON foods.food_type_id = food_types.id
${filter || ''}
GROUP BY food_type_name
ORDER BY food_type_name
`

module.exports = getFoodsGroupedByTypeSql
