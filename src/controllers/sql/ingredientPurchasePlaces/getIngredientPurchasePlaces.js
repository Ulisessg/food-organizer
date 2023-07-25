
/**
 *  Get a register of food_ingredients table
 *
 *  Order and types of params
 *
 *  + ingredient_id - number
 */
const getIngredientPurchasePlaces = `SELECT 
ingredient_purchase_places.id, 
ingredient_purchase_places.ingredient_id, 
ingredient_purchase_places.purchase_place_id, 
purchase_places.name AS purchase_place_name

FROM ingredient_purchase_places

INNER JOIN purchase_places ON purchase_places.id = ingredient_purchase_places.purchase_place_id
WHERE ingredient_purchase_places.ingredient_id = ?;
`

module.exports = getIngredientPurchasePlaces
