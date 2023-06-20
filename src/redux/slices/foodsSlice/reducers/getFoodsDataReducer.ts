/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type TFoodState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { getFoodsDataThunk } from '../thunks'

const getFoodsDataReducer: TReducerWBuilder<TFoodState> = (builder) => {
  // Get data
  builder.addCase(
    getFoodsDataThunk.pending,
    (state) => {
    // Food types
      state.getFoodTypesIsLoading = true
      state.getFoodTypesEnd = false
      state.getFoodTypesError = false
      state.getFoodTypesSuccess = false

      // Foods
      state.getFoodsIsLoading = true
      state.getFoodsEnd = false
      state.getFoodsError = false
      state.getFoodsSuccess = false
    }
  )
  builder.addCase(
    getFoodsDataThunk.rejected,
    (state, action) => {
      if (action.payload?.foodTypesError === true) {
        state.getFoodTypesIsLoading = false
        state.getFoodTypesEnd = true
        state.getFoodTypesError = true
        state.getFoodTypesSuccess = false
      }
      if (action.payload?.foodsError === true) {
        state.getFoodsIsLoading = false
        state.getFoodsEnd = true
        state.getFoodsError = true
        state.getFoodsSuccess = false
      }
    }
  )
  builder.addCase(
    getFoodsDataThunk.fulfilled,
    (state, action) => {
    // Food types
      state.getFoodTypesIsLoading = false
      state.getFoodTypesEnd = true
      state.getFoodTypesSuccess = true
      state.getFoodTypesError = false
      state.foodTypes = [...action.payload.foodTypes]

      // Foods
      state.getFoodsIsLoading = false
      state.getFoodsEnd = true
      state.getFoodsError = false
      state.getFoodsSuccess = true
      state.foodsGroupedByType = [...action.payload.foodsGroupedByType]
      const foodsRequestData: typeof action.payload.foodsGroupedByType[0]['foods'] = []
      action.payload.foodsGroupedByType.forEach(({ foods: foodsData }) => {
        foodsRequestData.push(...foodsData)
      })
      state.foods = [...foodsRequestData]
    }
  )
}

export default getFoodsDataReducer
