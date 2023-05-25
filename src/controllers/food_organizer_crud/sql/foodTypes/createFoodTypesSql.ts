import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 *  Create a register in food_types table
 *
 *  Order and types of params
 *
 *  + id - null
 *  + name - string
 *  + creation_date - string
 *
 *
 * @param recordsAmount - Number - How many food_types will be registered
 * @returns string
 */
const createFoodTypeSql = (recordsAmount: number):
string => `INSERT INTO ${DbTablesNames.foodTypes} (
    id,
    name,
    creation_date
  )
  ${getParametrizedValuesSqlSentence(
3,
recordsAmount
)}
  `

export interface CreateFoodType {
  name: string
  creation_date: string
}

export default createFoodTypeSql
