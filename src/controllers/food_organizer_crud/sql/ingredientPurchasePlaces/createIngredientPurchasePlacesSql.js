const getParametrizedValuesSqlSentence =
  require('../../../../utils/getParametrizedValuesSqlSentence')

/**
 *  Create a register in ingredient_purchase_places table
 *
 *  Order and types of params
 *
 *  + id - null
 *  + ingredient_id - number
 *  + purchase_place_id - number
 *
 *
 * @param {Number} recordsAmount
 * @returns {string}
 */
const
  createIngredientPurchasesPlaceSql = (recordsAmount) => `INSERT INTO ingredient_purchase_places (
    id,
    ingredient_id,
    purchase_place_id
  )
  ${getParametrizedValuesSqlSentence(
    3,
    recordsAmount
  )}
  `

module.exports = createIngredientPurchasesPlaceSql
