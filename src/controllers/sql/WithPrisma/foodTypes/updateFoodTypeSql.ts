/* eslint-disable @typescript-eslint/naming-convention */
import capitalize from 'utils/capitalize'
import foodTypeValidations from 'models/foodTypeValidations'
import { type food_types } from '@prisma/client'
import prisma from 'lib/prisma'

const updateFoodTypeSql = async (foodType: food_types): Promise<food_types> => {
  const { creation_date, name, id } = foodType
  foodTypeValidations({
    creationDate: creation_date as unknown as string,
    name
  })
  const foodTypeUpdated = await prisma.food_types.update({
    data: {
      name: capitalize(name)
    },
    where: {
      id
    }
  })
  return foodTypeUpdated
}

export default updateFoodTypeSql
