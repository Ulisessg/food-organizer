const getParametrizedValuesSqlSentence =
  require('../../../../utils/getParametrizedValuesSqlSentence')

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
 *
 *
 * @param {Number} recordsAmount - How many food_ingredients will be registered
 * @returns {string}
 */
const createFoodSql = (recordsAmount) => `INSERT INTO foods (
    id,
    name,
    preparation_time,
    food_type_id,
    image
  )
  ${getParametrizedValuesSqlSentence(
  5,
  recordsAmount
)}
  `
module.exports = createFoodSql
