import { type TIngredientsState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { updateIngredientThunk } from '../thunks'

const updateIngredientReducer: TReducerWBuilder<TIngredientsState> = (builder) => {
  builder.addCase(
    updateIngredientThunk.pending,
    (state) => {
      state.updateIngredientIsLoading = true
      state.updateIngredientEnd = false
      state.updateIngredientError = false
      state.updateIngredientSuccess = false
    }
  )
  builder.addCase(
    updateIngredientThunk.fulfilled,
    (state, action) => {
      state.updateIngredientIsLoading = false
      state.updateIngredientEnd = true
      state.updateIngredientError = false
      state.updateIngredientSuccess = true

      const { elementIndex, ...ingredientUpdated } = action.payload

      state.ingredients.splice(
        elementIndex,
        1,
        {
          ...ingredientUpdated
        }
      )
    }
  )
  builder.addCase(
    updateIngredientThunk.rejected,
    (state) => {
      state.updateIngredientIsLoading = false
      state.updateIngredientEnd = true
      state.updateIngredientError = true
      state.updateIngredientSuccess = false
    }
  )
}

export default updateIngredientReducer
