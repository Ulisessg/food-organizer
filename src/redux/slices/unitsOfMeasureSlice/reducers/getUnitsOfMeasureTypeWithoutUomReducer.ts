/* eslint-disable @typescript-eslint/naming-convention */
import { type TReducerWBuilder } from 'redux/types'
import { type TUomState } from '../unitsOfMeasureSliceState'
import getUnitsOfMeasureTypeWithoutUomAction from '../actions/getUnitsOfMeasureTypeWithoutUomAction'

/**
 * Get the units of measure types with no units of measure related
 */
const getUnitsOfMeasureTypeWithoutUomReducer: TReducerWBuilder<TUomState> = (builder) => {
  builder.addCase(
    getUnitsOfMeasureTypeWithoutUomAction,
    (state) => {
      const uomt = state.unitsOfMeasureType
      const uomtWithUom = state.uomGroupedByType

      uomt.forEach((unitOfMeasureType) => {
        const haveUomRelated =
         uomtWithUom.some(({ uomt_name }) => uomt_name === unitOfMeasureType.name)
        if (!haveUomRelated) {
          state.uomGroupedByType = [
            ...state.uomGroupedByType,
            {
              uom: [
                {
                  abbreviation: '',
                  id: '' as unknown as any,
                  name: ''
                }
              ],
              uomt_id: unitOfMeasureType.id,
              uomt_name: unitOfMeasureType.name
            }
          ]
        }
      })
    }
  )
}

export default getUnitsOfMeasureTypeWithoutUomReducer
