/**
 * @param {string} filter
 * @returns {string}
 */
const getUnitsOfMeasureTypeSql = (filter) => `SELECT 
units_of_measure_types.id,
units_of_measure_types.name

FROM units_of_measure_types
${filter || ''}
ORDER BY units_of_measure_types.id ASC
`

module.exports = getUnitsOfMeasureTypeSql
