/* eslint-disable @typescript-eslint/naming-convention */
import { type food_ingredients } from '@prisma/client'
import prisma from 'lib/prisma'
import { validations } from 'models/foodIngredientValidations'

const updateFoodIngredientSql = async (foodIngredient: food_ingredients): Promise<number> => {
  const { id, food_id, ingredient_id, ingredient_qty } = foodIngredient
  validations.foodId(food_id)
  validations.ingredientId(ingredient_id)
  const rowsAffected: number = await prisma.$executeRaw`UPDATE IGNORE food_ingredients SET
food_id = ${food_id},
ingredient_id = ${ingredient_id},
ingredient_qty = ${ingredient_qty}
WHERE food_ingredients.id = ${id}
`
  return rowsAffected
}

export default updateFoodIngredientSql
