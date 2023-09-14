import { type TFoodState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { UpdateFoodTypeThunk } from '../thunks'

const updateFoodTypeReducer: TReducerWBuilder<TFoodState> = (builder) => {
  builder.addCase(
    UpdateFoodTypeThunk.pending,
    (state) => {
      state.updateFoodTypesEnd = false
      state.updateFoodTypesError = false
      state.updateFoodTypesIsLoading = true
      state.updateFoodTypesSuccess = false
    }
  )
  builder.addCase(
    UpdateFoodTypeThunk.rejected,
    (state) => {
      state.updateFoodTypesEnd = true
      state.updateFoodTypesError = true
      state.updateFoodTypesIsLoading = false
      state.updateFoodTypesSuccess = false
    }
  )
  builder.addCase(
    UpdateFoodTypeThunk.fulfilled,
    (state, action) => {
      state.updateFoodTypesEnd = true
      state.updateFoodTypesError = false
      state.updateFoodTypesIsLoading = false
      state.updateFoodTypesSuccess = true

      const elementIndexIndex = Number(action.payload.elementIndex)
      const updatedFoodType = {
        id: action.payload.id,
        name: action.payload.name
      }

      state.foodTypes.splice(
        elementIndexIndex,
        1,
        updatedFoodType
      )
      const prevFoodGroupedByType = state.foodsGroupedByType[elementIndexIndex as any]

      state.foodsGroupedByType.splice(
        elementIndexIndex,
        1,
        {
          ...prevFoodGroupedByType,
          food_type_id: updatedFoodType.id,
          food_type_name: updatedFoodType.name
        }
      )
    }
  )
}

export default updateFoodTypeReducer
