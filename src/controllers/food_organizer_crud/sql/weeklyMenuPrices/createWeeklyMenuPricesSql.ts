import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'
import { type weekly_menu_prices } from 'controllers/food_organizer_crud/dbTablesTypes'

/**
 * Params order:
 * + id
 * + weekly_menu_id
 * + value
 * + price_date
 * + creation_date
 *
 * @param recordsAmount number
 * @returns
 */
const createWeeklyMenuPriceSql = (recordsAmount: number):
string => `INSERT INTO ${DbTablesNames.weeklyMenuPrices} (
  id,
  weekly_menu_id,
  value,
  price_date, 
  creation_date
)
${getParametrizedValuesSqlSentence(
5,
recordsAmount
)}
`

export default createWeeklyMenuPriceSql

export interface CreateWeeklyMenuPrice extends Omit<weekly_menu_prices, 'id'> {

}
