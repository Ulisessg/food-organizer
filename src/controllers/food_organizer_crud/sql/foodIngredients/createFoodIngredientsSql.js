const getParametrizedValuesSqlSentence =
  require('../../../../utils/getParametrizedValuesSqlSentence')

/**
 *  Create a register in food_ingredients table
 *
 *  Order and types of params
 *
 *  + id - null
 *  + food_id - number
 *  + ingredient_id - number
 *  + ingredient_qty -number
 *
 *
 * @param {Number} recordsAmount  - How many food_ingredients will be registered
 * @returns string
 */
const createFoodIngredientsSql = (recordsAmount) => {
  const sqlScript = `
    INSERT INTO food_ingredients (
      id,
      food_id,
      ingredient_id, 
      ingredient_qty
    )
    ${
    // @ts-ignore
    getParametrizedValuesSqlSentence(
      4,
      recordsAmount
    )}
  `

  return sqlScript
}

module.exports = createFoodIngredientsSql
