/**
 * @param {string} filter
 * @returns {string}
 */
const getUomGroupedByTypeSql = (filter) => `SELECT
units_of_measure_types.id AS uomt_id,units_of_measure_types.name AS uomt_name,

json_group_array(units_of_measure.name) AS uomNames,

json_group_array(units_of_measure.abbreviation) AS uomAbbreviations,

json_group_array(JSON_OBJECT(
'abbreviation', units_of_measure.abbreviation,
'name', units_of_measure.name,
'id', units_of_measure.id
)) AS uom

FROM units_of_measure_types
INNER JOIN units_of_measure ON units_of_measure_types.id = units_of_measure.uomt_id
${filter || ''}
GROUP BY uomt_name
ORDER BY units_of_measure_types.id ASC
`
module.exports = getUomGroupedByTypeSql
