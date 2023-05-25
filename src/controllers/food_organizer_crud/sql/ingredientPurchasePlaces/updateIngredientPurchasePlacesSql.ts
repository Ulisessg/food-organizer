import { DbTablesNames } from 'utils/constants'

/**
 * Params order and types
 *
 * + ingredient_id - number
 * + purchase_place_id - number
 * + ingredient_purchase_places.id - number
 */
const updateIngredientPurchasePlaceSql = `UPDATE ${DbTablesNames.ingredientPurchasePlaces} SET
ingredient_id = ?,
purchase_place_id = ?

WHERE ${DbTablesNames.ingredientPurchasePlaces}.id = ?
`
export default updateIngredientPurchasePlaceSql
