/* eslint-disable @typescript-eslint/naming-convention */
import { type Prisma, type menu_foods } from '@prisma/client'
import menuFoodsValidations from 'models/menuFoodsValidations'
import prisma from 'lib/prisma'

export const createMenuFoodsSql = async (data: CreateMenuFoods): Promise<Prisma.BatchPayload> => {
  if (!Array.isArray(data)) throw new Error('Invalid body: not array')
  for (const { creation_date, menu_id, food_id } of data) {
    menuFoodsValidations({
      creationDate: creation_date as unknown as string,
      food_id,
      menu_id
    })
  }
  const createMenuFoodsResult = await prisma.menu_foods.createMany({
    data: [...data]
  })
  return createMenuFoodsResult
}

export type CreateMenuFoods = Array<Omit<menu_foods, 'id'>>

export default createMenuFoodsSql
