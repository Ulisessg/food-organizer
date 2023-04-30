/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createMenuPriceSql, { type CreateMenuPrice } from '../sql/menuPrice/createMenuPriceSql'
import getMenuPriceSql from '../sql/menuPrice/getMenuPriceSql'
import type { menu_prices } from '@prisma/client'
import { type response } from 'controllers/response'
import updateMenuPriceSql from '../sql/menuPrice/updateMenuPriceSql'

export const createMenuPrice = async (
  req: CreateMenuPriceRequest,
  res: NextApiResponse<response<menu_prices | string>>
): Promise<void> => {
  try {
    const menuPriceCreated = await createMenuPriceSql(req.body)
    res.status(201).send({
      data: menuPriceCreated,
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

export const getMenuPrice = async (
  req: NextApiRequest,
  res: NextApiResponse< response<menu_prices[] | string>>
): Promise<void> => {
  try {
    const result = await getMenuPriceSql()
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
export const updateMenuPrice = async (
  req: UpdateMenuPriceRequest,
  res: NextApiResponse< response<menu_prices | string>>
): Promise<void> => {
  try {
    const menuPriceUpdated = await updateMenuPriceSql(req.body)
    res.status(200).send({
      data: menuPriceUpdated,
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

interface CreateMenuPriceRequest extends NextApiRequest {
  body: CreateMenuPrice
}

interface UpdateMenuPriceRequest extends NextApiRequest {
  body: menu_prices
}
