import {
  type CreateMenu,
  type CreateMenuResponse,
  type GetMenus
} from 'controllers/food_organizer_crud/nextjs/MenuCRUD'
import {
  type CreateMenuReject,
  type GetMenusDataCallback,
  type GetMenusIngredientsCallback
} from './types'
import axios, { type AxiosResponse } from 'axios'
import {
  type GetMenusIngredients
} from 'controllers/food_organizer_crud/sql/menus/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type response } from 'controllers/response'

export const getMenusDataThunk = createAsyncThunk<GetMenus, GetMenusDataCallback>(
  'menus/get_data',
  async (getData, thunkApi) => {
    try {
      const getMenusDataRequest = await getData()
      return getMenusDataRequest
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

// eslint-disable-next-line max-len
export const createMenuThunk = createAsyncThunk<GetMenus[0], CreateMenu, { rejectValue: CreateMenuReject }>(
  'menus/create',
  async (menuData, thunkApi) => {
    const createMenuRequest: AxiosResponse<response<CreateMenuResponse>> =
     await axios.post<CreateMenu, AxiosResponse<response<CreateMenuResponse>>>(
       '/api/menu',
       menuData
     )
    if (createMenuRequest.data.error) {
      return thunkApi.rejectWithValue({
        createMenuError: createMenuRequest.data.data?.errorCreatingMenu,
        createMenuFoodsError: createMenuRequest.data.data?.errorCreatingFoods
      })
    }
    return createMenuRequest.data.data.menu
  }
)

export const restartPostMenuThunk = createAsyncThunk(
  'menus/restart_post_data',
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

export const getMenusIngredientsThunk =
createAsyncThunk<GetMenusIngredients, GetMenusIngredientsCallback>(
  'menus/ingredients',
  async (getData, thunkApi) => {
    try {
      const menusIngredientsResponse = await getData()
      return menusIngredientsResponse
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
