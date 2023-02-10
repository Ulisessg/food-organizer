/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
import {
  type CreateIngredientStock,
  type GetIngredientStock
} from 'controllers/food_organizer_crud/ingredientStockCRUD'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type RootState } from 'redux/store'
import axios from 'axios'
import { type ingredient_stock } from '@prisma/client'
import { type response } from 'controllers/response'
import transformPostData from 'utils/transformPostData'

const initialState: IngredientsStockState = {
  getRequestEnd: false,
  getRequestError: false,
  getRequestIsLoading: false,
  getRequestSuccess: false,
  ingredientsStock: [],
  postRequestEnd: false,
  postRequestError: false,
  postRequestIsLoading: false,
  postRequestSuccess: false
}

/**
 * Thunks
 */

export const getIngredientsStockThunk = createAsyncThunk<GetIngredientStock, number | null>(
  'ingredients_stock/get_data',
  async (_limit, thunkApi) => {
    const requestResponse = await axios.get<response<GetIngredientStock>>('/api/ingredientstock')
    if (requestResponse.data.error) {
      return thunkApi.rejectWithValue('Ocurrió un error oteniendo los ingredientes disponibles')
    }
    return requestResponse.data.data as GetIngredientStock
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
      ingredientCreated: requestResponse.data.data as ingredient_stock,
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

/**
 * Slice
 */
const ingredientsStockSlice = createSlice({
  initialState,
  name: 'ingredients_stock',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    // Get ingredient stock
    builder.addCase(
      getIngredientsStockThunk.pending,
      (state) => {
        state.getRequestEnd = false
        state.getRequestError = false
        state.getRequestIsLoading = true
        state.getRequestSuccess = false
      }
    )
    builder.addCase(
      getIngredientsStockThunk.rejected,
      (state) => {
        state.getRequestEnd = true
        state.getRequestError = true
        state.getRequestIsLoading = false
        state.getRequestSuccess = false
      }
    )
    builder.addCase(
      getIngredientsStockThunk.fulfilled,
      (state, action) => {
        state.getRequestEnd = true
        state.getRequestError = false
        state.getRequestIsLoading = false
        state.getRequestSuccess = true
        state.ingredientsStock = [...action.payload]
      }
    )
    // Create ingredient stock
    builder.addCase(
      createIngredientStockThunk.pending,
      (state) => {
        state.postRequestEnd = false
        state.postRequestError = false
        state.postRequestIsLoading = true
        state.postRequestSuccess = false
      }
    )
    builder.addCase(
      createIngredientStockThunk.rejected,
      (state) => {
        state.postRequestEnd = true
        state.postRequestError = true
        state.postRequestIsLoading = false
        state.postRequestSuccess = false
      }
    )
    builder.addCase(
      createIngredientStockThunk.fulfilled,
      (state, action) => {
        state.postRequestEnd = true
        state.postRequestError = false
        state.postRequestIsLoading = false
        state.postRequestSuccess = true
        let ingredientStockCreated:
        RootState['ingredientsStock']['ingredientsStock'][0] | null = null
        action.payload.ingredientsList
          .forEach((ingr) => {
            const ingredientPots = action.payload.ingredientCreated
            if (ingr.ingredient_id === ingredientPots.ingredient_id) {
              const ingredientSelected = {
                comment: ingredientPots.comment,
                // eslint-disable-next-line no-undefined
                image: ingr.image ?? undefined,
                ingredient: ingr.ingredient_name,
                ingredient_id: ingredientPots.ingredient_id,
                ingredient_qty: ingredientPots.ingredient_qty,
                ingredient_stock_id: ingredientPots.id,
                uom: ingr.uom_name
              }
              ingredientStockCreated = ingredientSelected as any
            }
          })
        state.ingredientsStock.push(ingredientStockCreated as any)
      }
    )
    builder.addCase(
      restartPostStatusThunk.fulfilled,
      (state) => {
        state.postRequestEnd = false
        state.postRequestError = false
        state.postRequestIsLoading = false
        state.postRequestSuccess = false
      }
    )
  }
})

export default ingredientsStockSlice.reducer

interface IngredientsStockState {
  ingredientsStock: GetIngredientStock
  // Get
  getRequestIsLoading: boolean
  getRequestError: boolean
  getRequestSuccess: boolean
  getRequestEnd: boolean
  // Create
  postRequestIsLoading: boolean
  postRequestEnd: boolean
  postRequestSuccess: boolean
  postRequestError: boolean
}
