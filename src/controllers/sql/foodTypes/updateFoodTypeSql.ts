import { DbTablesNames } from 'utils/constants'

/**
 *  Update a register in food_ingredients table
 *
 *  Order and types of params
 *
 *  + name - string
 *  + id - number
 */
const updateFoodTypeSql = `UPDATE ${DbTablesNames.foodTypes} SET
name = ?
WHERE ${DbTablesNames.foodTypes}.id = ?
`

export default updateFoodTypeSql
