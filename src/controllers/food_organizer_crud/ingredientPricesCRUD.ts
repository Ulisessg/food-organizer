/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import priceValidations, { validations } from 'models/priceValidations'
import type { ingredient_prices } from '@prisma/client'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const createIngredientPrice = async (
  req: CreateIngredientPrice,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { creation_date, ingredient_id, price_date, value, purchase_place_id } = req.body
    priceValidations({
      creationDate: creation_date as unknown as string,
      id: ingredient_id,
      idName: 'ingredientPrice',
      priceDate: price_date as unknown as string,
      value: value as unknown as number
    })
    await prisma.ingredient_prices.create({
      data: { creation_date, ingredient_id, price_date, purchase_place_id, value }
    })
    res.status(201).send({
      data: 'ingredient price created',
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
    const result = await prisma.$queryRaw<ingredient_prices[]>`SELECT
ingredient_prices.id, ingredient_prices.ingredient_id, ingredient_prices.price_date AS price_date,
ingredient_prices.value
FROM ingredient_prices
ORDER BY price_date DESC
`
    res.status(200).send({
      data: result,
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
  req: CreateIngredientPrice,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { id, ingredient_id, price_date, value } = req.body
    validations.id(
      ingredient_id,
      'ingredientPrice'
    )
    validations.price(value as unknown as number)
    validations.priceDate(price_date as unknown as string)
    await prisma.$executeRaw`UPDATE IGNORE ingredient_prices SET
ingredient_id = ${ingredient_id},
price_date = ${price_date},
value = ${value}
WHERE ingredient_prices.id = ${id}
`
    res.status(200).send({
      data: 'ingredient price updated',
      error: false
    })
  } catch (error) {
    res.status(400).send({
      data: 'error updating ingredient price',
      error: true
    })
  }
}

interface CreateIngredientPrice extends NextApiRequest {
  body: ingredient_prices
}
