/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import getWeeklyMenusSql, { type GetWeeklyMenu } from '../sql/weeklyMenus/getWeeklyMenusSql'
import getWeeklyMenuCreated from '../sql/weeklyMenus/getWeeklyMenuCreatedSql'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'
import weeklyMenuValidations from 'models/weeklyMenuValidations'
import { type weekly_menu_days } from '@prisma/client'

export const createWeeklyMenu = async (
  req: CreateWeeklyMenu,
  res: NextApiResponse<response<TCreateWeeklyMenusResponse>>
): Promise<void> => {
  const { creation_date, menus } = req.body
  weeklyMenuValidations({
    creationDate: creation_date
  })
  // Create weekly_menu
  let weeklyMenuId: number = null as unknown as number
  try {
    const createWeeklyMenuResult = await prisma.weekly_menus.create({
      data: {
        creation_date
      }
    })
    weeklyMenuId = createWeeklyMenuResult.id
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: {
        errorCreatingWeeklyMenu: true,
        errorCreatingWeeklyMenuDay: false,
        weeklyMenu: [] as any
      },
      error: true
    })
  }
  // Create weekly_menu_days
  try {
    const WMDDataWithWeeklyId =
    menus.map<Omit<weekly_menu_days, 'id'>>((wmd) => ({
      day_id: wmd.day_id,
      menu_id: wmd.menu_id,
      weekly_menu_id: weeklyMenuId
    }))
    const createWeeklyMenuDaysResult = await prisma.weekly_menu_days.createMany({
      data: WMDDataWithWeeklyId,
      skipDuplicates: true
    })

    if (createWeeklyMenuDaysResult.count === 0) throw new Error('No Weekly menu days created')

    const weeklyMenuCreated = await getWeeklyMenuCreated(weeklyMenuId)
    res.status(201).send({
      data: {
        errorCreatingWeeklyMenu: false,
        errorCreatingWeeklyMenuDay: false,
        weeklyMenu: weeklyMenuCreated
      },
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: {
        errorCreatingWeeklyMenu: false,
        errorCreatingWeeklyMenuDay: true,
        weeklyMenu: [] as any
      },
      error: true
    })
  }
}

// eslint-disable-next-line max-lines-per-function
export const getWeeklyMenu = async (
  _req: any,
  res: NextApiResponse<response<GetWeeklyMenu | string>>
): Promise<void> => {
  try {
    const weeklyMenus = await getWeeklyMenusSql()

    res.status(200).send({
      data: weeklyMenus,
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
  body: TCreateWeeklyMenus
}

export interface TCreateWeeklyMenus {
  creation_date: string
  menus: Array<{
    day_id: number
    menu_id: number
  }>
}

export interface TCreateWeeklyMenusResponse {
  errorCreatingWeeklyMenu: boolean
  errorCreatingWeeklyMenuDay: boolean
  weeklyMenu: GetWeeklyMenu
}
