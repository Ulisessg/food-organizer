import {
  type GetIngredients,
  type TIngr_purchase_places
} from 'controllers/sql/ingredients/types'
import {
  type CreateIngredient
} from 'controllers/sql/ingredients/createIngredientsSql'

interface CreateIngredientThunkParam {
  ingredient: CreateIngredient
  purchasePlaces: number[]
}

interface TIngredientsState {
  ingredients: GetIngredients

  /** Get ingredient request init */
  getIsLoading: boolean

  /** Get ingredient request have an error */
  getIngredientsError: boolean

  /** Get ingredient request ends */
  getIngredientsEnd: boolean

  /** Get ingredient request ends successfully */
  getIngredientsSuccess: boolean

  /** Ingredient creation request init */
  postIsLoading: boolean

  /** Ingredient creation request ends */
  postEnd: boolean

  /** Ingredient creation request have an error */
  postError: boolean

  /** Ingredient creation request ends successfull */
  postSuccess: boolean

  /** Ingredient purchase places creation init */
  postIngredientPurchaseIsLoading: boolean

  /** Ingredient purchase places creation ends */
  postIngredientPurchaseEnd: boolean

  /** Ingredient purchase places creation error */
  postIngredientPurchaseError: boolean

  /** Ingredient purchase places creation ends successfull */
  postIngredientPurchaseSuccess: boolean

  // Update Ingredient. Includes ingredient-purchase places
  updateIngredientIsLoading: boolean
  updateIngredientEnd: boolean
  updateIngredientSuccess: boolean
  updateIngredientError: boolean
}

export type TGetIngredientsDataCallback = () => Promise<GetIngredients>
export type CreateIngredientCallback =
  (ingredientData: CreateIngredientThunkParam) => {
    createIngredientCallback: () => Promise<GetIngredients[0]>
    createIngredientPurchasePlaces:
    (ingredient_id: number, purchasePlacesIds: number[]) => Promise<TIngr_purchase_places>
    callbackData: CreateIngredientThunkParam
  }

export type UpdateIngredientCallback =
(ingredient: UpdateIngredientParams, elementIndex: number) =>
() => Promise<UpdateIngredientCallbackResult>

export type UpdateIngredientCallbackResult = GetIngredients[0] & {
  elementIndex: number
}
export type UpdateIngredientParams = Omit<
GetIngredients[0], 'ingr_purchase_places' | 'uom_name'> & {
  ingr_purchase_places: string[]
}
