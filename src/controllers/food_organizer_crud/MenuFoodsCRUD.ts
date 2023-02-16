/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma, menu_foods } from '@prisma/client'
import menuFoodsValidations, { validations } from 'models/menuFoodsValidations'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const createMenuFoods = async (data: CreateMenuFoods): Promise<Prisma.BatchPayload> => {
  if (!Array.isArray(data)) throw new Error('Invalid body: not array')
  for (const { creation_date, menu_id, food_id } of data) {
    menuFoodsValidations({
      creationDate: creation_date as unknown as string,
      food_id,
      menu_id
    })
  }
  const result = await prisma.menu_foods.createMany({
    data: [...data]
  })
  return result
}

export const getMenuFoods = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<menu_foods[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.menu_foods.findMany()
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

export const updateMenuFoods = async (
  req: UpdateDailyMenuFoods,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { menu_id, food_id, id } = req.body
    validations.menu_id(menu_id)
    validations.food_id(food_id)
    const rowsAffected = await prisma.$executeRaw`UPDATE IGNORE menu_foods SET
menu_id = ${menu_id},
food_id = ${food_id}
WHERE menu_foods.id = ${id}
`
    if (rowsAffected === 0) {
      res.status(400).send({
        data: 'error updating daily menu',
        error: true
      })
    } else {
      res.status(200).send({
        data: 'daily menu updated',
        error: false
      })
    }
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating daily menu foods',
      error: true
    })
  }
}

export type CreateMenuFoods = Array<Omit<menu_foods, 'id'>>

interface UpdateDailyMenuFoods extends NextApiRequest {
  body: menu_foods
}
