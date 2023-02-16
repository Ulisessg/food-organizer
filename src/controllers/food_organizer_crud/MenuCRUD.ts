/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type CreateMenuFoods, createMenuFoods } from './MenuFoodsCRUD'
import type { NextApiRequest, NextApiResponse } from 'next'
import menuValidations, { validations } from 'models/menuValidations'
import { type menus } from '@prisma/client'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const createMenu = async (
  req: CreateMenu,
  res: NextApiResponse<response<CreateMenuResponse>>
): Promise<void> => {
  const { comment, creation_date, foods } = req.body

  let successfullResponse: CreateMenuResponse = {
    errorCreatingFoods: false,
    errorCreatingMenu: false,
    menu: {} as any
  }

  // Menu creation
  try {
    menuValidations({
      comment,
      creationDate: creation_date as unknown as string
    })
    const menuCreationResult = await prisma.menus.create({
      data: { comment, creation_date }
    })
    successfullResponse = {
      ...successfullResponse,
      menu: {
        comment: menuCreationResult.comment,
        id: menuCreationResult.id,
        menu_foods: [] as any
      }
    }
  } catch (error) {
    res.status(400).send({
      data: {
        errorCreatingFoods: false,
        errorCreatingMenu: true,
        menu: [] as any
      },
      error: true
    })
  }

  // Menu foods creation
  try {
    const menuFoodsCreated = await createMenuFoods(foods)
    if (menuFoodsCreated.count === 0) {
      throw new Error('Ocurrió un error añadiendo las comidas al menú')
    }
    const menuFoods = await prisma.$queryRaw<GetMenus[0]['menu_foods']>`SELECT
      menu_foods.id AS menu_food_id,
      menu_foods.food_id,
      foods.name,
      foods.image,
      foods.preparation_time
      FROM menu_foods
      INNER JOIN foods ON foods.id = menu_foods.food_id
      WHERE menu_foods.menu_id = ${successfullResponse.menu.id}`

    successfullResponse = {
      ...successfullResponse,
      menu: {
        ...successfullResponse.menu,
        menu_foods: menuFoods
      }
    }
    res.status(201).send({
      data: successfullResponse,
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: {
        errorCreatingFoods: true,
        errorCreatingMenu: false,
        menu: {} as any
      },
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
  req: UpdateMenu,
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

export interface CreateMenu extends NextApiRequest {
  body: Omit<menus, 'id'> & { foods: CreateMenuFoods }
}

export interface CreateMenuResponse {
  menu: GetMenus[0]
  errorCreatingMenu: boolean
  errorCreatingFoods: boolean
}

export interface UpdateMenu extends NextApiRequest {
  body: menus
}

export type GetMenus = Array<{
  id: number
  comment: string | null
  menu_foods: Array<{
    menu_food_id: number
    image: null | string
    food_id: number
    food_name: string
    preparation_time: number
  }>
}>
