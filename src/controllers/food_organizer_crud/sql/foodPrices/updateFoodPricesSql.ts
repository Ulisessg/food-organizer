/* eslint-disable @typescript-eslint/naming-convention */
import { type food_prices } from '@prisma/client'
import prisma from 'lib/prisma'
import { validations } from 'models/priceValidations'

const updateFoodPriceSql = async (foodPrice: food_prices): Promise<number> => {
  const { id, food_id, price_date, value } = foodPrice

  validations.id(
    food_id,
    'ingredientPrice'
  )
  validations.price(value as unknown as number)
  validations.priceDate(price_date as unknown as string)

  const rowsAffected = await prisma.$executeRaw`UPDATE IGNORE food_prices SET
food_id = ${food_id},
price_date = ${price_date},
value = ${value}
WHERE food_prices.id = ${id}
`
  return rowsAffected
}

export default updateFoodPriceSql
