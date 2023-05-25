import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'
import { type ingredient_stock } from 'controllers/food_organizer_crud/dbTablesTypes'

/**
 * Params order
 * + id - nulñ
 * + ingredient_id - number
 * + ingredient_qty - number
 * + comment - string
 * + creation_date - string
 *
 * @param recordsAmount
 * @returns
 */
const createIngredientStockSql = (recordsAmount:
number):
string => `INSERT INTO ${DbTablesNames.ingredientsStock} (
  id,
  ingredient_id,
  ingredient_qty,
  comment,
  creation_date
)
${getParametrizedValuesSqlSentence(
5,
recordsAmount
)}
`

export interface CreateIngredientStock extends Omit<ingredient_stock, 'id' | 'creation_date'> {
  creation_date: string
}

export default createIngredientStockSql
