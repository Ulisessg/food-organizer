import { DbTablesNames } from 'utils/constants'

/**
 *  Update a register in food_ingredients table
 *
 *  Order and types of params
 *
 *  + ingredient_id - number
 *  + price_date - string
 *  + value - number
 *  + id - number
 */
const updateIngredientPriceSql = `UPDATE ${DbTablesNames.ingredientPrices} SET
ingredient_id = ?,
price_date = ?,
value = ?
WHERE ${DbTablesNames.ingredientPrices}.id = ?
`

export default updateIngredientPriceSql
