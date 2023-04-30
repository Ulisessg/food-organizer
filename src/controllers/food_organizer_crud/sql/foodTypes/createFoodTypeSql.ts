/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import capitalize from 'utils/capitalize'
import foodTypeValidations from 'models/foodTypeValidations'
import { type food_types } from '@prisma/client'
import prisma from 'lib/prisma'

const createFoodTypeSql = async (foodType: CreateFoodType): Promise<food_types> => {
  const { creation_date, name } = foodType
  foodTypeValidations({
    creationDate: creation_date as unknown as string,
    name
  })
  const foodTypeCreated = await prisma.food_types.create({
    data: { creation_date, name: capitalize(name) }
  })
  return foodTypeCreated
}

export interface CreateFoodType {
  name: string
  creation_date: string
}

export default createFoodTypeSql
