import { DbTablesNames } from 'utils/constants'

/**
 *  Update a register in food_ingredients table
 *
 *  Order and types of params
 *
 *  + food_id - number
 *  + price_date - string
 *  + value - number
 *  + id - number
 */
const updateFoodPriceSql = `UPDATE ${DbTablesNames.foodPrices} SET
food_id = ?,
price_date = ?,
value = ?
WHERE ${DbTablesNames.foodPrices}.id = ?
`
export default updateFoodPriceSql
