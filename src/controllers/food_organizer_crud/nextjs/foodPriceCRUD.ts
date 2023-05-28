/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createFoodPriceSql from '../sql/WithPrisma/foodPrices/createFoodPricesSql'
import type { food_prices } from '@prisma/client'
import getFoodPricesSql from '../sql/WithPrisma/foodPrices/getFoodPricesSql'
import { type response } from 'controllers/response'
import updateFoodPriceSql from '../sql/WithPrisma/foodPrices/updateFoodPricesSql'

export const createFoodPrice = async (
  req: CreateFoodPrice,
  res: NextApiResponse<response<food_prices | string>>
): Promise<void> => {
  try {
    const foodPriceCreated = await createFoodPriceSql(req.body)
    res.status(201).send({
      data: foodPriceCreated,
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
    const foodPrices = await getFoodPricesSql()
    res.status(200).send({
      data: foodPrices,
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
    const updateFoodPriceRowsAffected = await updateFoodPriceSql(req.body)
    if (updateFoodPriceRowsAffected === 0) {
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
