import { type IngredientsStockState } from '../types'
import { type RootState } from 'redux/store'
import { type TReducerWBuilder } from 'redux/types'
import { createIngredientStockThunk } from '../thunks'

const createIngredientStockReducer: TReducerWBuilder<IngredientsStockState> = (builder) => {
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
      RootState['ingredientsStock']['ingredientsStock'][0] = null as any
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
      state.ingredientsStock.push(ingredientStockCreated)
    }
  )
}

export default createIngredientStockReducer
