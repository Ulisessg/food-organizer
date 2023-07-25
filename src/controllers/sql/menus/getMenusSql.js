const getMenusSql = (filter) => `SELECT
menus.id, menus.comment,
JSON_GROUP_ARRAY(JSON_OBJECT(
  'food_id', foods.id,
  'food_name', foods.name,
  'preparation_time', foods.preparation_time,
  'image', foods.image
)) AS menu_foods
FROM menu_foods
JOIN menus ON menus.id = menu_foods.menu_id
JOIN foods ON foods.id = menu_foods.food_id
${filter || ''}
GROUP BY menus.id
ORDER BY menus.id asc`

module.exports = getMenusSql
