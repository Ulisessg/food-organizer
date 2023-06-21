import { type TMenuState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { restartPostMenuThunk } from '../thunks'

const restartPostDataReducer: TReducerWBuilder<TMenuState> = (builder) => {
  builder.addCase(
    restartPostMenuThunk.fulfilled,
    (state) => {
      state.createMenuIsLoading = false
      state.createMenuEnd = false
      state.createMenuError = false
      state.createMenuSuccess = false
    }
  )
}

export default restartPostDataReducer
