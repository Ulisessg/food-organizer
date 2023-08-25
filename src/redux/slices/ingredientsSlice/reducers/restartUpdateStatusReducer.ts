import { type TIngredientsState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { restartUpdateIngredientStatus } from '../thunks'

const restartUpdateIngredientStatusReducer: TReducerWBuilder<TIngredientsState> = (builder) => {
  builder.addCase(
    restartUpdateIngredientStatus.fulfilled,
    (state) => {
      state.updateIngredientEnd = false
      state.updateIngredientError = false
      state.updateIngredientIsLoading = false
      state.updateIngredientSuccess = false
    }
  )
}

export default restartUpdateIngredientStatusReducer
