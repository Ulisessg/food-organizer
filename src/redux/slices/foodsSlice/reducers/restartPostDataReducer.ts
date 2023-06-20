import { type TFoodState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { restartPostData } from '../thunks'

const restartPostDataReducer: TReducerWBuilder<TFoodState> = (builder) => {
  builder.addCase(
    restartPostData.fulfilled,
    (state) => {
      state.postFoodsError = false
      state.postFoodsEnd = false
      state.postFoodsIsLoading = false
      state.postFoodsSuccess = false
      // Food types
      state.postFoodTypesEnd = false
      state.postFoodTypesSuccess = false
      state.postFoodTypesError = false
      state.postFoodTypesIsLoading = false
    }
  )
}

export default restartPostDataReducer
