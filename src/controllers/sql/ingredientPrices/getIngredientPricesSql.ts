import { DbTablesNames } from 'utils/constants'

const getIngredientPricesSql = `SELECT
ingredient_prices.id, 
ingredient_prices.ingredient_id, 
ingredient_prices.price_date AS price_date,
ingredient_prices.value

FROM ${DbTablesNames.ingredientPrices}
ORDER BY price_date DESC
`

export default getIngredientPricesSql
