import { type GetIngredientStock } from 'controllers/food_organizer_crud/sql/ingredientStock/types'

export interface IngredientsStockState {
  ingredientsStock: GetIngredientStock
  // Get
  getRequestIsLoading: boolean
  getRequestError: boolean
  getRequestSuccess: boolean
  getRequestEnd: boolean
  // Create
  postRequestIsLoading: boolean
  postRequestEnd: boolean
  postRequestSuccess: boolean
  postRequestError: boolean
}

export type TGetIngredientsStockCallback = () => Promise<GetIngredientStock>
