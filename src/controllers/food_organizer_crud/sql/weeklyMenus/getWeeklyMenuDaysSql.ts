/**
 *
 * @param dayId
 * @param dayName
 * @returns
 */
const weeklyMenuDaySql = (dayId: number, dayName: string): string => `(SELECT
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
    WHERE weekly_menu_days.weekly_menu_id = weekly_menus.id AND weekly_menu_days.day_id = ${dayId}
) AS ${dayName}`

export default weeklyMenuDaySql
