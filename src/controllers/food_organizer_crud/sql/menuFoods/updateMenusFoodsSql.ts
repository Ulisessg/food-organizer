import { DbTablesNames } from 'utils/constants'

/**
 * Params order and types
 *  + food_id - number
 *  + menu_id - number
 *  + menu_foods.id - number
 *
 */
const updateMenuFoodsSql = `UPDATE ${DbTablesNames.menuFoods} SET
food_id = ?,
menu_id = ?

WHERE ${DbTablesNames.menuFoods}.id = ?
`
export default updateMenuFoodsSql
