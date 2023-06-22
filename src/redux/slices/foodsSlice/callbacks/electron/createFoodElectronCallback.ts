import { type CreateFoodCallback } from '../../types'
import { type GetFoods } from 'controllers/food_organizer_crud/nextjs/foodsCRUD'

const createFoodelectronCallback: CreateFoodCallback = (food) => async () => {
  const foodCreated = await new Promise<GetFoods[0]>((resolve, reject) => {
    try {
      const result = window.createFoods(food)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
  return foodCreated
}

export default createFoodelectronCallback
