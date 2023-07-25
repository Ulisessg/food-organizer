import { type ingredient_prices } from '@prisma/client'
import prisma from 'lib/prisma'

const getIngredientPricesSql = async (): Promise<ingredient_prices[]> => {
  const ingredientPrices = await prisma.$queryRaw<ingredient_prices[]>`SELECT
  ingredient_prices.id, ingredient_prices.ingredient_id, ingredient_prices.price_date AS price_date,
  ingredient_prices.value
  FROM ingredient_prices
  ORDER BY price_date DESC
  `
  return ingredientPrices
}

export default getIngredientPricesSql
