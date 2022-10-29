import idValidation from './idValidation'
import tableValidations from './tableValidations'

const validations: verifyObj = {
  foodId: (foodId: number): void => {
    idValidation(
      foodId,
      'foodId'
    )
  },
  ingredientId: (ingredientId: number) => {
    idValidation(
      ingredientId,
      'ingredientId'
    )
  }
}

const foodIngredientValidations = (
  propName: verifyProps,
  propValue: number,
  creationDate: string,
  id: number
// eslint-disable-next-line max-params
): void => {
  tableValidations(
    creationDate,
    id
  )

  validations[propName](propValue)
}

type verifyProps = 'foodId' | 'ingredientId'

type verifyObj = {
  [k in verifyProps]: (p: any) => void
}

export default foodIngredientValidations
