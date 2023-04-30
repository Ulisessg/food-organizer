/* eslint-disable @typescript-eslint/naming-convention */
import { type ingredient_prices } from '@prisma/client'
import priceValidations from 'models/priceValidations'
import prisma from 'lib/prisma'

const createIngredientPriceSql =
 async (ingredientPrice: CreateIngredientPrice): Promise<ingredient_prices> => {
   const { creation_date, ingredient_id, price_date, value, purchase_place_id } = ingredientPrice
   priceValidations({
     creationDate: creation_date as unknown as string,
     id: ingredient_id,
     idName: 'ingredientPrice',
     priceDate: price_date as unknown as string,
     value: value as unknown as number
   })
   const ingredientPriceCreated = await prisma.ingredient_prices.create({
     data: { creation_date, ingredient_id, price_date, purchase_place_id, value }
   })
   return ingredientPriceCreated
 }

export interface CreateIngredientPrice extends Omit<ingredient_prices, 'id'> {

}

export default createIngredientPriceSql
