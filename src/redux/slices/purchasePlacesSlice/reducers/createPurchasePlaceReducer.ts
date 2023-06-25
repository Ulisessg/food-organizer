import { type TPurchasePlacesState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { createPurchasePlaceThunk } from '../thunks'

const createPurchasePlaceReducer: TReducerWBuilder<TPurchasePlacesState> = (builder) => {
  builder.addCase(
    createPurchasePlaceThunk.pending,
    (state) => {
      state.postPPEnd = false
      state.postPPError = false
      state.postPPIsLoading = true
      state.postPPSuccess = false
    }
  )
  builder.addCase(
    createPurchasePlaceThunk.rejected,
    (state) => {
      state.postPPEnd = true
      state.postPPError = true
      state.postPPIsLoading = false
      state.postPPSuccess = false
    }
  )
  builder.addCase(
    createPurchasePlaceThunk.fulfilled,
    (state, action) => {
      state.postPPEnd = true
      state.postPPError = false
      state.postPPIsLoading = false
      state.postPPSuccess = true
      state.purchasePlaces = [
        ...state.purchasePlaces,
        {
          address: action.payload.address,
          id: action.payload.id,
          name: action.payload.name
        }
      ]
    }
  )
}

export default createPurchasePlaceReducer
