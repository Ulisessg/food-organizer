import { type CreateFoodtypeCallback } from '../../types'
import { type GetFoodTypes } from 'controllers/food_organizer_crud/sql/foodTypes/types'

const createFoodTypeElectronCallback: CreateFoodtypeCallback = (foodType) => async () => {
  const foodTypeCreated = await new Promise<GetFoodTypes[0]>((resolve, reject) => {
    try {
      const result = window.createFoodType(foodType)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
  return foodTypeCreated
}

export default createFoodTypeElectronCallback
