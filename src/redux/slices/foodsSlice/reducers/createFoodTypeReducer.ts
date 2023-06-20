import { type TFoodState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { createFoodTypeThunk } from '../thunks'

const createFoodTypeReducer: TReducerWBuilder<TFoodState> = (builder) => {
  builder.addCase(
    createFoodTypeThunk.pending,
    (state) => {
      state.postFoodTypesEnd = false
      state.postFoodTypesError = false
      state.postFoodTypesIsLoading = true
      state.postFoodTypesSuccess = false
    }
  )
  builder.addCase(
    createFoodTypeThunk.rejected,
    (state) => {
      state.postFoodTypesEnd = true
      state.postFoodTypesError = true
      state.postFoodTypesIsLoading = false
      state.postFoodTypesSuccess = false
    }
  )
  builder.addCase(
    createFoodTypeThunk.fulfilled,
    (state, action) => {
      state.postFoodTypesEnd = true
      state.postFoodTypesSuccess = true
      state.postFoodTypesError = false
      state.postFoodTypesIsLoading = false
      state.foodTypes = [
        ...state.foodTypes,
        {
          id: action.payload.id,
          name: action.payload.name
        }
      ]
    }
  )
}
export default createFoodTypeReducer
