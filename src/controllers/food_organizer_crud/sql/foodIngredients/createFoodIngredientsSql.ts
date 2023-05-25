import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 *  Create a register in food_ingredients table
 *
 *  Order and types of params
 *
 *  + id - null
 *  + creation_date - string
 *  + food_id - number
 *  + ingredient_id - number
 *  + ingredient_qty -number
 *
 *
 * @param recordsAmount - Number - How many food_ingredients will be registered
 * @returns string
 */
const createFoodIngredientsSql = (recordsAmount: number): string => {
  const sqlScript = `
    INSERT INTO ${DbTablesNames.foodIngredients} (
      id,
      creation_date,
      food_id,
      ingredient_id, 
      ingredient_qty
    )
    ${getParametrizedValuesSqlSentence(
5,
recordsAmount
)}
  `

  return sqlScript
}

export default createFoodIngredientsSql

export type CreateFoodIngredients = Array<{
  creation_date: string
  food_id: number
  ingredient_id: number
  ingredient_qty: number
}>
