/* eslint-disable @typescript-eslint/naming-convention */
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
      console.log(action.payload)

      // Only 1 food created
      // eslint-disable-next-line prefer-destructuring
      const {
        food_id,
        food_name,
        image,
        preparation_time
      } = action.payload.foods[0]

      state.foods.push({
        food_id,
        food_name,
        image,
        preparation_time
      })
      state.foodsGroupedByType.some((fGByType, index) => {
        if (fGByType.food_type_id === action.payload.food_type_id) {
          ((safeObjectGet(
            state.foodsGroupedByType,
            index
          )) as any).foods.push({
            food_id,
            food_name,
            image,
            preparation_time
          })
          return true
        }
        return false
      })
    }
  )
}

export default createFoodReducer
