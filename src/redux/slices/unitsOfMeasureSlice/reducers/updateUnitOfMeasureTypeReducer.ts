/* eslint-disable max-lines-per-function */
import { type TReducerWBuilder } from 'redux/types'
import { type TUomState } from '../unitsOfMeasureSliceState'
import safeArrayGet from 'utils/safeArrayGet'
import { updateUomtThunk } from '../thunks'

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

      const unitsOfmeasureType: typeof state.unitsOfMeasureType = []

      state.unitsOfMeasureType.some((unitOfMeasureType) => {
        if (unitOfMeasureType.id === action.payload.data.id) {
          unitsOfmeasureType.push({
            ...unitOfMeasureType,
            name: action.payload.data.name
          })
          return true
        }
        unitsOfmeasureType.push(unitOfMeasureType)
        return false
      })

      state.unitsOfMeasureType = [...unitsOfmeasureType]
      safeArrayGet(
        state.uomGroupedByType,
        action.payload.elementIndex as unknown as number
      ).uomt_name = action.payload.data.name
    }
  )
}

export default updateUnitOfMeasureTypeReducer
