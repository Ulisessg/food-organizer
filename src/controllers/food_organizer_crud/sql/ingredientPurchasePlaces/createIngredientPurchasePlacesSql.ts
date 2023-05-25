import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 *  Create a register in ingredient_purchase_places table
 *
 *  Order and types of params
 *
 *  + id - null
 *  + ingredient_id - number
 *  + purchase_place_id - number
 *  + creation_date - string
 *
 *
 * @param recordsAmount - Number
 * @returns string
 */
const
  createIngredientPurchasesPlaceSql =
   (recordsAmount: number): string => `INSERT INTO ${DbTablesNames.ingredientPurchasePlaces} (
    id,
    ingredient_id,
    purchase_place_id,
    creation_date
  )
  ${getParametrizedValuesSqlSentence(
4,
recordsAmount
)}
  `
export type CreateIngredientPurchasePlace = Array<{
  ingredient_id: number
  purchase_place_id: number
  creation_date: string
}>

export default createIngredientPurchasesPlaceSql
