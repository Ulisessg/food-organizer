import { DbTablesNames } from 'utils/constants'

/**
 * Params order and types
 *
 * + ingredient_id - number
 * + ingredient_qty - number
 * + comment - string | null
 * + ingredient_stock.id - number
 */
const updateIngredientStockSql = `UPDATE ${DbTablesNames.ingredientsStock} SET
  ingredient_id = ?,
  ingredient_qty = ?,
  comment = ?

  WHERE ${DbTablesNames.ingredientsStock}.id = ?
`

export default updateIngredientStockSql
