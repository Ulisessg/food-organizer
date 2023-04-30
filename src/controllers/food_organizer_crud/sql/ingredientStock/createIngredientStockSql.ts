/* eslint-disable @typescript-eslint/naming-convention */

import ingredientStockValidations from 'models/ingredientStockValidations'
import { type ingredient_stock } from '@prisma/client'
import prisma from 'lib/prisma'

const createIngredientStockSql = async (ingredientStock: CreateIngredientStock):
Promise<ingredient_stock> => {
  const { comment, ingredient_id, ingredient_qty, creation_date } = ingredientStock

  ingredientStockValidations({
    comment,
    creationDate: creation_date as unknown as string,
    ingredientId: ingredient_id,
    ingredient_qty

  })
  const creationresult = await prisma.ingredient_stock.create({
    data: {
      comment,
      creation_date,
      ingredient_id,
      ingredient_qty
    }
  })
  return creationresult
}

export interface CreateIngredientStock extends Omit<ingredient_stock, 'id' | 'creation_date'> {
  creation_date: string
}

export default createIngredientStockSql
