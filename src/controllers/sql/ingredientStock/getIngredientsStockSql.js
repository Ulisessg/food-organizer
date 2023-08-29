/**
 * @param {string} filter
 * @returns
 */
const getIngredientsStockSql = (filter = '') => `SELECT 
ingredient_stock.id AS ingredient_stock_id,
  ingredient_stock.ingredient_id AS ingredient_id,
  ingredient_stock.comment,
  ingredient_stock.ingredient_qty,
  ingredients.name AS ingredient,
  ingredients.image,
  units_of_measure.name AS uom

FROM ingredient_stock

INNER JOIN ingredients ON ingredients.id = ingredient_stock.ingredient_id
INNER JOIN units_of_measure ON units_of_measure.id = ingredients.uom_id
${filter}
ORDER BY ingredient;
`

module.exports = getIngredientsStockSql
