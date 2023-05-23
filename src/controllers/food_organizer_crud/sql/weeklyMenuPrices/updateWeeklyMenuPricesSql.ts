/* eslint-disable @typescript-eslint/naming-convention */
import prisma from 'lib/prisma'
import { validations } from 'models/priceValidations'
import { type weekly_menu_prices } from '@prisma/client'

const updateWeeklyMenuPriceSql = async (weeklyMenuPrice:
weekly_menu_prices): Promise<weekly_menu_prices> => {
  const { id, weekly_menu_id, price_date, value } = weeklyMenuPrice
  validations.id(
    weekly_menu_id,
    'weeklyMenuPrice'
  )
  validations.price(value as unknown as number)
  validations.priceDate(price_date as unknown as string)
  const weeklyMenuPriceUpdated = await prisma.weekly_menu_prices.update({
    data: {
      price_date,
      value,
      weekly_menu_id
    },
    where: { id }
  })
  return weeklyMenuPriceUpdated
}

export default updateWeeklyMenuPriceSql
