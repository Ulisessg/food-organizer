const getUnitsOfMeasureSql = (filter = '') => `SELECT *
 FROM units_of_measure
 ${filter}
`

module.exports = getUnitsOfMeasureSql
