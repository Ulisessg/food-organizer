import { type CreateIngredient } from './createIngredientsSql'
import { DbTablesNames } from 'utils/constants'

/**
 * Params order and types
 * + name - string
 * + uom_id - number,
 * + image - string | null
 * + comment - string | null
 * + ingredient.id - number
 */
const updateIngredientSql = `UPDATE ${DbTablesNames.ingredients} SET
  name = ?,
  uom_id = ?,
  image = ?,
  comment = ?

  WHERE ${DbTablesNames.ingredients}.id = ?
`

export interface UpdateIngredient extends CreateIngredient {
  id: number
}

export default updateIngredientSql
