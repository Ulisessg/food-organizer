import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'
import { type ingredient_prices } from 'controllers/dbTablesTypes'

/**
 *  Create a register in ingredient_prices table
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
 * @param recordsAmount - Number - How many ingredient_prices will be registered
 * @returns string
 */
const createIngredientPriceSql = (recordsAmount: number): string => {
  const sqlScript = `
    INSERT INTO ${DbTablesNames.ingredientPrices} (
      id,
      creation_date,
      ingredient_id,
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

export interface CreateIngredientPrice extends Omit<ingredient_prices, 'id'> {

}

export default createIngredientPriceSql
