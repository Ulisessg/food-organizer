import tableValidations, { tableProps } from './tableValidations'
import idValidation from './idValidation'

const validations: verifyObj = {
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
  }
}

const foodIngredientValidations = (foodIngredient: foodIngredientParam): void => {
  tableValidations({
    creationDate: foodIngredient.creationDate,
    id: foodIngredient.id
  })
  validations.foodId(foodIngredient.foodId)
  validations.ingredientId(foodIngredient.ingredientId)
}

export default foodIngredientValidations

type verifyProps = 'foodId' | 'ingredientId'
type foodIngredientParam = tableProps & {
  [k in verifyProps]: number
}
type verifyObj = {
  [k in verifyProps]: (p: any) => void
}
