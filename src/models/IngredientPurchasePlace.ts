import Table from './Table'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class IngredientsPurchasePlaces extends Table {
  private ingredientId: number
  private purchasePlaceId: number

  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: number | null,
    ingredientId: number,
    purchasePlaceId: number
  ) {
    super(
      allowModifications,
      id,
      'ingredients_purchase_places'
    )
    this.verifyProperties(
      'ingredientId',
      ingredientId
    )
    this.verifyProperties(
      'purchasePlaceId',
      purchasePlaceId
    )
    this.ingredientId = ingredientId
    this.purchasePlaceId = purchasePlaceId
  }

  get getIngredientId (): number {
    return this.ingredientId
  }

  get getPurchasePlaceId (): number {
    return this.purchasePlaceId
  }

  setIngredientId (ingredientId: number): number {
    this.preventModifications()
    this.verifyProperties(
      'ingredientId',
      ingredientId
    )
    this.ingredientId = ingredientId

    return this.ingredientId
  }

  setPurchasePlaceId (purchasePlaceId: number): number {
    this.preventModifications()
    this.verifyProperties(
      'purchasePlaceId',
      purchasePlaceId
    )
    this.purchasePlaceId = purchasePlaceId
    return this.purchasePlaceId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProps, value: any): void {
    verifications[propName](value)
  }
}

const verifications: verifyObj = {
  ingredientId: (ingredientId: number) => {
    if (!Number.isInteger(ingredientId)) {
      throw new Error(invalidPropertyTypeErrorMessage(
        'ingredientId',
        ingredientId,
        'only number allowed'
      ))
    }
  },
  purchasePlaceId: (purchasePlaceId: number) => {
    if (!Number.isInteger(purchasePlaceId)) {
      throw new Error(invalidPropertyTypeErrorMessage(
        'purchasePlaceId',
        purchasePlaceId,
        'only number allowed'
      ))
    }
  }
}

type verifyProps = 'ingredientId' | 'purchasePlaceId'
type verifyObj = {
  [k in verifyProps]: (value: any) => void
}

export default IngredientsPurchasePlaces
