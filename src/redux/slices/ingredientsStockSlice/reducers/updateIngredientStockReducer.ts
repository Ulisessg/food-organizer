import { type IngredientsStockState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { updateIngredientStockThunk } from '../thunks'

const UpdateIngredientStockReducer: TReducerWBuilder<IngredientsStockState> = (builder) => {
  builder.addCase(
    updateIngredientStockThunk.pending,
    (state) => {
      state.updateRequestEnd = false
      state.updateRequestError = false
      state.updateRequestIsLoading = true
      state.updateRequestSuccess = false
    }
  )
  builder.addCase(
    updateIngredientStockThunk.fulfilled,
    (state, action) => {
      state.updateRequestEnd = true
      state.updateRequestError = false
      state.updateRequestIsLoading = false
      state.updateRequestSuccess = true

      const { elementIndex, ...ingredientStockUpdated } = action.payload

      state.ingredientsStock.splice(
        elementIndex,
        1,
        ingredientStockUpdated
      )
    }
  )
  builder.addCase(
    updateIngredientStockThunk.rejected,
    (state) => {
      state.updateRequestEnd = true
      state.updateRequestError = true
      state.updateRequestIsLoading = false
      state.updateRequestSuccess = false
    }
  )
}

export default UpdateIngredientStockReducer
