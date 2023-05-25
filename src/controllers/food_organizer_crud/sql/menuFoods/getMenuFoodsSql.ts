import { DbTablesNames } from 'utils/constants'

const getMenuFoodsSql = `SELECT * FROM ${DbTablesNames.menuFoods}`

export default getMenuFoodsSql
