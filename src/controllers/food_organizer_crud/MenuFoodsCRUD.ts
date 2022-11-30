/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import menuFoodsValidations, { validations } from 'models/menuFoodsValidations'
import type { menu_foods } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createDailyMenuFoods = async (
  req: CreateDailyMenuFoods,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    if (!Array.isArray(req.body)) throw new Error('Invalid body: not array')
    if (req.body.length > 10) throw new Error('you cannot add more than 10 registers at same time')
    for (const { creation_date, menu_id, food_id } of req.body) {
      menuFoodsValidations({
        creationDate: creation_date as unknown as string,
        food_id,
        menu_id
      })
    }
    await prisma.menu_foods.createMany({
      data: [...req.body]
    })
    res.status(201).send({
      data: 'daily menu foods created',
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

export const getDailyMenuFoods = async (
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

export const updateDailyMenuFoods = async (
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

interface CreateDailyMenuFoods extends NextApiRequest {
  body: menu_foods[]
}

interface UpdateDailyMenuFoods extends NextApiRequest {
  body: menu_foods
}
