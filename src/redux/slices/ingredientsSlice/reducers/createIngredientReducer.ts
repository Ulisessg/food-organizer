/* eslint-disable max-lines-per-function */
import { type TIngredientsState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { createIngredientThunk } from '../thunks'

const createIngredientReducer: TReducerWBuilder<TIngredientsState> = (builder) => {
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
          comment: payload.comment,
          image: payload.image,
          ingr_purchase_places: payload.ingr_purchase_places,
          ingredient_id: payload.ingredient_id,
          ingredient_name: payload.ingredient_name,
          uom_id: payload.uom_id,
          uom_name: payload.uom_name
        }
      ]
    }
  )
}

export default createIngredientReducer
