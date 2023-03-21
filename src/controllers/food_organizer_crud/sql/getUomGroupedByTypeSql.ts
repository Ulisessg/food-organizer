import { type GetUOM } from '../unitsOfMeasureCRUD'
import prisma from 'lib/prisma'

export const getUomGroupedByTypeSql = async (): Promise<GetUOM['unitsOfMeasureGroupedByType']> => {
  const unitsOfMeasureGroupedByType =
  await prisma.$queryRaw<GetUOM['unitsOfMeasureGroupedByType']>`SELECT
    units_of_measure_types.id AS uomt_id,units_of_measure_types.name AS uomt_name,
    JSON_ARRAYAGG(units_of_measure.id) AS uomIds,
    JSON_ARRAYAGG(JSON_OBJECT(
    'abbreviation', units_of_measure.abbreviation,
    'name', units_of_measure.name,
    'id', units_of_measure.id
    )) AS uom
    FROM units_of_measure_types
    INNER JOIN units_of_measure ON units_of_measure_types.id = units_of_measure.uomt_id
    GROUP BY uomt_name
`
  return unitsOfMeasureGroupedByType
}
