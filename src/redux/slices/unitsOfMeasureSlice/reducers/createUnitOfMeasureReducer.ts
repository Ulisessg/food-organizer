import {
  createUnitOfMeasureThunk,
  restartCreateUomPostStatusThunk
} from '../thunks'
import { type ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { type TUomState } from '../unitsOfMeasureSliceState'
import insertUnitOfMeasure from 'utils/insertUnitOfMeasure'

const createUnitOfMeasureReducer = (builder: ActionReducerMapBuilder<TUomState>): void => {
  builder.addCase(
    createUnitOfMeasureThunk.pending,
    (state) => {
      state.postUomIsLoading = true
      state.postUomEnd = false
      state.postUomSuccess = false
    }
  )
  builder.addCase(
    createUnitOfMeasureThunk.rejected,
    (state) => {
      state.postUomIsLoading = false
      state.postUomEnd = true
      state.postUomError = true
      state.postUomSuccess = false
    }
  )
  builder.addCase(
    createUnitOfMeasureThunk.fulfilled,
    (state, action) => {
      state.postUomEnd = true
      state.postUomIsLoading = false
      state.postUomError = false
      state.postUomSuccess = true
      state.uom = [
        ...state.uom,
        action.payload
      ]
      state.uomGroupedByType = [
        ...insertUnitOfMeasure(
          state.uomGroupedByType,
          action.payload,
          state.unitsOfMeasureType
        )
      ]
    }
  )

  // Restart data
  builder.addCase(
    restartCreateUomPostStatusThunk.fulfilled,
    (state) => {
      state.postUomEnd = false
      state.postUomError = false
      state.postUomIsLoading = false
      state.postUomSuccess = false
    }
  )
}

export default createUnitOfMeasureReducer
