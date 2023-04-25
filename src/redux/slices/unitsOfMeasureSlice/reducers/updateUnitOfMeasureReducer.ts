/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type TReducerWBuilder } from 'redux/types'
import { type TUomState } from '../unitsOfMeasureSliceState'
import { updateUnitOfMeasureThunk } from '../thunks'

const updateUnitOfMeasureReducer: TReducerWBuilder<TUomState> = (builder) => {
  builder.addCase(
    updateUnitOfMeasureThunk.pending,
    (state) => {
      state.updateUomIsLoading = true
      state.updateUomEnd = false
      state.updateUomError = false
      state.updateUomSuccess = false
    }
  )

  builder.addCase(
    updateUnitOfMeasureThunk.rejected,
    (state, action) => {
      state.updateUomtIsLoading = false
      state.updateUomtEnd = true
      state.updateUomtError = true
      state.updateUomtSuccess = false
      console.error(action.payload)
    }
  )

  builder.addCase(
    updateUnitOfMeasureThunk.fulfilled,
    (state, action) => {
      state.updateUomtIsLoading = false
      state.updateUomtEnd = true
      state.updateUomtError = false
      state.updateUomtSuccess = true

      const uomt = state.uomGroupedByType
        .at(action.payload.groupingElementIndex as any) as TUomState['uomGroupedByType'][0]

      const { uomNames, uomAbbreviations } = uomt

      const uom = uomt
        .uom
        .at(action.payload.elementIndex as any) as TUomState['uomGroupedByType'][0]['uom'][0]

      uom.abbreviation = action.payload.data.abbreviation
      uom.name = action.payload.data.name

      // Update uom names
      uomNames.splice(
        action.payload.elementIndex as any,
        1,
        action.payload.data.name
      )
      uomAbbreviations.splice(
        action.payload.elementIndex as any,
        1,
        action.payload.data.abbreviation
      )
    }
  )
}

export default updateUnitOfMeasureReducer
