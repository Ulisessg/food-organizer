/**
 * Params order:
 * - name
 * - id
 */
const updateFoodTypesSql = `UPDATE food_types SET
name = ?
WHERE food_types.id = ?
`

module.exports = updateFoodTypesSql
