import { DbTablesNames } from 'utils/constants'

const getMenuPricesSql = `SELECT * FROM ${DbTablesNames.menuPrices}`

export default getMenuPricesSql
