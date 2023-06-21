import { type TPurchasePlacesState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { restartPurchasePlacePostStateThunk } from '../thunks'

const restartPostDataReducer: TReducerWBuilder<TPurchasePlacesState> = (builder) => {
  builder.addCase(
    restartPurchasePlacePostStateThunk.fulfilled,
    (state) => {
      state.postPPEnd = false
      state.postPPError = false
      state.postPPIsLoading = false
      state.postPPSuccess = false
    }
  )
}

export default restartPostDataReducer
