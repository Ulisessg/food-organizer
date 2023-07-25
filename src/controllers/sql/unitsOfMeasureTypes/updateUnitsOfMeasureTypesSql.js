/**
 * Args order:
 * - name
 * - id
 */
const updateUnitsOfMeasureTypesSql = `UPDATE units_of_measure_types
SET name = ?
where units_of_measure_types.id = ?
`

module.exports = updateUnitsOfMeasureTypesSql
