/* eslint-disable max-lines-per-function */
import { type TFoodState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { createFoodThunk } from '../thunks'
import safeObjectGet from 'utils/safeObjectGet'

const createFoodReducer: TReducerWBuilder<TFoodState> = (builder) => {
  builder.addCase(
    createFoodThunk.pending,
    (state) => {
      state.postFoodsError = false
      state.postFoodsEnd = false
      state.postFoodsIsLoading = true
      state.postFoodsSuccess = false
    }
  )
  builder.addCase(
    createFoodThunk.rejected,
    (state) => {
      state.postFoodsError = true
      state.postFoodsEnd = true
      state.postFoodsIsLoading = false
      state.postFoodsSuccess = false
    }
  )
  builder.addCase(
    createFoodThunk.fulfilled,
    (state, action) => {
      state.postFoodsError = false
      state.postFoodsEnd = true
      state.postFoodsIsLoading = false
      state.postFoodsSuccess = true
      state.foods.push({
        food_id: action.payload.id,
        food_name: action.payload.name,
        image: action.payload.image,
        preparation_time: action.payload.preparation_time
      })
      state.foodsGroupedByType.some((fGByType, index) => {
        if (fGByType.food_type_id === action.payload.food_type_id) {
          ((safeObjectGet(
            state.foodsGroupedByType,
            index
          )) as any).foods.push({
            food_id: action.payload.id,
            food_name: action.payload.name,
            image: action.payload.image,
            preparation_time: action.payload.preparation_time

          })
          return true
        }
        return false
      })
    }
  )
}

export default createFoodReducer
