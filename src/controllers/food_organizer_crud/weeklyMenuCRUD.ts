/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'
import weeklyMenuValidations from 'models/weeklyMenuValidations'
import type { weekly_menus } from '@prisma/client'

export const createWeeklyMenu = async (
  req: CreateWeeklyMenu,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const {
      creation_date
    } = req.body
    weeklyMenuValidations({
      creationDate: creation_date as unknown as string
    })
    await prisma.weekly_menus.create({
      data: { ...req.body }
    })
    res.status(201).send({
      data: 'weekly menu created',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating weekly menu',
      error: true
    })
  }
}

export const getWeeklyMenu = async (
  req: GetWeeklyMenu,
  res: NextApiResponse<response<weekly_menus | weekly_menus[] | string>>
): Promise<void> => {
  try {
    const { id } = req.body
    // eslint-disable-next-line init-declarations
    let result
    if (typeof id === 'number') {
      result = await
      prisma.$queryRaw<weekly_menus>`SELECT * FROM weekly_menus WHERE weekly_menus.id = ${id}`
    } else {
      result = await prisma.$queryRaw<weekly_menus>`SELECT * FROM weekly_menus`
    }
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error getting weekly menu',
      error: true
    })
  }
}

interface CreateWeeklyMenu extends NextApiRequest {
  body: weekly_menus
}

interface GetWeeklyMenu extends NextApiRequest {
  body: {
    id?: number
  }
}
