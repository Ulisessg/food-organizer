/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
import {
  type CreateIngredient,
  type CreateIngredientReturn
} from 'controllers/food_organizer_crud/sql/ingredients/createIngredientsSql'
import {
  type GetIngredients,
  type TIngr_purchase_places
} from 'controllers/food_organizer_crud/sql/ingredients/getIngredientsSql'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  type CreateIngredientPurchasePlace
} from
  'controllers/food_organizer_crud/sql/ingredientPurchasePlaces/createIngredientPurchasePlacesSql'
import { type RootState } from 'redux/store'
import axios from 'axios'
import dayjs from 'dayjs'
import { type response } from 'controllers/response'

const initialState: TIngredientsState = {
  getIngredientsEnd: false,
  getIngredientsError: false,
  getIngredientsSuccess: false,
  getIsLoading: false,
  ingredients: [],
  postEnd: false,
  postError: false,
  postIngredientPurchaseEnd: false,
  postIngredientPurchaseError: false,
  postIngredientPurchaseIsLoading: false,
  postIngredientPurchaseSuccess: false,
  postIsLoading: false,
  postSuccess: false
}

/** Thunks */
// Get ingrediets
export const getIngredientsThunk = createAsyncThunk<GetIngredients, number | null>(
  'ingredients/getIngredients',
  async (_limit, thunkApi) => {
    // Add limit results param
    const ingredientsResponse = await axios.get<response<GetIngredients>>('/api/ingredient')
    if (ingredientsResponse.data.error) {
      thunkApi.rejectWithValue(true)
    }
    return ingredientsResponse.data.data
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

/**
 * Slice
 */

const ingredientsSlice = createSlice({
  initialState,
  name: 'ingredients',
  reducers: {
  },
  // eslint-disable-next-line sort-keys, max-lines-per-function
  extraReducers: (builder) => {
    // Get ingredients
    builder.addCase(
      getIngredientsThunk.pending,
      (state) => {
        state.getIsLoading = true
        state.getIngredientsError = false
        state.getIngredientsEnd = false
        state.getIngredientsSuccess = false
      }
    )
    builder.addCase(
      getIngredientsThunk.rejected,
      (state) => {
        state.getIngredientsError = true
        state.getIngredientsEnd = true
        state.getIsLoading = false
        state.getIngredientsSuccess = false
      }
    )
    builder.addCase(
      getIngredientsThunk.fulfilled,
      (state, action) => {
        state.getIngredientsError = false
        state.getIsLoading = false
        state.getIngredientsEnd = true
        state.getIngredientsSuccess = true
        state.ingredients = [...action.payload]
      }
    )

    // Create ingredient

    builder.addCase(
      createIngredientThunk.pending,
      (state) => {
        state.postIsLoading = true
        state.postEnd = false
        state.postError = false
        state.postSuccess = false
      }
    )
    builder.addCase(
      createIngredientThunk.rejected,
      (state, action) => {
        // Ingredient creation fails
        if (action.payload?.createIngredientsError === true) {
          state.postIsLoading = false
          state.postEnd = true
          state.postError = true
          state.postSuccess = false
        }
        // Ingredient purchase places creation failed
        if (action.payload?.createIngredientPurchasePlacesError === true) {
          state.postIngredientPurchaseError = true
          state.postIngredientPurchaseEnd = true
          state.postIngredientPurchaseIsLoading = false
          state.postIngredientPurchaseSuccess = false
        }
      }
    )
    builder.addCase(
      createIngredientThunk.fulfilled,
      (state, action) => {
        state.postIsLoading = false
        state.postError = false
        state.postEnd = true
        state.postSuccess = true
        state.postIngredientPurchaseEnd = true
        state.postIngredientPurchaseError = false
        state.postIngredientPurchaseIsLoading = false
        state.postIngredientPurchaseSuccess = true

        const { payload } = action

        state.ingredients = [
          ...state.ingredients,
          {
            comment: payload.comment as any,
            image: payload.image as any,
            ingr_purchase_places: payload.ingr_purchase_places,
            ingredient_id: payload.ingredient_id,
            ingredient_name: payload.ingredient_name,
            uom_name: payload.uom_name
          }
        ]
      }
    )
    // Restart post status
    builder.addCase(
      restartPostStatusThunk.fulfilled,
      (state) => {
      // Restart post data
        state.postEnd = false
        state.postError = false
        state.postSuccess = false

        state.postIngredientPurchaseEnd = false
        state.postIngredientPurchaseError = false
        state.postIngredientPurchaseIsLoading = false
        state.postIngredientPurchaseSuccess = false
      }
    )
  }
})

/** Reducer */
export default ingredientsSlice.reducer

interface CreateIngredientThunkParam {
  ingredient: CreateIngredient
  purchasePlacesSelected: string[]
  purchasePlaces: RootState['purchasePlaces']['purchasePlaces']
}

interface TIngredientsState {
  ingredients: GetIngredients

  /** Get ingredient request init */
  getIsLoading: boolean

  /** Get ingredient request have an error */
  getIngredientsError: boolean

  /** Get ingredient request ends */
  getIngredientsEnd: boolean

  /** Get ingredient request ends successfully */
  getIngredientsSuccess: boolean

  /** Ingredient creation request init */
  postIsLoading: boolean

  /** Ingredient creation request ends */
  postEnd: boolean

  /** Ingredient creation request have an error */
  postError: boolean

  /** Ingredient creation request ends successfull */
  postSuccess: boolean

  /** Ingredient purchase places creation init */
  postIngredientPurchaseIsLoading: boolean

  /** Ingredient purchase places creation ends */
  postIngredientPurchaseEnd: boolean

  /** Ingredient purchase places creation error */
  postIngredientPurchaseError: boolean

  /** Ingredient purchase places creation ends successfull */
  postIngredientPurchaseSuccess: boolean
}
