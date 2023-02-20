/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import getWeeklyMenuCreated from './sql/getWeeklyMenuCreated'
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
    const result = await prisma.$queryRaw<GetWeeklyMenu>`
  SELECT
weekly_menus.id,
weekly_menus.creation_date,
(SELECT
  JSON_ARRAYAGG(JSON_OBJECT(
    'menu_id', weekly_menu_days.menu_id,
      'foods', (SELECT JSON_ARRAYAGG(JSON_OBJECT(
        'food_id', foods.id,
        'food_name', foods.name
      ))
      FROM menu_foods
      INNER JOIN foods ON foods.id = menu_foods.food_id
      WHERE menu_foods.menu_id = weekly_menu_days.menu_id
      )
  ))
  FROM weekly_menu_days
  WHERE weekly_menu_days.weekly_menu_id = weekly_menus.id AND weekly_menu_days.day_id = 1
) AS monday,
(SELECT
  JSON_ARRAYAGG(JSON_OBJECT(
    'menu_id', weekly_menu_days.menu_id,
    'foods', (SELECT JSON_ARRAYAGG(JSON_OBJECT(
      'food_id', foods.id,
      'food_name', foods.name
    ))
    FROM menu_foods
    INNER JOIN foods ON foods.id = menu_foods.food_id
    WHERE menu_foods.menu_id = weekly_menu_days.menu_id
    )
  ))
  FROM weekly_menu_days
  WHERE weekly_menu_days.weekly_menu_id = weekly_menus.id AND weekly_menu_days.day_id = 2
) AS tuesday,
(SELECT
  JSON_ARRAYAGG(JSON_OBJECT(
    'menu_id', weekly_menu_days.menu_id,
    'foods', (SELECT
      JSON_ARRAYAGG(JSON_OBJECT(
        'food_id', foods.id,
        'food_name', foods.name
      ))
      FROM menu_foods
      INNER JOIN foods ON foods.id = menu_foods.food_id
      WHERE menu_foods.menu_id = weekly_menu_days.menu_id
      )
  ))
  FROM weekly_menu_days
  WHERE weekly_menu_days.weekly_menu_id = weekly_menus.id AND weekly_menu_days.day_id = 3
) AS wednesday,
(SELECT
  JSON_ARRAYAGG(JSON_OBJECT(
    'menu_id', weekly_menu_days.menu_id,
    'foods', (SELECT
      JSON_ARRAYAGG(JSON_OBJECT(
        'food_id', foods.id,
        'food_name', foods.name
      ))
      FROM menu_foods
      INNER JOIN foods ON foods.id = menu_foods.food_id
      WHERE menu_foods.menu_id = weekly_menu_days.menu_id
      )
  ))
  FROM weekly_menu_days
  WHERE weekly_menu_days.weekly_menu_id = weekly_menus.id AND weekly_menu_days.day_id = 4
) AS thursday,
(SELECT
  JSON_ARRAYAGG(JSON_OBJECT(
    'menu_id', weekly_menu_days.menu_id,
    'foods', (SELECT
      JSON_ARRAYAGG(JSON_OBJECT(
        'food_id', foods.id,
        'food_name', foods.name
      ))
      FROM menu_foods
      INNER JOIN foods ON foods.id = menu_foods.food_id
      WHERE menu_foods.menu_id = weekly_menu_days.menu_id
      )
  ))
  FROM weekly_menu_days
  WHERE weekly_menu_days.weekly_menu_id = weekly_menus.id AND weekly_menu_days.day_id = 5
) AS friday,
(SELECT
  JSON_ARRAYAGG(JSON_OBJECT(
    'menu_id', weekly_menu_days.menu_id,
    'foods', (SELECT
      JSON_ARRAYAGG(JSON_OBJECT(
        'food_id', foods.id,
        'food_name', foods.name
      ))
      FROM menu_foods
      INNER JOIN foods ON foods.id = menu_foods.food_id
      WHERE menu_foods.menu_id = weekly_menu_days.menu_id
      )
    ))
    FROM weekly_menu_days
    WHERE weekly_menu_days.weekly_menu_id = weekly_menus.id AND weekly_menu_days.day_id = 6
) AS saturday,
(SELECT
  JSON_ARRAYAGG(JSON_OBJECT(
    'menu_id', weekly_menu_days.menu_id,
    'foods', (SELECT
      JSON_ARRAYAGG(JSON_OBJECT(
        'food_id', foods.id,
        'food_name', foods.name
      ))
      FROM menu_foods
      INNER JOIN foods ON foods.id = menu_foods.food_id
      WHERE menu_foods.menu_id = weekly_menu_days.menu_id
      )
    ))
    FROM weekly_menu_days
    WHERE weekly_menu_days.weekly_menu_id = weekly_menus.id AND weekly_menu_days.day_id = 7
) AS sunday
FROM weekly_menus
GROUP BY weekly_menus.id
ORDER BY weekly_menus.creation_date
LIMIT 1
;
`

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
  body: TCreateWeeklyMenus
}

export type GetWeeklyMenu = Array<{
  creation_date: string
  id: number
  monday: TDay
  tuesday: TDay
  wednesday: TDay
  thursday: TDay
  friday: TDay
  saturday: TDay
  sunday: TDay
}>

export type TDay = Array<{
  menu_id: number
  foods: Food[]
}> | null

interface Food {
  food_id: number
  food_name: string
}

export interface TCreateWeeklyMenus {

  /** Use the day selected by calendar */
  creation_date: string
  menus: Array<{
    day_id: number
    menu_id: number
  }>
}

export interface TCreateWeeklyMenusResponse {
  errorCreatingWeeklyMenu: boolean
  errorCreatingWeeklyMenuDay: boolean
  weeklyMenu: GetWeeklyMenu[0]
}
