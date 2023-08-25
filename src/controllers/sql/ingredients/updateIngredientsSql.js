const updateIngredientSql = `UPDATE ingredients SET
name = ?,
uom_id = ?,
image = ?,
comment = ?

WHERE ingredients.id = ?
`
module.exports = updateIngredientSql
