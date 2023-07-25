const getMenusIngredientsSql = `SELECT
menu_foods.menu_id AS id,

(SELECT JSON_GROUP_ARRAY(JSON_OBJECT(
    'ingredient_id', food_ingredients.ingredient_id,
        'ingredient_name', ingredients.name,
        'ingredient_qty', food_ingredients.ingredient_qty
    )) FROM food_ingredients
    INNER JOIN ingredients ON ingredients.id = food_ingredients.ingredient_id
    WHERE food_ingredients.food_id = menu_foods.food_id
) as ingredients

FROM menu_foods
GROUP BY menu_foods.menu_id
ORDER BY menu_foods.menu_id asc;`

module.exports = getMenusIngredientsSql
