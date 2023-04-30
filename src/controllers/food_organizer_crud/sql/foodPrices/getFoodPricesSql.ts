import { type food_prices } from '@prisma/client'
import prisma from 'lib/prisma'
const getFoodPricesSql = async (): Promise<food_prices[]> => {
  const foodPrices = await prisma.$queryRaw<food_prices[]>`SELECT
  food_prices.id, food_prices.food_id, food_prices.price_date AS price_date,
  food_prices.value
  FROM food_prices
  ORDER BY price_date DESC
  `
  return foodPrices
}

export default getFoodPricesSql
