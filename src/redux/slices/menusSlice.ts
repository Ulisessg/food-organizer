/* eslint-disable max-lines-per-function */
import {
  type CreateMenu,
  type CreateMenuResponse,
  type GetMenus
} from 'controllers/food_organizer_crud/MenuCRUD'
import axios, { type AxiosResponse } from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type response } from 'controllers/response'

const initialState: TMenuState = {
  createMenuEnd: false,
  createMenuError: false,
  createMenuIsLoading: false,
  createMenuSuccess: false,
  errorCreatingMenu: false,
  errorCreatingMenuFoods: false,
  getMenusDataEnd: false,
  getMenusDataError: false,
  getMenusDataIsLoading: false,
  getMenusDataSuccess: false,
  menus: []
}

/**
 * Thunks
 */

export const getMenusDataThunk = createAsyncThunk<GetMenus, number | null>(
  'menus/get_data',
  async (_limit, thunkApi) => {
    const getMenusDataRequest = await axios.get<response<GetMenus>>('/api/menu')
    if (getMenusDataRequest.data.error) {
      return thunkApi.rejectWithValue('')
    }
    return getMenusDataRequest.data.data
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

/**
 * Slice
 */

const menusSlice = createSlice({
  initialState,
  name: 'menus',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    // Get data
    builder.addCase(
      getMenusDataThunk.pending,
      (state) => {
        state.getMenusDataEnd = false
        state.getMenusDataError = false
        state.getMenusDataIsLoading = true
        state.getMenusDataSuccess = false
      }
    )
    builder.addCase(
      getMenusDataThunk.rejected,
      (state) => {
        state.getMenusDataEnd = true
        state.getMenusDataError = true
        state.getMenusDataIsLoading = false
        state.getMenusDataSuccess = false
      }
    )
    builder.addCase(
      getMenusDataThunk.fulfilled,
      (state, action) => {
        state.getMenusDataEnd = true
        state.getMenusDataSuccess = true
        state.getMenusDataError = false
        state.getMenusDataIsLoading = false

        state.menus = [...action.payload]
      }
    )

    // Create menu
    builder.addCase(
      createMenuThunk.pending,
      (state) => {
        state.createMenuIsLoading = true
        state.createMenuEnd = false
        state.createMenuError = false
        state.createMenuSuccess = false
        state.errorCreatingMenu = false
        state.errorCreatingMenuFoods = false
      }
    )
    builder.addCase(
      createMenuThunk.rejected,
      (state, action) => {
        state.createMenuIsLoading = false
        state.createMenuEnd = true
        state.createMenuError = true
        state.createMenuSuccess = false
        state.errorCreatingMenu = action.payload?.createMenuError as boolean
        state.errorCreatingMenuFoods = action.payload?.createMenuFoodsError as boolean
      }
    )
    builder.addCase(
      createMenuThunk.fulfilled,
      (state, action) => {
        state.createMenuIsLoading = false
        state.createMenuEnd = true
        state.createMenuError = false
        state.createMenuSuccess = true
        console.log(action.payload)

        state.menus = [
          ...state.menus,
          {
            ...action.payload
          }
        ]
      }
    )
    // Restart post data

    builder.addCase(
      restartPostMenuThunk.fulfilled,
      (state) => {
        state.createMenuIsLoading = false
        state.createMenuEnd = false
        state.createMenuError = false
        state.createMenuSuccess = false
      }
    )
  }
})

export default menusSlice.reducer

interface TMenuState {
  menus: GetMenus
  // Get data
  getMenusDataIsLoading: boolean
  getMenusDataEnd: boolean
  getMenusDataError: boolean
  getMenusDataSuccess: boolean

  // Post data
  createMenuIsLoading: boolean
  createMenuEnd: boolean
  createMenuError: boolean
  createMenuSuccess: boolean

  errorCreatingMenu: boolean
  errorCreatingMenuFoods: boolean
}

interface CreateMenuReject {
  createMenuError: boolean
  createMenuFoodsError: boolean
}
