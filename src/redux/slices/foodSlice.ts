/* eslint-disable max-lines */
/* eslint-disable camelcase */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type CreateFood, type GetFoods } from 'controllers/food_organizer_crud/foodsCRUD'
import {
  type CreateFoodType,
  type GetFoodTypes
} from 'controllers/food_organizer_crud/foodTypesCRUD'
import axios, { type AxiosResponse } from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type food_types, type foods } from '@prisma/client'
import { type response } from 'controllers/response'

const initialState: TFoodState = {
  foodTypes: [],
  foods: [],
  foodsGroupedByType: [],
  getFoodTypesEnd: false,
  getFoodTypesError: false,
  getFoodTypesIsLoading: false,
  getFoodTypesSuccess: false,
  getFoodsEnd: false,
  getFoodsError: false,
  getFoodsIsLoading: false,
  getFoodsSuccess: false,
  postFoodTypesEnd: false,
  postFoodTypesError: false,
  postFoodTypesIsLoading: false,
  postFoodTypesSuccess: false,
  postFoodsEnd: false,
  postFoodsError: false,
  postFoodsIsLoading: false,
  postFoodsSuccess: false
}

/**
 * Thunks
 */

export const getFoodsDataThunk = createAsyncThunk<GetFoodsDataThunkReturn, number | null,
{
  rejectValue: { foodsError: boolean, foodTypesError: boolean }
}
>(
  'foods/getData',
  async (_limit, thunkApi) => {
    const requestFoodsResult = await axios.get<response<GetFoods>>('/api/foods')
    if (requestFoodsResult.data.error) {
      return thunkApi.rejectWithValue({
        foodTypesError: false,
        foodsError: true
      })
    }
    const requestFoodTypesResult = await axios.get<response<GetFoodTypes>>('/api/foodtypes')
    if (requestFoodTypesResult.data.error) {
      return thunkApi.rejectWithValue({
        foodTypesError: true,
        foodsError: false
      })
    }
    return {
      foodTypes: requestFoodTypesResult.data.data as GetFoodTypes,
      foodsGroupedByType: requestFoodsResult.data.data as GetFoods
    }
  }
)

export const createFoodThunk = createAsyncThunk(
  'foods/create_food',
  async (foodData: CreateFood, thunkApi) => {
    const createFoodRequestResult = await axios.post<CreateFood, AxiosResponse<response<foods>>>(
      '/api/foods',
      foodData
    )
    if (createFoodRequestResult.data.error) {
      return thunkApi.rejectWithValue('Error creating food')
    }
    return createFoodRequestResult.data.data as foods
  }
)

