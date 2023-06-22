/**
 * @param {string} filter
 * @returns {string}
 */
const getIngredientsSql = (filter) => `SELECT 
ingredients.id AS ingredient_id,
ingredients.name AS ingredient_name,
ingredients.image,
ingredients.comment,
units_of_measure.name AS uom_name,
(SELECT
  json_group_array(JSON_OBJECT(
    'ingredient_purchase_place_id', ingredient_purchase_places.id,
    'purchase_place_id', purchase_places.id,
    'purchase_place_name', purchase_places.name
    ))
    FROM ingredient_purchase_places
INNER JOIN purchase_places ON purchase_places.id = ingredient_purchase_places.purchase_place_id
    WHERE ingredient_purchase_places.ingredient_id = ingredients.id
) AS ingr_purchase_places
FROM ingredients
INNER JOIN units_of_measure ON units_of_measure.id = ingredients.uom_id
${filter || ''}
`

module.exports = getIngredientsSql
