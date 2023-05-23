/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createIngredientPriceSql,
{ type CreateIngredientPrice } from '../sql/ingredientPrices/createIngredientPricesSql'
import getIngredientPricesSql from '../sql/ingredientPrices/getIngredientPricesSql'
import type { ingredient_prices } from '@prisma/client'
import { type response } from 'controllers/response'
import updateIngredientPriceSql from '../sql/ingredientPrices/updateIngredientPricesSql'

export const createIngredientPrice = async (
  req: CreateIngredientPriceRequest,
  res: NextApiResponse<response<ingredient_prices | string>>
): Promise<void> => {
  try {
    const ingredientPriceCreated = await createIngredientPriceSql(req.body)

    res.status(201).send({
      data: ingredientPriceCreated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating ingredient price',
      error: true
    })
  }
}

export const getIngredientPrices = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<ingredient_prices[] | string>>
): Promise<void> => {
  try {
    const ingredientPrices = await getIngredientPricesSql()
    res.status(200).send({
      data: ingredientPrices,
      error: false
    })
  } catch (error) {
    res.status(400).send({
      data: 'error getting ingredient price',
      error: true
    })
  }
}

export const updateIngredientPrice = async (
  req: UpdateIngredientPriceRequest,
  res: NextApiResponse<response<ingredient_prices | string>>
): Promise<void> => {
  try {
    const ingredientPriceUpdated = await updateIngredientPriceSql(req.body)
    res.status(200).send({
      data: ingredientPriceUpdated,
      error: false
    })
  } catch (error) {
    res.status(400).send({
      data: 'error updating ingredient price',
      error: true
    })
  }
}

interface CreateIngredientPriceRequest extends NextApiRequest {
  body: CreateIngredientPrice
}

interface UpdateIngredientPriceRequest extends NextApiRequest {
  body: ingredient_prices
}
