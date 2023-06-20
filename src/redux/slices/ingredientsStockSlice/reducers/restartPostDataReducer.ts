import { type IngredientsStockState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { restartPostStatusThunk } from '../thunks'

const restartPostDataReducer: TReducerWBuilder<IngredientsStockState> = (builder) => {
  builder.addCase(
    restartPostStatusThunk.fulfilled,
    (state) => {
      state.postRequestEnd = false
      state.postRequestError = false
      state.postRequestIsLoading = false
      state.postRequestSuccess = false
    }
  )
}

export default restartPostDataReducer
