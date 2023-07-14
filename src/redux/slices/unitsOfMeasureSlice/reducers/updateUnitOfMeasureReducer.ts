/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import {
  restartUpdateUnitsOfMeasureStatusThunk,
  updateUnitOfMeasureThunk
} from '../thunks'
import { type TReducerWBuilder } from 'redux/types'
import { type TUomState } from '../unitsOfMeasureSliceState'

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
    (state) => {
      state.updateUomIsLoading = false
      state.updateUomEnd = true
      state.updateUomError = true
      state.updateUomSuccess = false
    }
  )

  builder.addCase(
    updateUnitOfMeasureThunk.fulfilled,
    (state, action) => {
      state.updateUomIsLoading = false
      state.updateUomEnd = true
      state.updateUomError = false
      state.updateUomSuccess = true
      const {
        isUomtIdChanged,
        data,

        /**
         * Even if the unit of measure type changes,
         * the groupingElementIndex & elementIndex references prev one
         */
        elementIndex,
        groupingElementIndex
      } = action.payload

      const unitOfMeasureType = state.uomGroupedByType
        .at(groupingElementIndex as number) as TUomState['uomGroupedByType'][0]

      if (isUomtIdChanged) {
        const newUnitOfMeasureType = state
          .uomGroupedByType
          .find(({ uomt_id }) => uomt_id === data.uomt_id) as TUomState['uomGroupedByType'][0]

        // Remove unit of measure from prev unit of measure type
        unitOfMeasureType.uom.splice(
          elementIndex as number,
          1
        )
        // Add into new unit of measure type
        newUnitOfMeasureType.uom.push({
          ...data
        })
      } else {
        const { uom } = unitOfMeasureType
        const uomChanged = uom
          .at(elementIndex as number) as TUomState['uomGroupedByType'][0]['uom'][0]

        uomChanged.abbreviation = data.abbreviation
        uomChanged.name = data.name
      }
    }
  )

  // Restart post status
  builder.addCase(
    restartUpdateUnitsOfMeasureStatusThunk.fulfilled,
    (state) => {
      state.updateUomIsLoading = false
      state.updateUomEnd = false
      state.updateUomError = false
      state.updateUomSuccess = false
    }
  )
}

export default updateUnitOfMeasureReducer
