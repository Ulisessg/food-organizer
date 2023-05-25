
import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'
import { type menu_prices } from 'controllers/food_organizer_crud/dbTablesTypes'

/**
 * Params order:
 *
 * + id
 * + menu_id
 * + price_date
 * + value
 * + creation_date
 * @param recordsAmount number
 * @returns
 */
const createMenuPriceSql = (recordsAmount: number):
string => `INSERT INTO ${DbTablesNames.menuPrices}(
  id,
  menu_id,
  price_date,
  value,
  creation_date
)
${getParametrizedValuesSqlSentence(
5,
recordsAmount
)}
`

export default createMenuPriceSql

export interface CreateMenuPrice extends Omit<menu_prices, 'id'> {}
