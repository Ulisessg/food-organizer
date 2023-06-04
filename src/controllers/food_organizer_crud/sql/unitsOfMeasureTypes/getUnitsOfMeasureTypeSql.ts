const getUnitsOfMeasureTypeSql = `SELECT 
units_of_measure_types.id,
units_of_measure_types.name

FROM units_of_measure_types
`

export default getUnitsOfMeasureTypeSql

export type TGetUnitsOfMeasureType = Array<{
  id: number
  name: string
}>
