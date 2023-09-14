import { type SingleFoodType, type UpdateFoodTypeCallback } from '../../types'

const updateFoodTypeElectronCallback:
UpdateFoodTypeCallback = (foodType, elementIndex) => async () => {
  const foodTypeUpdated = await new Promise<SingleFoodType>((resolve, reject) => {
    try {
      const updateResult = window.updateFoodTypes(foodType)
      resolve(updateResult)
    } catch (error) {
      reject(error)
    }
  })
  return {
    ...foodTypeUpdated,
    elementIndex
  }
}

export default updateFoodTypeElectronCallback
