import { type TIngredientsState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { getIngredientsThunk } from '../thunks'

const getIngredientsDataReducer: TReducerWBuilder<TIngredientsState> = (builder) => {
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
}

export default getIngredientsDataReducer
