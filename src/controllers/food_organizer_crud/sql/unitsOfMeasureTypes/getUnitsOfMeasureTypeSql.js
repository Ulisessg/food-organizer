const getUnitsOfMeasureTypeSql = `SELECT 
units_of_measure_types.id,
units_of_measure_types.name

FROM units_of_measure_types
`

module.exports = getUnitsOfMeasureTypeSql
