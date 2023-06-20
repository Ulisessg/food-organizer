import { type TGetFoodsDataCallback, type TGetFoodsTypesDataCallback } from '../../types'
import { type GetFoodTypes } from 'controllers/food_organizer_crud/sql/foodTypes/types'
import { type GetFoods } from 'controllers/food_organizer_crud/nextjs/foodsCRUD'

const getFoodsDataElectronCallback: TGetFoodsDataCallback = async () => {
  const data = await new Promise<GetFoods>((resolve, reject) => {
    try {
      const result = window.getFoodsData()
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
  return data
}

const getFoodTypesDataElectronCallback: TGetFoodsTypesDataCallback = async () => {
  const data = await new Promise<GetFoodTypes>((resolve, reject) => {
    try {
      const result = window.getFoodTypesData()
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
  return data
}

const callbacks = {
  getFoodTypesData: getFoodTypesDataElectronCallback,
  getFoodsData: getFoodsDataElectronCallback
}

export default callbacks
