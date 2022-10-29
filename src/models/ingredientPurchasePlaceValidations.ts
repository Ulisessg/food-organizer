import idValidation from './idValidation'
import tableValidations from './tableValidations'

const validations: verifyObj = {
  ingredientId: (ingredientId: number) => {
    idValidation(
      ingredientId,
      'ingredientId'
    )
  },
  purchasePlaceId: (purchasePlaceId: number) => {
    idValidation(
      purchasePlaceId,
      'purchasePlaceId'
    )
  }
}

const IngredientPurchasePlacesValidations = (
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

type verifyProps = 'ingredientId' | 'purchasePlaceId'
type verifyObj = {
  [k in verifyProps]: (value: any) => void
}

export default IngredientPurchasePlacesValidations
