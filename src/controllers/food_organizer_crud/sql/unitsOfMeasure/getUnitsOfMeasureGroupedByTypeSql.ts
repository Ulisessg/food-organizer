export const getUomGroupedByTypeSql = `SELECT
units_of_measure_types.id AS uomt_id,units_of_measure_types.name AS uomt_name,

JSON_ARRAY(units_of_measure.name) AS uomNames,

JSON_ARRAY(units_of_measure.abbreviation) AS uomAbbreviations,

JSON_ARRAY(JSON_OBJECT(
'abbreviation', units_of_measure.abbreviation,
'name', units_of_measure.name,
'id', units_of_measure.id
)) AS uom

FROM units_of_measure_types
INNER JOIN units_of_measure ON units_of_measure_types.id = units_of_measure.uomt_id
GROUP BY uomt_name
`

export type TGetUnitsOfMeasureGroupedByType = Array<{
  uomt_id: number
  uomt_name: string
  uomNames: string[]
  uomAbbreviations: string[]
  uom: Array<{
    id: number
    name: string
    abbreviation: string
  }>
}>
