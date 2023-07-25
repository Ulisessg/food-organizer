import {
  type CreatePurchasePlace,
  type GetPurchasePlaces
} from 'controllers/sql/purchasePlaces/types'

export interface TPurchasePlacesState {
  // Get data
  dataIsLoading: boolean
  getRequestError: boolean
  getRequestEnd: boolean
  purchasePlaces: GetPurchasePlaces
  // Create purchase place
  postPPIsLoading: boolean
  postPPError: boolean
  postPPEnd: boolean
  postPPSuccess: boolean
}

export type GetPurchasePlacesDataCallback = () => Promise<GetPurchasePlaces>
export type CreatePurchasePlacesCallback =
(purchasePlace: CreatePurchasePlace) => () => Promise<GetPurchasePlaces[0]>
