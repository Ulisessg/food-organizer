import {
  type CreateIngredientStockCallback,
  type TGetIngredientsStockCallback
} from './types'
import { type RootState, store } from 'redux/store'
import {
  type GetIngredientStock
} from 'controllers/food_organizer_crud/sql/ingredientStock/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getIngredientsStockThunk =
 createAsyncThunk<GetIngredientStock, TGetIngredientsStockCallback>(
   'ingredients_stock/get_data',
   async (getData, thunkApi) => {
     try {
       const requestResponse = await getData()
       return requestResponse
     } catch (error) {
       return thunkApi.rejectWithValue('Ocurrió un error oteniendo los ingredientes disponibles')
     }
   }
 )

export const createIngredientStockThunk =
 createAsyncThunk<{
   ingredientCreated: GetIngredientStock[0]
   ingredientsStored: RootState['ingredients']['ingredients']
 }, ReturnType<CreateIngredientStockCallback>>(
   'ingredients_stock/create',
   async (createIngredient, thunkApi) => {
     try {
       const ingredientCreated = await createIngredient()
       const ingredientsStored = store.getState().ingredients.ingredients
       return {
         ingredientCreated,
         ingredientsStored
       }
     } catch (error) {
       return thunkApi.rejectWithValue('Ocurrió un errro creando el ingrediente disponible')
     }
   }
 )

export const restartPostStatusThunk = createAsyncThunk(
  'ingredients_stock/restart_post_status',
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
