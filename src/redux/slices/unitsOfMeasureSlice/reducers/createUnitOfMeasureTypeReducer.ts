import {
  createUnitOfMeasureTypeThunk,
  restartCreateUomtPostStatusThunk
} from '../thunks'
import { type TReducerWBuilder } from 'redux/types'
import { type TUomState } from '../unitsOfMeasureSliceState'

const createUnitOfMeasureTypeReducer: TReducerWBuilder<TUomState> = (builder) => {
  builder.addCase(
    createUnitOfMeasureTypeThunk.pending,
    (state) => {
      state.postUomtIsLoading = true
      state.postUomtEnd = false
      state.postUomtError = false
      state.postUomtSuccess = false
    }
  )
  builder.addCase(
    createUnitOfMeasureTypeThunk.rejected,
    (state) => {
      state.postUomtError = true
      state.postUomtEnd = true
      state.postUomtIsLoading = false
      state.postUomtSuccess = false
    }
  )
  builder.addCase(
    createUnitOfMeasureTypeThunk.fulfilled,
    (state, action) => {
      state.postUomtError = false
      state.postUomtEnd = true
      state.postUomtIsLoading = false
      state.postUomtSuccess = true
      state.unitsOfMeasureType.push({
        id: action.payload.id,
        name: action.payload.name
      })
    }
  )

  // Restart post data
  builder.addCase(
    restartCreateUomtPostStatusThunk.fulfilled,
    (state) => {
      state.postUomtEnd = false
      state.postUomtIsLoading = false
      state.postUomtError = false
      state.postUomtSuccess = false
    }
  )
}

export default createUnitOfMeasureTypeReducer
