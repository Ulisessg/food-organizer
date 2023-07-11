
import idValidation from './idValidation'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

export const validations: verifyObj = {
  foodId: (foodId: number): void => {
    idValidation({
      id: foodId,
      idName: 'foodId'
    })
  },
  ingredientId: (ingredientId: number) => {
    idValidation({
      id: ingredientId,
      idName: 'ingredientId'
    })
  },
  ingredient_qty: (qty) => {
    if (typeof qty !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'ingredient_qty',
        qty,
        'only number allowed'
      ))
    }
  }
}

const foodIngredientValidations = (foodIngredient: foodIngredientParam): void => {
  validations.foodId(foodIngredient.foodId)
  validations.ingredientId(foodIngredient.ingredientId)
}

export default foodIngredientValidations

type verifyProps = 'foodId' | 'ingredientId' | 'ingredient_qty'
type foodIngredientParam = Record<verifyProps, number>
type verifyObj = Record<verifyProps, (p: any) => void>
