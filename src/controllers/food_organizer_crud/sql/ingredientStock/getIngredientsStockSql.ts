import { DbTablesNames } from 'utils/constants'

const getIngredientsStockSql = `SELECT 
${DbTablesNames.ingredientsStock}.id AS ingredient_stock_id,
  ${DbTablesNames.ingredientsStock}.ingredient_id AS ingredient_id,
  ${DbTablesNames.ingredientsStock}.comment,
  ${DbTablesNames.ingredientsStock}.ingredient_qty,
  ingredients.name AS ingredient,
  ingredients.image,
  units_of_measure.name AS uom

FROM ${DbTablesNames.ingredientsStock}

INNER JOIN ingredients ON ingredients.id = ${DbTablesNames.ingredientsStock}.ingredient_id
INNER JOIN units_of_measure ON units_of_measure.id = ingredients.uom_id
ORDER BY ingredient;
`

export type GetIngredientStock = Array<{
  ingredient_stock_id: number
  ingredient_id: number
  comment: string | null
  ingredient_qty: number
  ingredient: string
  image: string | null
  uom: string
}>

export default getIngredientsStockSql
