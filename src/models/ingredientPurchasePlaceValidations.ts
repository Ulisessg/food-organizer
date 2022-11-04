import tableValidations, { tableProps } from './tableValidations'
import idValidation from './idValidation'

export const validations: verifyObj = {
  ingredientId: (ingredientId: number) => {
    idValidation({
      id: ingredientId,
      idName: 'ingredientId'
    })
  },
  purchasePlaceId: (purchasePlaceId: number) => {
    idValidation({
      id: purchasePlaceId,
      idName: 'purchasePlaceId'
    })
  }
}

const IngredientPurchasePlaceValidations = (ingredientPurchasePlace:
IngredientPurchasePlaceParam): void => {
  tableValidations({
    creationDate: ingredientPurchasePlace.creationDate
  })
  validations.ingredientId(ingredientPurchasePlace.ingredientId)
  validations.purchasePlaceId(ingredientPurchasePlace.purchasePlaceId)
}

export default IngredientPurchasePlaceValidations

type verifyProps = 'ingredientId' | 'purchasePlaceId'

type IngredientPurchasePlaceParam = tableProps & {
  [k in verifyProps]: number
}

type verifyObj = {
  [k in verifyProps]: (value: any) => void
}
