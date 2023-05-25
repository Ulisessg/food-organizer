import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 *  Create a register in foods table
 *
 *  Order and types of params
 *
 *  + id - null
 *  + name - string
 *  + preparation_time - number
 *  + food_type_id - number
 *  + image - string
 *  + creation_date - string
 *
 *
 * @param recordsAmount - Number - How many food_ingredients will be registered
 * @returns string
 */
const createFoodSql = (recordsAmount: number): string => `INSERT INTO ${DbTablesNames.foods} (
    id,
    name,
    preparation_time,
    food_type_id,
    image,
    creation_date
  )
  ${getParametrizedValuesSqlSentence(
6,
recordsAmount
)}
  `
export default createFoodSql
