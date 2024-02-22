import { type TPurchasePlacesState } from './types'
import { databaseSlicesCommonState } from '../databaseSlice/state'

const initialState: TPurchasePlacesState = {
  ...databaseSlicesCommonState,
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
