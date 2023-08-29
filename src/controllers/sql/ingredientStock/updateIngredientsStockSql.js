/**
 * Params order and types
 *
 * + ingredient_id - number
 * + ingredient_qty - number
 * + comment - string | null
 * + ingredient_stock.id - number
 */
const updateIngredientsStockSql = `UPDATE ingredient_stock SET
  ingredient_id = ?,
  ingredient_qty = ?,
  comment = ?

  WHERE ingredient_stock.id = ?
`

module.exports = updateIngredientsStockSql
