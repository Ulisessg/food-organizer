/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import priceValidations, { validations } from 'models/priceValidations'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'
import type { weekly_menu_prices } from '@prisma/client'

export const createWeeklyMenuPrice = async (
  req: CreateWeeklyMenuPrice,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { creation_date, weekly_menu_id, price_date, value } = req.body
    priceValidations({
      creationDate: creation_date as unknown as string,
      id: weekly_menu_id,
      idName: 'weeklyMenuPrice',
      priceDate: price_date as unknown as string,
      value: value as unknown as number
    })
    await prisma.weekly_menu_prices.create({
      data: { creation_date, price_date, value, weekly_menu_id }
    })
    res.status(201).send({
      data: 'weekly menu price created',
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
    const result = await prisma.$queryRaw<weekly_menu_prices[]>`SELECT
weekly_menu_prices.id, weekly_menu_prices.weekly_menu_id,
weekly_menu_prices.price_date AS price_date,
weekly_menu_prices.value
FROM weekly_menu_prices
ORDER BY price_date DESC
`
    res.status(200).send({
      data: result,
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
  req: CreateWeeklyMenuPrice,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { id, weekly_menu_id, price_date, value } = req.body
    validations.id(
      weekly_menu_id,
      'weeklyMenuPrice'
    )
    validations.price(value as unknown as number)
    validations.priceDate(price_date as unknown as string)
    const affectedRows = await prisma.$executeRaw`UPDATE IGNORE weekly_menu_prices SET
weekly_menu_id = ${weekly_menu_id},
price_date = ${price_date},
value = ${value}
WHERE weekly_menu_prices.id = ${id}
`
    if (affectedRows === 0) {
      res.status(400).send({
        data: 'error updating weekly menu price',
        error: true
      })
    } else {
      res.status(200).send({
        data: 'weekly menu price updated',
        error: false
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: 'error updating weekly menu price',
      error: true
    })
  }
}

interface CreateWeeklyMenuPrice extends NextApiRequest {
  body: weekly_menu_prices
}
