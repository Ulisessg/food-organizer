/* eslint-disable @typescript-eslint/naming-convention */
import { type ingredient_prices } from '@prisma/client'
import prisma from 'lib/prisma'
import { validations } from 'models/priceValidations'

const updateIngredientPriceSql = async (ingredientPrice:
ingredient_prices): Promise<ingredient_prices> => {
  const { id, ingredient_id, price_date, value } = ingredientPrice
  validations.id(
    ingredient_id,
    'ingredientPrice'
  )
  validations.price(value as unknown as number)
  validations.priceDate(price_date as unknown as string)
  const ingredientPriceUpdated = await prisma.ingredient_prices.update({
    data: {
      ingredient_id,
      price_date,
      value
    },
    where: {
      id
    }
  })
  return ingredientPriceUpdated
}

export default updateIngredientPriceSql
