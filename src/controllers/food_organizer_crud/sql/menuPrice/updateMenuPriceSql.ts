/* eslint-disable @typescript-eslint/naming-convention */
import { type menu_prices } from '@prisma/client'
import prisma from 'lib/prisma'

import { validations } from 'models/priceValidations'

const updateMenuPriceSql = async (menuPrice: menu_prices): Promise<menu_prices> => {
  const { id, menu_id, price_date, value } = menuPrice
  validations.id(
    menu_id,
    'menuPrice'
  )
  validations.price(value as unknown as number)
  validations.priceDate(price_date as unknown as string)
  const updateMenuPriceResult = await prisma.menu_prices.update({
    data: {
      menu_id,
      price_date,
      value
    },
    where: {
      id
    }
  })
  return updateMenuPriceResult
}

export default updateMenuPriceSql
