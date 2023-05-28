import prisma from 'lib/prisma'

const getUnitsOfMeasureTypeSql = async (): Promise<TGetUnitsOfMeasureType> => {
  const unitsOfMeasureType = await prisma.$queryRaw<TGetUnitsOfMeasureType>`SELECT 
  units_of_measure_types.id,
  units_of_measure_types.name
  FROM units_of_measure_types
  `
  return unitsOfMeasureType
}

export default getUnitsOfMeasureTypeSql

export type TGetUnitsOfMeasureType = Array<{
  id: number
  name: string
}>
