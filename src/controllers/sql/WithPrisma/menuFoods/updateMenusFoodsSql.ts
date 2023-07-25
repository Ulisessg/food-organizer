/* eslint-disable @typescript-eslint/naming-convention */
import { type menu_foods } from '@prisma/client'
import prisma from 'lib/prisma'
import { validations } from 'models/menuFoodsValidations'

const updateMenuFoodsSql = async (menuFoods: menu_foods): Promise<menu_foods> => {
  const { menu_id, food_id, id } = menuFoods
  validations.menu_id(menu_id)
  validations.food_id(food_id)
  const menuFoodUpdated = await prisma.menu_foods.update({
    data: {
      food_id,
      menu_id
    },
    where: {
      id
    }
  })
  return menuFoodUpdated
}

export default updateMenuFoodsSql
