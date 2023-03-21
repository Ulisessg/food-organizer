import { type GetUOM } from '../unitsOfMeasureCRUD'
import prisma from 'lib/prisma'

export const getUomSql = async (): Promise<GetUOM['unitsOfMeasureType']> => {
  const unitsOfMeasureType = await prisma.$queryRaw<GetUOM['unitsOfMeasureType']>`SELECT 
  units_of_measure_types.id,
  units_of_measure_types.name
  FROM units_of_measure_types
  `
  return unitsOfMeasureType
}