export const restartPostData = createAsyncThunk(
  'foods/restart_post_data',
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

export const createFoodTypeThunk = createAsyncThunk<food_types, CreateFoodType>(
  'food_types/create',
  async (foodTypeData, thunkApi) => {
    const postRequestResult = await axios.post<CreateFoodType, AxiosResponse<response<food_types>>>(
      '/api/foodtypes',
      foodTypeData
    )
    if (postRequestResult.data.error) {
      return thunkApi.rejectWithValue('')
    }
    return postRequestResult.data.data as food_types
  }
)

/**
 * Slice
 */
const foodsSlice = createSlice({
  initialState,
  name: 'foods',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    // Get data
    builder.addCase(
      getFoodsDataThunk.pending,
      (state) => {
      // Food types
        state.getFoodTypesIsLoading = true
        state.getFoodTypesEnd = false
        state.getFoodTypesError = false
        state.getFoodTypesSuccess = false

        // Foods
        state.getFoodsIsLoading = true
        state.getFoodsEnd = false
        state.getFoodsError = false
        state.getFoodsSuccess = false
      }
    )
    builder.addCase(
      getFoodsDataThunk.rejected,
      (state, action) => {
        if (action.payload?.foodTypesError === true) {
          state.getFoodTypesIsLoading = false
          state.getFoodTypesEnd = true
          state.getFoodTypesError = true
          state.getFoodTypesSuccess = false
        }
        if (action.payload?.foodsError === true) {
          state.getFoodsIsLoading = false
          state.getFoodsEnd = true
          state.getFoodsError = true
          state.getFoodsSuccess = false
        }
      }
    )
    builder.addCase(
      getFoodsDataThunk.fulfilled,
      (state, action) => {
      // Food types
        state.getFoodTypesIsLoading = false
        state.getFoodTypesEnd = true
        state.getFoodTypesSuccess = true
        state.getFoodTypesError = false
        state.foodTypes = [...action.payload.foodTypes]

        // Foods
        state.getFoodsIsLoading = false
        state.getFoodsEnd = true
        state.getFoodsError = false
        state.getFoodsSuccess = true
        state.foodsGroupedByType = [...action.payload.foodsGroupedByType]
        const foodsRequestData: typeof action.payload.foodsGroupedByType[0]['foods'] = []
        action.payload.foodsGroupedByType.forEach(({ foods: foodsData }) => {
          foodsRequestData.push(...foodsData)
        })
        state.foods = [...foodsRequestData]
      }
    )

    // Create food
    builder.addCase(
      createFoodThunk.pending,
      (state) => {
        state.postFoodsError = false
        state.postFoodsEnd = false
        state.postFoodsIsLoading = true
        state.postFoodsSuccess = false
      }
    )
    builder.addCase(
      createFoodThunk.rejected,
      (state) => {
        state.postFoodsError = true
        state.postFoodsEnd = true
        state.postFoodsIsLoading = false
        state.postFoodsSuccess = false
      }
    )
    builder.addCase(
      createFoodThunk.fulfilled,
      (state, action) => {
        state.postFoodsError = false
        state.postFoodsEnd = true
        state.postFoodsIsLoading = false
        state.postFoodsSuccess = true
        state.foods.push({
          food_id: action.payload.id,
          food_name: action.payload.name,
          image: action.payload.image,
          preparation_time: action.payload.preparation_time,
          score: action.payload.score as any
        })
      }
    )
    // Restart post data
    builder.addCase(
      restartPostData.fulfilled,
      (state) => {
        state.postFoodsError = false
        state.postFoodsEnd = false
        state.postFoodsIsLoading = false
        state.postFoodsSuccess = false
        // Food types
        state.postFoodTypesEnd = false
        state.postFoodTypesSuccess = false
        state.postFoodTypesError = false
        state.postFoodTypesIsLoading = false
      }
    )

    // Create food type
    builder.addCase(
      createFoodTypeThunk.pending,
      (state) => {
        state.postFoodTypesEnd = false
        state.postFoodTypesError = false
        state.postFoodTypesIsLoading = true
        state.postFoodTypesSuccess = false
      }
    )
    builder.addCase(
      createFoodTypeThunk.rejected,
      (state) => {
        state.postFoodTypesEnd = true
        state.postFoodTypesError = true
        state.postFoodTypesIsLoading = false
        state.postFoodTypesSuccess = false
      }
    )
    builder.addCase(
      createFoodTypeThunk.fulfilled,
      (state, action) => {
        state.postFoodTypesEnd = true
        state.postFoodTypesSuccess = true
        state.postFoodTypesError = false
        state.postFoodTypesIsLoading = false
        state.foodTypes = [
          ...state.foodTypes,
          {
            id: action.payload.id,
            name: action.payload.name
          }
        ]
      }
    )
  }
})

export default foodsSlice.reducer

interface TFoodState {
  foods: GetFoods[0]['foods']
  foodsGroupedByType: GetFoods
  foodTypes: GetFoodTypes
  // Foods

  // Get
  getFoodsIsLoading: boolean
  getFoodsSuccess: boolean
  getFoodsError: boolean
  getFoodsEnd: boolean
  // Post
  postFoodsIsLoading: boolean
  postFoodsSuccess: boolean
  postFoodsError: boolean
  postFoodsEnd: boolean

  // Food types

  // Get
  getFoodTypesIsLoading: boolean
  getFoodTypesSuccess: boolean
  getFoodTypesError: boolean
  getFoodTypesEnd: boolean
  // Post
  postFoodTypesIsLoading: boolean
  postFoodTypesSuccess: boolean
  postFoodTypesError: boolean
  postFoodTypesEnd: boolean
}

interface GetFoodsDataThunkReturn {
  foodsGroupedByType: TFoodState['foodsGroupedByType']
  foodTypes: TFoodState['foodTypes']
}
