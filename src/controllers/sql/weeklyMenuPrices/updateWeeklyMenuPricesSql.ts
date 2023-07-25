import { DbTablesNames } from 'utils/constants'

/**
 * Prams order
 * + weekly_menu_id
 * + value
 * + price_date
 * + weekly_menu_prices.id
 */
const updateWeeklyMenuPriceSql = `UPDATE ${DbTablesNames.weeklyMenuPrices} SET
weekly_menu_id = ?,
value = ?,
price_date = ?

WHERE ${DbTablesNames.weeklyMenuPrices}.id = ?
`

export default updateWeeklyMenuPriceSql
