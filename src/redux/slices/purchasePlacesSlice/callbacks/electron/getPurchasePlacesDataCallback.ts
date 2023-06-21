import { type GetPurchasePlaces } from 'controllers/food_organizer_crud/sql/purchasePlaces/types'
import { type GetPurchasePlacesDataCallback } from '../../types'

const getPurchasePlacesDataCallback: GetPurchasePlacesDataCallback = async () => {
  const data = await new Promise<GetPurchasePlaces>((resolve, reject) => {
    try {
      const result = window.getPurchasePlacesData()
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
  return data
}
export default getPurchasePlacesDataCallback
