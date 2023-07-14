/* eslint-disable max-lines-per-function */
import {
  restartUpdateUnitOfMeasureTypeStatusThunk,
  updateUomtThunk
} from '../thunks'
import { type TReducerWBuilder } from 'redux/types'
import { type TUomState } from '../unitsOfMeasureSliceState'
import safeArrayGet from 'utils/safeArrayGet'

const updateUnitOfMeasureTypeReducer: TReducerWBuilder<TUomState> = (builder) => {
  builder.addCase(
    updateUomtThunk.pending,
    (state) => {
      state.updateUomtIsLoading = true
      state.updateUomtEnd = false
      state.updateUomtError = false
      state.updateUomtSuccess = false
    }
  )

  builder.addCase(
    updateUomtThunk.rejected,
    (state) => {
      state.updateUomtIsLoading = false
      state.updateUomtEnd = true
      state.updateUomtError = true
      state.updateUomtSuccess = false
    }
  )

  builder.addCase(
    updateUomtThunk.fulfilled,
    (state, action) => {
      state.updateUomtIsLoading = false
      state.updateUomtEnd = true
      state.updateUomtError = false
      state.updateUomtSuccess = true

      state.unitsOfMeasureType[Number(action.payload.groupingElementIndex)].name =
        action.payload.data.name

      safeArrayGet(
        state.uomGroupedByType,
        action.payload.groupingElementIndex
      ).uomt_name = action.payload.data.name
    }
  )

  // Restart update status
  builder.addCase(
    restartUpdateUnitOfMeasureTypeStatusThunk.fulfilled,
    (state) => {
      state.updateUomtIsLoading = false
      state.updateUomtEnd = false
      state.updateUomtError = false
      state.updateUomtSuccess = false
    }
  )
}

export default updateUnitOfMeasureTypeReducer
