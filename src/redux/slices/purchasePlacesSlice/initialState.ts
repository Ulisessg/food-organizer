import { type TPurchasePlacesState } from './types'

const initialState: TPurchasePlacesState = {
  dataIsLoading: false,
  getRequestEnd: false,
  getRequestError: false,
  postPPEnd: false,
  postPPError: false,
  postPPIsLoading: false,
  postPPSuccess: false,
  purchasePlaces: []
}

export default initialState
