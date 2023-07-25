import {
  type CreateWeeklyMenusCallback,
  type GetWeeklyMenusCallback,
  type TGetDaysCallack
} from './types'
import { type GetDays } from 'controllers/sql/days/types'
import { type GetWeeklyMenu } from 'controllers/sql/weeklyMenus/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getDaysThunk = createAsyncThunk<GetDays, TGetDaysCallack>(
  'days/get_days',
  async (getDays, thunkApi) => {
    try {
      const daysRequestResult = await getDays()
      return daysRequestResult
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const getWeeklyMenusThunk = createAsyncThunk<GetWeeklyMenu, GetWeeklyMenusCallback>(
  'weekly_menus/get_weekly_menus',
  async (getData, thunkApi) => {
    try {
      const weeklyMenus = await getData()
      return weeklyMenus
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

// eslint-disable-next-line max-len
export const createWeeklyMenuThunk = createAsyncThunk<GetWeeklyMenu[0], ReturnType<CreateWeeklyMenusCallback>>(
  'weekly_menus/create_weekly_menu',
  async (createWeeklyMenu, thunkApi) => {
    try {
      const weeklyMenuCreated = await createWeeklyMenu()
      return weeklyMenuCreated
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const restartPostWeeklyMenu = createAsyncThunk(
  'weekly_menus/restart-post-data',
  async () => {
    await new Promise((resolve) => {
      setTimeout(
        () => {
          resolve('')
        },
        3000
      )
    })
  }
)
