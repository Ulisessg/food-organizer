import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'
import { type menu_foods } from 'controllers/food_organizer_crud/dbTablesTypes'

/**
 *  Params order and types
 *  + id - null
 *  + menu_id - number
 *  + food_id - number
 *  + creation_date - string
 *
 * @param recordsAmount - number
 * @returns string
 */
const createMenuFoodsSql = (recordsAmount: number):
string => `INSERT INTO ${DbTablesNames.menuFoods} (
  id,
  menu_id,
  food_id,
  creation_date
)
${getParametrizedValuesSqlSentence(
4,
recordsAmount
)}
`

export type CreateMenuFoods = Array<Omit<menu_foods, 'id'>>

export default createMenuFoodsSql
