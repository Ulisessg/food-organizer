import { DbTablesNames } from 'utils/constants'

/**
 * Params order
 * + name
 * + preparation_time
 * + food_type_id
 * + image
 */
const udpateFoodSql = `UPDATE ${DbTablesNames.foods} SET
name = ?,
preparation_time = ?,
food_type_id = ?,
image = ?

WHERE ${DbTablesNames.foods}.id = ?
`
export default udpateFoodSql
