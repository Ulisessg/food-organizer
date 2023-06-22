import {
  type CreateFoodCallback,
  type CreateFoodtypeCallback,
  type GetFoodsDataThunkReturn,
  type TGetFoodsDataCallback,
  type TGetFoodsTypesDataCallback
} from './types'
import { type GetFoodTypes } from 'controllers/food_organizer_crud/sql/foodTypes/types'
import { type GetFoods } from 'controllers/food_organizer_crud/sql/foods/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  type food_types
} from '@prisma/client'

export const getFoodsDataThunk = createAsyncThunk<GetFoodsDataThunkReturn, {
  getFoodsData: TGetFoodsDataCallback
  getFoodsTypesData: TGetFoodsTypesDataCallback
},
{
  rejectValue: { foodsError: boolean, foodTypesError: boolean }
}
>(
  'foods/getData',
  async (callbacks, thunkApi) => {
    let requestFoods = null as unknown as GetFoods
    let requestFoodTypes = null as unknown as GetFoodTypes

    try {
      requestFoods = await callbacks.getFoodsData()
    } catch (error) {
      return thunkApi.rejectWithValue({
        foodTypesError: false,
        foodsError: true
      })
    }
    try {
      requestFoodTypes = await callbacks.getFoodsTypesData()
    } catch (error) {
      return thunkApi.rejectWithValue({
        foodTypesError: true,
        foodsError: false
      })
    }

    return {
      foodTypes: requestFoodTypes,
      foodsGroupedByType: requestFoods
    }
  }
)

export const createFoodThunk = createAsyncThunk<GetFoods[0], ReturnType<CreateFoodCallback>>(
  'foods/create_food',
  async (createFood, thunkApi) => {
    try {
      const createFoodResult = await createFood()
      return createFoodResult
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
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

export const createFoodTypeThunk = createAsyncThunk<food_types, ReturnType<CreateFoodtypeCallback>>(
  'food_types/create',
  async (createFoodType, thunkApi) => {
    try {
      const foodTypeCreated = await createFoodType()
      return foodTypeCreated
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
