import { DbTablesNames } from 'utils/constants'

const getFoodTypesSql = `SELECT
food_types.id,
food_types.name

FROM ${DbTablesNames.foodTypes}
ORDER BY food_types.name ASC
`

export type GetFoodTypes = Array<{
  id: number
  name: string
}>

export default getFoodTypesSql
