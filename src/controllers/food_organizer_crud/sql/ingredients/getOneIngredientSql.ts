import getIngredientsSql from './getIngredientsSql'

/**
 * Params and order
 *
 * + ingredients.id - number
 */
const getOneIngredientSql = `
${getIngredientsSql}

  WHERE ingredients.id = ?
`
export default getOneIngredientSql
