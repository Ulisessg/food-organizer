import { type TPurchasePlacesState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { getPurchasePlacesThunk } from '../thunks'

const getPurchasePlacesReducer: TReducerWBuilder<TPurchasePlacesState> = (builder) => {
  builder.addCase(
    getPurchasePlacesThunk.pending,
    (state) => {
      state.dataIsLoading = true
      state.getRequestError = false
      state.getRequestEnd = false
    }
  )
  builder.addCase(
    getPurchasePlacesThunk.rejected,
    (state) => {
      state.dataIsLoading = false
      state.getRequestError = true
      state.getRequestEnd = true
    }
  )
  builder.addCase(
    getPurchasePlacesThunk.fulfilled,
    (state, action) => {
      state.dataIsLoading = false
      state.getRequestError = false
      state.getRequestEnd = true
      state.purchasePlaces = [...action.payload]
    }
  )
}

export default getPurchasePlacesReducer
