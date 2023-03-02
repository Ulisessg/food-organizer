/* eslint-disable max-lines-per-function */
import { type GetWeeklyMenu } from '../weeklyMenuCRUD'
import prisma from 'lib/prisma'

const getWeeklyMenuCreated = async (weeklyMenuId: number): Promise<GetWeeklyMenu> => {
  const weeklyMenuCreated = await prisma.$queryRaw<GetWeeklyMenu>`SELECT
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
  WHERE weekly_menus.id = ${weeklyMenuId}
`

  return weeklyMenuCreated
}

export default getWeeklyMenuCreated
