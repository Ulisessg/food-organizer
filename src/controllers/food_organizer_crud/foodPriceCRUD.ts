/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import priceValidations, { validations } from 'models/priceValidations'
import type { food_prices } from '@prisma/client'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const createFoodPrice = async (
  req: CreateFoodPrice,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { creation_date, food_id, price_date, value } = req.body
    priceValidations({
      creationDate: creation_date as unknown as string,
      id: food_id,
      idName: 'foodPrice',
      priceDate: price_date as unknown as string,
      value: value as unknown as number
    })
    await prisma.food_prices.create({
      data: {
        creation_date, food_id, price_date, value
      }
    })
    res.status(201).send({
      data: 'food price created',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating food price',
      error: true
    })
  }
}

export const getFoodPrices = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<food_prices[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<food_prices[]>`SELECT
food_prices.id, food_prices.food_id, food_prices.price_date AS price_date,
food_prices.value
FROM food_prices
ORDER BY price_date DESC
`
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    res.status(400).send({
      data: 'error getting food price',
      error: true
    })
  }
}

export const updateFoodPrice = async (
  req: CreateFoodPrice,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { id, food_id, price_date, value } = req.body
    validations.id(
      food_id,
      'ingredientPrice'
    )
    validations.price(value as unknown as number)
    validations.priceDate(price_date as unknown as string)
    const rowsAffected = await prisma.$executeRaw`UPDATE IGNORE food_prices SET
food_id = ${food_id},
price_date = ${price_date},
value = ${value}
WHERE food_prices.id = ${id}
`
    if (rowsAffected === 0) {
      res.status(400).send({
        data: 'error updating food price',
        error: true
      })
    } else {
      res.status(200).send({
        data: 'food price updated',
        error: false
      })
    }
  } catch (error) {
    res.status(400).send({
      data: 'error updating food price',
      error: true
    })
  }
}

interface CreateFoodPrice extends NextApiRequest {
  body: food_prices
}
