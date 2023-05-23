/* eslint-disable max-lines-per-function */
import { type GetWeeklyMenu } from './getWeeklyMenusSql'
import prisma from 'lib/prisma'
import weeklyMenuDaySql from './getWeeklyMenuDaysSql'

const getWeeklyMenuCreated = async (weeklyMenuId: number): Promise<GetWeeklyMenu> => {
  const weeklyMenuCreated = await prisma.$queryRaw<GetWeeklyMenu>`SELECT
  weekly_menus.id,
  weekly_menus.creation_date,
  ${weeklyMenuDaySql(
1,
'monday'
)},
  ${weeklyMenuDaySql(
2,
'tuesday'
)},
  ${weeklyMenuDaySql(
3,
'wednesday'
)},
  ${weeklyMenuDaySql(
4,
'thursday'
)},
  ${weeklyMenuDaySql(
5,
'friday'
)},
  ${weeklyMenuDaySql(
6,
'saturday'
)},
  ${weeklyMenuDaySql(
7,
'sunday'
)}
  FROM weekly_menus
  WHERE weekly_menus.id = ${weeklyMenuId}
`

  return weeklyMenuCreated
}

export default getWeeklyMenuCreated
