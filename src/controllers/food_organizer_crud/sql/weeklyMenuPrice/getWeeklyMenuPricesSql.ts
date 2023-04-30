import prisma from 'lib/prisma'
import { type weekly_menu_prices } from '@prisma/client'

const getWeeklyMenuPricesSql = async (): Promise<weekly_menu_prices[]> => {
  const result = await prisma.$queryRaw<weekly_menu_prices[]>`SELECT
  weekly_menu_prices.id, weekly_menu_prices.weekly_menu_id,
  weekly_menu_prices.price_date AS price_date,
  weekly_menu_prices.value
  FROM weekly_menu_prices
  ORDER BY price_date DESC
  `

  return result
}

export default getWeeklyMenuPricesSql
