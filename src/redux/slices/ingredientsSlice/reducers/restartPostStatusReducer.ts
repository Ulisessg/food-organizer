import { type TIngredientsState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { restartPostStatusThunk } from '../thunks'

const restartPostStatusReducer: TReducerWBuilder<TIngredientsState> = (builder) => {
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

export default restartPostStatusReducer
