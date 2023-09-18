/* eslint-disable max-statements */
import { type TFoodState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { updateFoodThunk } from '../thunks'

const updateFoodsReducer: TReducerWBuilder<TFoodState> = (builder) => {
  builder.addCase(
    updateFoodThunk.pending,
    (state) => {
      state.updateFoodsEnd = false
      state.updateFoodsError = false
      state.updateFoodsIsLoading = true
      state.updateFoodsSuccess = false
    }
  )

  builder.addCase(
    updateFoodThunk.rejected,
    (state) => {
      state.updateFoodsEnd = true
      state.updateFoodsError = true
      state.updateFoodsIsLoading = false
      state.updateFoodsSuccess = false
    }
  )

  builder.addCase(
    updateFoodThunk.fulfilled,
    (state, action) => {
      state.updateFoodsEnd = true
      state.updateFoodsError = false
      state.updateFoodsIsLoading = false
      state.updateFoodsSuccess = true

      const {
        elementIndex,
        groupingElementIndex,
        ...foodUpdatedGropedByType
      } = action.payload

      const {
        food_type_id: newFoodTypeId,
        food_type_name: newFoodTypeName
      } = foodUpdatedGropedByType
      const [foodUpdated] = foodUpdatedGropedByType.foods

      const currentFoodType = state.foodsGroupedByType[Number(groupingElementIndex)]

      if (newFoodTypeId === currentFoodType.food_type_id) {
        // Remove from current food type
        currentFoodType.foods.splice(
          elementIndex,
          1,
          {
            food_id: foodUpdated.food_id,
            food_name: foodUpdated.food_name,
            image: foodUpdated.image,
            preparation_time: foodUpdated.preparation_time
          }
        )
        // Update list of foods
        const { foods } = state
        foods.splice(
          elementIndex,
          1,
          {
            food_id: foodUpdated.food_id,
            food_name: foodUpdated.food_name,
            image: foodUpdated.image,
            preparation_time: foodUpdated.preparation_time
          }
        )
      } else {
        // Change food into new food type
        currentFoodType.total_foods -= 1
        // Remove food
        currentFoodType.foods.splice(
          elementIndex,
          1
        )

        const newFoodTypeIndex = state.foodTypes.findIndex((ft) => ft.id === newFoodTypeId)
        const newFoodType =
          state
            .foodsGroupedByType[Number(newFoodTypeIndex)]

        // Food type with no foods
        if (typeof newFoodType === 'undefined') {
          state.foodsGroupedByType.push({
            food_type_id: newFoodTypeId,
            food_type_name: newFoodTypeName,
            foods: [
              {
                ...foodUpdated
              }
            ],
            total_foods: 1
          })
        } else {
          newFoodType.total_foods += 1
          newFoodType.foods.push({
            ...foodUpdated
          })
        }
      }
    }
  )
}

export default updateFoodsReducer
