/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// eslint-disable-next-line sort-imports
import {
  type CreateIngredientCallback,
  type TGetIngredientsDataCallback
} from './types'
import {
  type GetIngredients,
  type TIngr_purchase_places
} from 'controllers/sql/ingredients/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

// Get ingrediets
export const getIngredientsThunk = createAsyncThunk<GetIngredients, TGetIngredientsDataCallback>(
  'ingredients/getIngredients',
  async (getData, thunkApi) => {
    try {
      const ingredientsResponse = await getData()
      return ingredientsResponse
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

// Create ingrediet

export const createIngredientThunk = createAsyncThunk<
GetIngredients[0],
ReturnType<CreateIngredientCallback>,
{
  rejectValue: {
    createIngredientsError: boolean
    createIngredientPurchasePlacesError: boolean
  }
}
>(
  'ingredients/create',
  async (callbacks, thunkApi) => {
    const { createIngredientCallback, callbackData, createIngredientPurchasePlaces } = callbacks

    let ingredientCreated: GetIngredients[0] = null as unknown as any
    let purchasePlaces: TIngr_purchase_places = null as unknown as any

    try {
      ingredientCreated = await createIngredientCallback()
    } catch (error) {
      console.log(error)

      return thunkApi.rejectWithValue({
        createIngredientPurchasePlacesError: false,
        createIngredientsError: true
      })
    }

    // Create ingredient purchase places
    if (callbackData.purchasePlaces.length > 0) {
      try {
        purchasePlaces = await createIngredientPurchasePlaces(
          ingredientCreated.ingredient_id,
          callbackData.purchasePlaces
        )
      } catch (error) {
        return thunkApi.rejectWithValue({
          createIngredientPurchasePlacesError: true,
          createIngredientsError: false
        })
      }
      return {
        comment: ingredientCreated.comment,
        image: ingredientCreated.image,
        ingr_purchase_places: purchasePlaces,
        ingredient_id: ingredientCreated.ingredient_id,
        ingredient_name: ingredientCreated.ingredient_name,
        uom_name: ingredientCreated.uom_name
      }
    }
    return {
      comment: ingredientCreated.comment,
      image: ingredientCreated.image,
      ingr_purchase_places: [],
      ingredient_id: ingredientCreated.ingredient_id,
      ingredient_name: ingredientCreated.ingredient_name,
      uom_name: ingredientCreated.uom_name
    }
  }
)

// Restart post status

export const restartPostStatusThunk = createAsyncThunk(
  'ingredients/restart_post_status',
  async () => {
    // Restart after 3 seconds
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
