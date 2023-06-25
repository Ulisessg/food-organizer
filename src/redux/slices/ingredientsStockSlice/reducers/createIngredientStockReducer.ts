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
      const { ingredientsStored, ingredientCreated } = action.payload
      let ingredientStockCreated:
      RootState['ingredientsStock']['ingredientsStock'][0] = null as any

      ingredientsStored.forEach((ingr) => {
        if (ingr.ingredient_id === ingredientCreated.ingredient_id) {
          const ingredientSelected = {
            comment: ingredientCreated.comment,
            // eslint-disable-next-line no-undefined
            image: ingr.image ?? '',
            ingredient: ingr.ingredient_name,
            ingredient_id: ingredientCreated.ingredient_id,
            ingredient_qty: ingredientCreated.ingredient_qty,
            ingredient_stock_id: ingredientCreated.ingredient_stock_id,
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
