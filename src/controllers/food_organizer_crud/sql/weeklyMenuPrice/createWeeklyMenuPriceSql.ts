/* eslint-disable @typescript-eslint/naming-convention */
import priceValidations from 'models/priceValidations'
import prisma from 'lib/prisma'
import { type weekly_menu_prices } from '@prisma/client'

const createWeeklyMenuPriceSql = async (weeklyMenuPrice:
CreateWeeklyMenuPrice): Promise<weekly_menu_prices> => {
  const { creation_date, weekly_menu_id, price_date, value } = weeklyMenuPrice
  priceValidations({
    creationDate: creation_date as unknown as string,
    id: weekly_menu_id,
    idName: 'weeklyMenuPrice',
    priceDate: price_date as unknown as string,
    value: value as unknown as number
  })
  const wmPrice = await prisma.weekly_menu_prices.create({
    data: { creation_date, price_date, value, weekly_menu_id }
  })
  return wmPrice
}

export default createWeeklyMenuPriceSql

export interface CreateWeeklyMenuPrice extends Omit<weekly_menu_prices, 'id'> {

}
