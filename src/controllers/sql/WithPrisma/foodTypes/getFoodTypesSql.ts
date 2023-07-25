import prisma from 'lib/prisma'

const getFoodTypesSql = async (): Promise<GetFoodTypes> => {
  const foodTypes = await prisma.$queryRaw<GetFoodTypes>`SELECT
  food_types.id, food_types.name
  FROM food_types
  ORDER BY food_types.name ASC
  `
  return foodTypes
}

export type GetFoodTypes = Array<{
  id: number
  name: string
}>

export default getFoodTypesSql
