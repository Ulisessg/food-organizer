/* eslint-disable @typescript-eslint/naming-convention */
import { type food_prices } from '@prisma/client'
import priceValidations from 'models/priceValidations'
import prisma from 'lib/prisma'

const createFoodPriceSql = async (foodPrice: food_prices): Promise<food_prices> => {
  const { creation_date, food_id, price_date, value } = foodPrice
  priceValidations({
    creationDate: creation_date as unknown as string,
    id: food_id,
    idName: 'foodPrice',
    priceDate: price_date as unknown as string,
    value: value as unknown as number
  })
  const foodPriceCreated = await prisma.food_prices.create({
    data: {
      creation_date, food_id, price_date, value
    }
  })
  return foodPriceCreated
}

export default createFoodPriceSql
