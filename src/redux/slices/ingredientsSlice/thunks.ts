/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
// eslint-disable-next-line sort-imports
import { type CreateIngredientThunkParam, type TGetIngredientsDataCallback } from './types'
import {
  type GetIngredients,
  type TIngr_purchase_places
} from 'controllers/food_organizer_crud/sql/ingredients/types'
import {
  type CreateIngredientPurchasePlace
// eslint-disable-next-line max-len
} from 'controllers/food_organizer_crud/sql/ingredientPurchasePlaces/createIngredientPurchasePlacesSql'
import {
  type CreateIngredientReturn
} from 'controllers/food_organizer_crud/sql/ingredients/createIngredientsSql'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { type response } from 'controllers/response'

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
CreateIngredientThunkParam,
{
  rejectValue: {
    createIngredientsError: boolean
    createIngredientPurchasePlacesError: boolean
  }
}
>(
  'ingredients/create',
  async (ingredientData, thunkApi) => {
    try {
      const postIngredients = await axios.post<response<CreateIngredientReturn>>(
        '/api/ingredient',
        ingredientData.ingredient
      )
      // If ingredient creation fails reject
      if (postIngredients.data.error) {
        throw new Error('ingredient')
      }
      const ingredientCreated = postIngredients.data.data

      // eslint-disable-next-line init-declarations
      let purchasePlaces: undefined | TIngr_purchase_places
      // Insert ingredient purchase places or leve it as undefined
      if (ingredientData.purchasePlaces.length > 0) {
        // Get purchase places
        const creationDate: string = dayjs().toISOString()
        const purchasePlacesData: CreateIngredientPurchasePlace = []

        ingredientData.purchasePlacesSelected.forEach((purchasePlace) => {
          ingredientData
            .purchasePlaces.forEach((pp) => {
              if (pp.name === purchasePlace) {
                purchasePlacesData.push({
                  creation_date: creationDate,
                  ingredient_id: ((ingredientCreated).id),
                  purchase_place_id: pp.id
                })
              }
            })
        })
        const purchasePlacesPostRequest =
        await axios.post<response<TIngr_purchase_places | string>>(
          '/api/ingredientpurchase',
          purchasePlacesData
        )
        if (purchasePlacesPostRequest.data.error) {
          throw new Error('purchase')
        }
        purchasePlaces = purchasePlacesPostRequest.data.data as TIngr_purchase_places
      }

      const result: GetIngredients[0] = {
      // eslint-disable-next-line no-undefined
        comment: (ingredientCreated.comment ?? undefined),
        // eslint-disable-next-line no-undefined
        image: (ingredientCreated.image ?? undefined),
        ingr_purchase_places: purchasePlaces,
        ingredient_id: ingredientCreated.id,
        ingredient_name: ingredientCreated.name,
        uom_name: ingredientCreated.uomName
      }

      return result
    } catch (error) {
      const err = error as Error
      // Ingredient error
      if (err.message === 'ingredient') {
        return thunkApi.rejectWithValue({
          createIngredientPurchasePlacesError: false,
          createIngredientsError: true
        })
      }
      return thunkApi.rejectWithValue({
        createIngredientPurchasePlacesError: true,
        createIngredientsError: false
      })
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
