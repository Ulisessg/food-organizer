import {
  type CreateMenuCallback,
  type CreateMenuReject,
  type GetMenusDataCallback,
  type GetMenusIngredientsCallback
} from './types'
import {
  type GetMenus
} from 'controllers/food_organizer_crud/nextjs/MenuCRUD'
import {
  type GetMenusIngredients
} from 'controllers/food_organizer_crud/sql/menus/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

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
export const createMenuThunk = createAsyncThunk<GetMenus[0], ReturnType<CreateMenuCallback>, { rejectValue: CreateMenuReject }>(
  'menus/create',
  async (createMenu, thunkApi) => {
    try {
      const menuCreated = await createMenu()
      return menuCreated
    } catch (error) {
      console.log(error)

      const err = error as Error
      if (err.message === 'menu') {
        return thunkApi.rejectWithValue({
          createMenuError: true,
          createMenuFoodsError: false
        })
      }
      return thunkApi.rejectWithValue({
        createMenuError: false,
        createMenuFoodsError: true
      })
    }
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
