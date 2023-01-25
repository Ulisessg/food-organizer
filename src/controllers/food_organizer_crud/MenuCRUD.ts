/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import menuValidations, { validations } from 'models/menuValidations'
import type { menus } from '@prisma/client'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const createMenu = async (
  req: CreateMenu,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, creation_date } = req.body
    menuValidations({
      comment,
      creationDate: creation_date as unknown as string
    })
    await prisma.menus.create({
      data: { comment, creation_date }
    })
    res.status(201).send({
      data: 'menu created',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating menu',
      error: true
    })
  }
}

export const getMenus = async (
  _req: CreateMenu,
  res: NextApiResponse<response<GetMenus | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<GetMenus>`SELECT
menus.id, menus.comment,
JSON_ARRAYAGG(JSON_OBJECT(
  'food_id', foods.id,
  'food_name', foods.name,
  'preparation_time', foods.preparation_time,
  'image', foods.image
)) AS menu_foods
FROM menu_foods
JOIN menus ON menus.id = menu_foods.menu_id
JOIN foods ON foods.id = menu_foods.food_id
GROUP BY menus.id
`
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error getting  menu',
      error: true
    })
  }
}

export const updateMenu = async (
  req: CreateMenu,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, id } = req.body
    validations.comment(comment)
    const rowsAffected = await prisma.$executeRaw`UPDATE IGNORE menus SET
comment = ${comment}
WHERE menus.id = ${id}
`
    if (rowsAffected === 0) {
      res.status(400).send({
        data: 'error updating menu',
        error: true
      })
    } else {
      res.status(200).send({
        data: 'menu updated',
        error: false
      })
    }
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating menu',
      error: true
    })
  }
}

interface CreateMenu extends NextApiRequest {
  body: menus
}

export type GetMenus = Array<{
  id: number
  comment: string
  menu_foods: Array<{
    image: null | string
    food_id: number
    food_name: string
    preparation_time: number
  }>
}>
