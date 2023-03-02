/* eslint-disable max-lines-per-function */
import {
  type GetWeeklyMenu,
  type TCreateWeeklyMenus,
  type TCreateWeeklyMenusResponse
} from 'controllers/food_organizer_crud/weeklyMenuCRUD'
import axios, { type AxiosResponse } from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type GetDays } from 'controllers/food_organizer_crud/daysCRUD'
import getWeekRangeOfDates from 'utils/getWeekRangeOfDates'
import { type response } from 'controllers/response'

const initialState: TWeekState = {
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

/**
 * Thunks
 */

// Get days
export const getDaysThunk = createAsyncThunk(
  'days/get_days',
  async (_params, thunkApi) => {
    const daysRequestResult = await axios.get<response<GetDays>>('/api/days')
    if (daysRequestResult.data.error) {
      return thunkApi.rejectWithValue('')
    }
    return daysRequestResult.data.data
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

/**
 * Slice
 */
const weeklyMenusSlice = createSlice({
  initialState,
  name: 'weekly_menus',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    builder.addCase(
      getDaysThunk.pending,
      (state) => {
        state.getDaysEnd = false
        state.getDaysError = false
        state.getDaysIsLoading = true
        state.getDaysSuccess = false
      }
    )
    builder.addCase(
      getDaysThunk.rejected,
      (state) => {
        state.getDaysEnd = true
        state.getDaysError = true
        state.getDaysIsLoading = false
        state.getDaysSuccess = false
      }
    )
    builder.addCase(
      getDaysThunk.fulfilled,
      (state, action) => {
        state.getDaysEnd = true
        state.getDaysError = false
        state.getDaysIsLoading = false
        state.getDaysSuccess = true

        state.days = [...action.payload]
      }
    )

    // Get weekly menus
    builder.addCase(
      getWeeklyMenusThunk.pending,
      (state) => {
        state.getWeeklyEnd = false
        state.getWeeklyError = false
        state.getWeeklyIsLoading = true
        state.getWeeklySuccess = false
      }
    )
    builder.addCase(
      getWeeklyMenusThunk.rejected,
      (state) => {
        state.getWeeklyEnd = true
        state.getWeeklyError = true
        state.getWeeklyIsLoading = false
        state.getWeeklySuccess = false
      }
    )
    builder.addCase(
      getWeeklyMenusThunk.fulfilled,
      (state, action) => {
        state.getWeeklyEnd = true
        state.getWeeklyError = false
        state.getWeeklyIsLoading = false
        state.getWeeklySuccess = true
        state.weeklyMenus = [...action.payload]
        const sundaysOfWeeksWithMenus: TWeekState['sundaysOfWeeksWithMenus'] = action
          .payload.map((week, index) => {
            const { sundayDate } = getWeekRangeOfDates(week.creation_date)
            return {
              date: sundayDate,
              index
            }
          })
        state.sundaysOfWeeksWithMenus = [...sundaysOfWeeksWithMenus]
      }
    )

    // Create weekly menu
    builder.addCase(
      createWeeklyMenuThunk.pending,
      (state) => {
        state.createWeeklyEnd = false
        state.createWeeklyError = false
        state.createWeeklyIsLoading = true
        state.createWeeklySuccess = false
      }
    )
    builder.addCase(
      createWeeklyMenuThunk.rejected,
      (state) => {
        state.createWeeklyEnd = true
        state.createWeeklyError = true
        state.createWeeklyIsLoading = false
        state.createWeeklySuccess = false
      }
    )
    builder.addCase(
      createWeeklyMenuThunk.fulfilled,
      (state, action) => {
        state.createWeeklyEnd = true
        state.createWeeklyError = false
        state.createWeeklyIsLoading = false
        state.createWeeklySuccess = true
        state.weeklyMenus = [
          ...state.weeklyMenus,
          { ...action.payload.weeklyMenu[0] }
        ]
        state.sundaysOfWeeksWithMenus = [
          ...state.sundaysOfWeeksWithMenus,
          {
            date: action.payload.weeklyMenu[0].creation_date,
            index: state.weeklyMenus.length - 1
          }
        ]
      }
    )

    // Restart post data
    builder.addCase(
      restartPostWeeklyMenu.fulfilled,
      (state) => {
        state.createWeeklyEnd = false
        state.createWeeklyError = false
        state.createWeeklyIsLoading = false
        state.createWeeklySuccess = false
      }
    )
  }
})

export default weeklyMenusSlice.reducer

interface TWeekState {

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
