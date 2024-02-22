import { type IngredientsStockState } from './types'
import { databaseSlicesCommonState } from '../databaseSlice/state'

const initialState: IngredientsStockState = {
  ...databaseSlicesCommonState,
  getRequestEnd: false,
  getRequestError: false,
  getRequestIsLoading: false,
  getRequestSuccess: false,

  ingredientsStock: [],

  postRequestEnd: false,
  postRequestError: false,
  postRequestIsLoading: false,
  postRequestSuccess: false,

  updateRequestEnd: false,
  updateRequestError: false,
  updateRequestIsLoading: false,
  updateRequestSuccess: false
}

export default initialState
