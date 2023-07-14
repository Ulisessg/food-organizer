/**
 * Args order
 * - name
 * - abbreviation
 * - uomt_id
 * - id
 */
const updateUnitsOfMeasureSql = `UPDATE units_of_measure SET
name = ?,
abbreviation = ?,
uomt_id = ?

WHERE units_of_measure.id = ?
`

module.exports = updateUnitsOfMeasureSql
