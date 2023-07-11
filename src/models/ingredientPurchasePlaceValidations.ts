
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
  validations.ingredientId(ingredientPurchasePlace.ingredientId)
  validations.purchasePlaceId(ingredientPurchasePlace.purchasePlaceId)
}

export default IngredientPurchasePlaceValidations

type verifyProps = 'ingredientId' | 'purchasePlaceId'

type IngredientPurchasePlaceParam = {
  // eslint-disable-next-line no-unused-vars
  [k in verifyProps]: number
}

type verifyObj = {
  // eslint-disable-next-line no-unused-vars
  [k in verifyProps]: (value: any) => void
}
