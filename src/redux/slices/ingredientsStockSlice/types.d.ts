import {
  type CreateIngredientStock,
  type GetIngredientStock
} from 'controllers/sql/ingredientStock/types'

type SingleIngredientStock = GetIngredientStock[0]

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
  // Update
  updateRequestIsLoading: boolean
  updateRequestEnd: boolean
  updateRequestSuccess: boolean
  updateRequestError: boolean
}

export type TGetIngredientsStockCallback = () => Promise<GetIngredientStock>
export type CreateIngredientStockCallback =
(ingredient: CreateIngredientStock) => () => Promise<SingleIngredientStock>

interface UpdateIngredientStockCallbackReturn extends SingleIngredientStock {
  elementIndex: number
}

export type UpdateIngredientStockCallback = (
  ingredientStock: UpdateIngredientStockCallbackReturn) =>
() => Promise<UpdateIngredientStockCallbackReturn>
