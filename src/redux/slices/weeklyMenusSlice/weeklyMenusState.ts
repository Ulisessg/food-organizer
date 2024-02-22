import { type GetDays } from 'controllers/sql/days/types'
import { type GetWeeklyMenu } from 'controllers/sql/weeklyMenus/types'
import { databaseSlicesCommonState } from '../databaseSlice/state'

const initialState: TWeeklyMenusState = {
  ...databaseSlicesCommonState,
  createWeeklyEnd: false,
  createWeeklyError: false,
  createWeeklyIsLoading: false,
  createWeeklySuccess: false,
  days: [],
  getDaysEnd: false,
  getDaysError: false,
  getDaysIsLoading: false,
  getDaysSuccess: false,
  getWeeklyEnd: false,
  getWeeklyError: false,
  getWeeklyIsLoading: false,
  getWeeklySuccess: false,
  sundaysOfWeeksWithMenus: [] as any,
  weeklyMenus: []
}

export default initialState

export interface TWeeklyMenusState {

  /** Get days */
  getDaysIsLoading: boolean
  getDaysSuccess: boolean
  getDaysError: boolean
  getDaysEnd: boolean

  /** Get weekly menu */
  getWeeklyIsLoading: boolean
  getWeeklySuccess: boolean
  getWeeklyError: boolean
  getWeeklyEnd: boolean

  /** Create weekly menu */
  createWeeklyIsLoading: boolean
  createWeeklySuccess: boolean
  createWeeklyError: boolean
  createWeeklyEnd: boolean

  weeklyMenus: GetWeeklyMenu
  days: GetDays
  sundaysOfWeeksWithMenus: Array<{
    date: string
    index: number
  }>
}
