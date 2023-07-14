/* eslint-disable max-statements */
import { type TReducerWBuilder } from 'redux/types'
import { type TUomState } from '../unitsOfMeasureSliceState'
import { getUomDataThunk } from '../thunks'

const getUomDataReducer: TReducerWBuilder<TUomState> = (builder) => {
  builder.addCase(
    getUomDataThunk.pending,
    (state) => {
      state.dataIsLoading = true
    }
  )
  builder.addCase(
    getUomDataThunk.rejected,
    (state) => {
      state.dataIsLoading = false
      state.requestEnd = true
      state.errorGettingData = true
    }
  )
  builder.addCase(
    getUomDataThunk.fulfilled,
    (state, action) => {
      state.dataIsLoading = false
      state.requestEnd = true
      state.errorGettingData = false

      const { unitsOfMeasureGroupedByType, unitsOfMeasureType } = action.payload
      state.uomGroupedByType = [...unitsOfMeasureGroupedByType]
      state.unitsOfMeasureType = [...unitsOfMeasureType]

      const uom: TUomState['uom'] = []
      unitsOfMeasureGroupedByType.forEach((unitOM) => {
        uom.push(...unitOM.uom)
      })
      state.uom = [...uom]
    }
  )
}

export default getUomDataReducer
