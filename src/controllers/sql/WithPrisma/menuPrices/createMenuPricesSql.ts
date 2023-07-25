/* eslint-disable @typescript-eslint/naming-convention */
import { type menu_prices } from '@prisma/client'
import priceValidations from 'models/priceValidations'
import prisma from 'lib/prisma'

const createMenuPriceSql = async (menuPrice: CreateMenuPrice): Promise<menu_prices> => {
  const { creation_date, menu_id, price_date, value } = menuPrice
  priceValidations({
    creationDate: creation_date as unknown as string,
    id: menu_id,
    idName: 'menuPrice',
    priceDate: price_date as unknown as string,
    value: value as unknown as number
  })
  const menuPriceCreationResult = await prisma.menu_prices.create({
    data: {
      creation_date,
      menu_id,
      price_date,
      value
    }
  })
  return menuPriceCreationResult
}

export default createMenuPriceSql

export interface CreateMenuPrice extends Omit<menu_prices, 'id'> {}
