import { type IngredientsStockState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { getIngredientsStockThunk } from '../thunks'

const getIngredientsStockReducer: TReducerWBuilder<IngredientsStockState> = (builder) => {
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
}

export default getIngredientsStockReducer
