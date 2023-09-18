/**
 * Params order:
 * - name
 * - preparation_time
 * - food_type_id
 * - image
 * - foods.id
 */
const updateFoodsSql = `UPDATE foods SET
name = ?,
preparation_time = ?,
food_type_id = ?,
image = ?

WHERE foods.id = ?
`

module.exports = updateFoodsSql
