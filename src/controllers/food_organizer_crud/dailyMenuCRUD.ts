/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import dailyMenuValidations, { validations } from 'models/dailyMenuValidations'
import type { daily_menus } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createDailyMenu = async (
  req: CreateDailyMenu,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, creation_date } = req.body
    dailyMenuValidations({
      comment,
      creationDate: creation_date as unknown as string
    })
    await prisma.daily_menus.create({
      data: { comment, creation_date }
    })
    res.status(201).send({
      data: 'daily menu created',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating daily menu',
      error: true
    })
  }
}

export const getDailyMenus = async (
  req: CreateDailyMenu,
  res: NextApiResponse<response<daily_menus[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<daily_menus[]>`SELECT
daily_menus.id, daily_menus.comment
FROM daily_menus
`
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error getting daily menu',
      error: true
    })
  }
}

export const updateDailyMenu = async (
  req: CreateDailyMenu,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, id } = req.body
    validations.comment(comment)
    const rowsAffected = await prisma.$executeRaw`UPDATE IGNORE daily_menus SET
comment = ${comment}
WHERE daily_menus.id = ${id}
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
      data: 'error updating daily menu',
      error: true
    })
  }
}

interface CreateDailyMenu extends NextApiRequest {
  body: daily_menus
}