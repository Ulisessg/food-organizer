/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import getMenuFoodsSql from '../sql/menuFoods/getMenuFoodsSql'
import type { menu_foods } from '@prisma/client'
import { type response } from 'controllers/response'
import updateMenuFoodsSql from '../sql/menuFoods/updateMenusFoodsSql'

export const getMenuFoods = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<menu_foods[] | string>>
): Promise<void> => {
  try {
    const menuFoods = await getMenuFoodsSql()

    res.status(200).send({
      data: menuFoods,
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

export const updateMenuFoods = async (
  req: UpdateMenuFoodsRequest,
  res: NextApiResponse<response<menu_foods | string>>
): Promise<void> => {
  try {
    const updateMenuFoodsresult = await updateMenuFoodsSql(req.body)
    res.status(200).send({
      data: updateMenuFoodsresult,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating menu foods',
      error: true
    })
  }
}

interface UpdateMenuFoodsRequest extends NextApiRequest {
  body: menu_foods
}
