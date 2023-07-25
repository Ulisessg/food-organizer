import { type menu_foods } from '@prisma/client'
import prisma from 'lib/prisma'

const getMenuFoodsSql = async (): Promise<menu_foods[]> => {
  const menuFoods = await prisma.menu_foods.findMany()

  return menuFoods
}

export default getMenuFoodsSql
