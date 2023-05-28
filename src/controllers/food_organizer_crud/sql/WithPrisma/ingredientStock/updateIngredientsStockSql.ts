/* eslint-disable @typescript-eslint/naming-convention */
import { type ingredient_stock } from '@prisma/client'
import prisma from 'lib/prisma'
import { validations } from 'models/ingredientStockValidations'

const updateIngredientStockSql = async (ingredientStock: ingredient_stock):
Promise<ingredient_stock> => {
  const { comment, ingredient_id, ingredient_qty, id } = ingredientStock

  validations.comment(comment)
  validations.ingredientId(ingredient_id)

  const ingredientStockUpdated = await prisma.ingredient_stock.update({
    data: {
      comment,
      ingredient_id,
      ingredient_qty
    },
    where: {
      id
    }
  })
  return ingredientStockUpdated
}

export default updateIngredientStockSql
