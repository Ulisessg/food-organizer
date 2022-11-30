/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import priceValidations, { validations } from 'models/priceValidations'
import type { menu_prices } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createDailyMenuPrice = async (
  req: CreateDailyMenuPrice,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { creation_date, menu_id, price_date, value } = req.body
    priceValidations({
      creationDate: creation_date as unknown as string,
      id: menu_id,
      idName: 'menuPrice',
      priceDate: price_date as unknown as string,
      value: value as unknown as number
    })
    await prisma.menu_prices.create({
      data: { ...req.body }
    })
    res.status(201).send({
      data: 'daily menu price created',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating daily menu foods',
      error: true
    })
  }
}

export const getDailyMenuPrices = async (
  _req: CreateDailyMenuPrice,
  res: NextApiResponse< response<menu_prices[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.menu_prices.findMany()
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error getting daily menu foods',
      error: true
    })
  }
}
export const updateDailyMenuPrice = async (
  req: CreateDailyMenuPrice,
  res: NextApiResponse< response<menu_prices[] | string>>
): Promise<void> => {
  try {
    const { id, menu_id, price_date, value } = req.body
    validations.id(
      menu_id,
      'menuPrice'
    )
    validations.price(value as unknown as number)
    validations.priceDate(price_date as unknown as string)
    await prisma.menu_prices.update({
      data: {
        menu_id,
        price_date,
        value
      },
      where: {
        id
      }
    })
    res.status(200).send({
      data: 'daily menu price updated',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating daily menu foods',
      error: true
    })
  }
}

interface CreateDailyMenuPrice extends NextApiRequest {
  body: menu_prices
}
