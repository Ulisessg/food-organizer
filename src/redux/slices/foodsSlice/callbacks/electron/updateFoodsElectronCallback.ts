import { type UpdateFoodCallback } from '../../types'
import { type UpdateFoods } from 'controllers/sql/foods/types'

const updateFoodsElectronCallback: UpdateFoodCallback =
(food, groupingElementIndex, elementIndex) => async () => {
  const updatedFood = await new Promise<UpdateFoods>((resolve, reject) => {
    try {
      const updateFoodResult = window.updateFoods(food)
      resolve(updateFoodResult)
    } catch (error) {
      reject(error)
    }
  })

  return {
    ...updatedFood,
    elementIndex,
    groupingElementIndex
  }
}

export default updateFoodsElectronCallback
