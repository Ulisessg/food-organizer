const getParametrizedValuesSqlSentence =
  require('../../../../utils/getParametrizedValuesSqlSentence')

/**
 *  Create a register in food_types table
 *
 *  Order and types of params
 *
 *  + id - null
 *  + name - string
 *
 *
 * @param {Number} recordsAmount  - How many food_types will be registered
 * @returns {string}
 */
const createFoodTypeSql = (recordsAmount) => `INSERT INTO food_types (
    id,
    name
  )
  ${getParametrizedValuesSqlSentence(
  2,
  recordsAmount
)}
  `

module.exports = createFoodTypeSql
