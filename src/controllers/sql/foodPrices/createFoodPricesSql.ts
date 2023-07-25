import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 *  Create a register in food_prices table
 *
 *  Order and types of params
 *
 *  + id - null
 *  + creation_date - string
 *  + food_id - number
 *  + price_date - string
 *  + value -number
 *
 *
 * @param recordsAmount - Number - How many food_ingredients will be registered
 * @returns string
 */
const createFoodPriceSql = (recordsAmount: number): string => {
  const sqlScript = `
    INSERT INTO ${DbTablesNames.foodPrices} (
      id,
      creation_date,
      food_id,
      price_date, 
      value
    )
    ${getParametrizedValuesSqlSentence(
5,
recordsAmount
)}
  `

  return sqlScript
}

export default createFoodPriceSql
