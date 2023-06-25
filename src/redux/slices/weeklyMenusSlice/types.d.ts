import {
  type GetWeeklyMenu,
  type TCreateWeeklyMenus
} from 'controllers/food_organizer_crud/sql/weeklyMenus/types'
import { type GetDays } from 'controllers/food_organizer_crud/sql/days/types'

export type TGetDaysCallack = () => Promise<GetDays>

export type GetWeeklyMenusCallback = () => Promise<GetWeeklyMenu>

export type CreateWeeklyMenusCallback =
  (weeklyMenu: TCreateWeeklyMenus) => () => Promise<GetWeeklyMenu[0]>
