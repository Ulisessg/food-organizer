import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'
import { type ingredients } from 'controllers/food_organizer_crud/dbTablesTypes'

/**
 * Params order and types
 *
 * + id - null,
 * + name - string
 * + uom_id - number
 * + image - string | null
 * + comment - string | null
 * + creation_date - string
 *
 * @param recordsAmount - number
 * @returns string
 */
const createingredientSql = (recordsAmount: number):
string => `INSERT INTO ${DbTablesNames.ingredients} (
  id,
  name,
  uom_id,
  image,
  comment,
  creation_date
)
${getParametrizedValuesSqlSentence(
6,
recordsAmount
)}
`
export interface CreateIngredient {
  comment: string | null
  creation_date: string
  image: string | null
  name: string
  uomId: number
}

export interface CreateIngredientReturn extends ingredients {
  uomName: string
}

export default createingredientSql
