import {
  type CreateFoodCallback,
  type CreateFoodtypeCallback,
  type GetFoodsDataThunkReturn,
  type TGetFoodsDataCallback,
  type TGetFoodsTypesDataCallback,
  type UpdateFoodCallback,
  type UpdateFoodCallbackReturn,
  type UpdateFoodTypeCallback,
  type UpdateFoodTypeCallbackReturn
} from './types'
import { type GetFoodTypes } from 'controllers/sql/foodTypes/types'
import { type GetFoods } from 'controllers/sql/foods/types'
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

// Update food type
export const UpdateFoodTypeThunk =
createAsyncThunk<UpdateFoodTypeCallbackReturn, ReturnType<UpdateFoodTypeCallback>>(
  'food_types/update',
  async (update, thunkApi) => {
    try {
      const foodTypeUpdated = await update()
      return foodTypeUpdated
    } catch {
      return thunkApi.rejectWithValue('')
    }
  }
)

export const restartUpdateFoodTypeData = createAsyncThunk(
  'foods/restart_update',
  async () => {
    await new Promise((resolve) => {
      setTimeout(
        resolve,
        3000
      )
    })
  }
)

// Update food

export const updateFoodThunk =
 createAsyncThunk<UpdateFoodCallbackReturn, ReturnType<UpdateFoodCallback>>(
   'foods/update',
   async (update, thunkApi) => {
     try {
       const updatedFood = await update()
       return updatedFood
     } catch {
       return thunkApi.rejectWithValue('')
     }
   }
 )
