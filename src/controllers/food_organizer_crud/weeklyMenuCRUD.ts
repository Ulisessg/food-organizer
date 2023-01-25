/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'
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

// eslint-disable-next-line max-lines-per-function
export const getWeeklyMenu = async (
  _req: any,
  res: NextApiResponse<response<GetWeeklyMenu | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<GetWeeklyMenu>`
  SELECT
weekly_menus.id,
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
  body: weekly_menus
}

export type GetWeeklyMenu = Array<{
  monday: TDay
  tuesday: TDay
  wednesday: TDay
  thursday: TDay
  friday: TDay
  saturday: TDay
  sunday: TDay
}>

type TDay = Array<{
  menu_id: number
  foods: Food[]
}>

interface Food {
  food_id: number
  food_name: string
}
