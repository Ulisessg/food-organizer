import { type IngredientsStockState } from './types'

const initialState: IngredientsStockState = {
  getRequestEnd: false,
  getRequestError: false,
  getRequestIsLoading: false,
  getRequestSuccess: false,
  ingredientsStock: [],
  postRequestEnd: false,
  postRequestError: false,
  postRequestIsLoading: false,
  postRequestSuccess: false
}

export default initialState
