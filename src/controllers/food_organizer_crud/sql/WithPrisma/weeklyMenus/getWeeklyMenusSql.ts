import prisma from 'lib/prisma'
import weeklyMenuDaySql from './getWeeklyMenuDaysSql'

const getWeeklyMenusSql = async (): Promise<GetWeeklyMenu> => {
  const weeklyMenus = await prisma.$queryRaw<GetWeeklyMenu>`
  SELECT
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
GROUP BY weekly_menus.id
ORDER BY weekly_menus.creation_date
`
  return weeklyMenus
}

export default getWeeklyMenusSql

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
