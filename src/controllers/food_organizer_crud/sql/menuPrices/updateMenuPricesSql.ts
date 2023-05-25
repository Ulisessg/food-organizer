import { DbTablesNames } from 'utils/constants'

/**
 * Params order
 * + menu_id
 * + value
 * + price_date
 * + menu_prices.id
 */
const updateMenuPriceSql = `UPDATE ${DbTablesNames.menuPrices} SET 
  menu_id = ?,
  value = ?,
  price_date = ?
  WHERE ${DbTablesNames.menuPrices}.id = ?
`
export default updateMenuPriceSql
