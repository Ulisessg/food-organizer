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
    this.verifyProperties({ ingredientId, purchasePlaceId })
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
    this.verifyProperties({ ingredientId, purchasePlaceId: this.purchasePlaceId })
    this.ingredientId = ingredientId

    return this.ingredientId
  }

  setPurchasePlaceId (purchasePlaceId: number): number {
    this.preventModifications()
    this.verifyProperties({ ingredientId: this.ingredientId, purchasePlaceId })
    this.purchasePlaceId = purchasePlaceId
    return this.purchasePlaceId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties ({ ingredientId, purchasePlaceId }: verifyPropertiesParam): void {
    if (!Number.isInteger(ingredientId)) {
      throw new Error(invalidPropertyTypeErrorMessage(
        'ingredientId',
        ingredientId,
        'only number allowed'
      ))
    }
    if (!Number.isInteger(purchasePlaceId)) {
      throw new Error(invalidPropertyTypeErrorMessage(
        'purchasePlaceId',
        purchasePlaceId,
        'only number allowed'
      ))
    }
  }
}

interface verifyPropertiesParam {
  ingredientId: number
  purchasePlaceId: number
}

export default IngredientsPurchasePlaces
