import { type menu_prices } from '@prisma/client'
import prisma from 'lib/prisma'

const getMenuPriceSql = async (): Promise<menu_prices[]> => {
  const result = await prisma.menu_prices.findMany()
  return result
}
export default getMenuPriceSql
