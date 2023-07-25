import { type CreatePurchasePlacesCallback } from '../../types'
import { type GetPurchasePlaces } from 'controllers/sql/purchasePlaces/types'

const createPurchasePlacesElectronCallback: CreatePurchasePlacesCallback =
(purchasePlace) => async () => {
  const purchasePlaceCreated = await new Promise<GetPurchasePlaces[0]>((resolve, reject) => {
    try {
      const purchasePlaceCreatedData = window.createPurchasePlaces(purchasePlace)
      resolve(purchasePlaceCreatedData)
    } catch (error) {
      reject(error)
    }
  })
  return purchasePlaceCreated
}

export default createPurchasePlacesElectronCallback
