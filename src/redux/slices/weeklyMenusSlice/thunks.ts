import {
  type TCreateWeeklyMenus,
  type TCreateWeeklyMenusResponse
} from 'controllers/food_organizer_crud/nextjs/weeklyMenuCRUD'
import axios, { type AxiosResponse } from 'axios'
import { type GetDays } from 'controllers/food_organizer_crud/sql/days/types'
import { type GetWeeklyMenu } from 'controllers/food_organizer_crud/sql/weeklyMenus/types'
import { type TGetDaysCallack } from './types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type response } from 'controllers/response'

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

export const getWeeklyMenusThunk = createAsyncThunk(
  'weekly_menus/get_weekly_menus',
  async (_limit, thunkApi) => {
    const weeklyMenusRequestResult = await axios.get<response<GetWeeklyMenu>>('/api/weeklymenu')
    if (weeklyMenusRequestResult.data.error) {
      return thunkApi.rejectWithValue('')
    }
    return weeklyMenusRequestResult.data.data
  }
)

// eslint-disable-next-line max-len
export const createWeeklyMenuThunk = createAsyncThunk<TCreateWeeklyMenusResponse, TCreateWeeklyMenus>(
  'weekly_menus/create_weekly_menu',
  async (weeklyMenu, thunkApi) => {
    const createWeeklyMenuRequestResult =
     await axios.post<TCreateWeeklyMenus, AxiosResponse<response<TCreateWeeklyMenusResponse>>>(
       '/api/weeklymenu',
       weeklyMenu
     )
    if (createWeeklyMenuRequestResult.data.error) {
      return thunkApi.rejectWithValue('')
    }
    return createWeeklyMenuRequestResult.data.data
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
