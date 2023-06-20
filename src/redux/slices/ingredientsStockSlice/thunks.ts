import {
  type CreateIngredientStock
} from 'controllers/food_organizer_crud/sql/ingredientStock/createIngredientStockSql'
import {
  type GetIngredientStock
} from 'controllers/food_organizer_crud/sql/ingredientStock/types'
import { type RootState } from 'redux/store'
import { type TGetIngredientsStockCallback } from './types'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ingredient_stock } from '@prisma/client'
import { type response } from 'controllers/response'
import transformPostData from 'utils/transformPostData'

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

export const createIngredientStockThunk = createAsyncThunk<{
  ingredientCreated: ingredient_stock
  ingredientsList: RootState['ingredients']['ingredients']
}, {
  ingredientData: CreateIngredientStock
  ingredientList: RootState['ingredients']['ingredients']
}>(
  'ingredients_stock/create',
  async (ingredientStock, thunkApi) => {
    const ingredientStockData:
    CreateIngredientStock = transformPostData(ingredientStock.ingredientData)
    const requestResponse = await axios.post<response<ingredient_stock>>(
      '/api/ingredientstock',
      ingredientStockData
    )
    if (requestResponse.data.error) {
      return thunkApi.rejectWithValue('Ocurrió un errro creando el ingrediente disponible')
    }
    const returnedData = {
      ingredientCreated: requestResponse.data.data,
      ingredientsList: ingredientStock.ingredientList
    }

    return returnedData
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
