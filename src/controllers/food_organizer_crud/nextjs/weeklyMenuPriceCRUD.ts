/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createWeeklyMenuPriceSql,
{ type CreateWeeklyMenuPrice } from '../sql/WithPrisma/weeklyMenuPrices/createWeeklyMenuPricesSql'
import getWeeklyMenuPricesSql from '../sql/WithPrisma/weeklyMenuPrices/getWeeklyMenuPricesSql'
import { type response } from 'controllers/response'
import updateWeeklyMenuPriceSql from '../sql/WithPrisma/weeklyMenuPrices/updateWeeklyMenuPricesSql'
import type { weekly_menu_prices } from '@prisma/client'

export const createWeeklyMenuPrice = async (
  req: CreateWeeklyMenuPriceRequest,
  res: NextApiResponse<response< weekly_menu_prices | string>>
): Promise<void> => {
  try {
    const weeklyMenuPriceCreated = await createWeeklyMenuPriceSql(req.body)

    res.status(201).send({
      data: weeklyMenuPriceCreated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating weekly menu price',
      error: true
    })
  }
}

export const getWeeklyMenuPrices = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<weekly_menu_prices[] | string>>
): Promise<void> => {
  try {
    const weeklyMenuPrices = await getWeeklyMenuPricesSql()
    res.status(200).send({
      data: weeklyMenuPrices,
      error: false
    })
  } catch (error) {
    res.status(400).send({
      data: 'error getting weekly menu price',
      error: true
    })
  }
}

// eslint-disable-next-line max-statements
export const updateWeeklyMenuPrice = async (
  req: UpdateWeeklyMenuPriceReques,
  res: NextApiResponse<response<weekly_menu_prices | string>>
): Promise<void> => {
  try {
    const weeklyMenuPriceUpdated = await updateWeeklyMenuPriceSql(req.body)
    res.status(200).send({
      data: weeklyMenuPriceUpdated,
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: 'error updating weekly menu price',
      error: true
    })
  }
}

interface CreateWeeklyMenuPriceRequest extends NextApiRequest {
  body: CreateWeeklyMenuPrice
}

interface UpdateWeeklyMenuPriceReques extends NextApiRequest {
  body: weekly_menu_prices
}
