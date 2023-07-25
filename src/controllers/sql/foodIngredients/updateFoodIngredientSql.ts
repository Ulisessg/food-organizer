import { DbTablesNames } from 'utils/constants'

/**
 * Update row in food_ingredients
 *
 *  Order and types of params:
 *
 *  + food_id - number
 *  + ingredient_id - number
 *  + ingredient_qty - number
 *  + food_ingredient.id - number
 */
const updateFoodIngredientSql = `UPDATE ${DbTablesNames.foodIngredients}
  SET

  food_id = ?,
  ingredient_id = ?,
  ingredient_qty = ?,

  WHERE ${DbTablesNames.foodIngredients}.id = ?
`

export default updateFoodIngredientSql
