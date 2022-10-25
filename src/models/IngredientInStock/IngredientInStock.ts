import verifications, { verifyProps } from './ingredientInStockVerifications'
import { TId } from 'models/commonTables'
import Table from '../Table'

class IngredientInStock extends Table {
  private ingredientId: number
  private uomId: number
  private comment: string | null
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: TId,
    ingredientId: number,
    uomId: number,
    comment: string | null
  ) {
    super(
      allowModifications,
      id,
      'ingredients_in_stock'
    )
    this.verifyProperties(
      'comment',
      comment
    )
    this.verifyProperties(
      'ingredientId',
      ingredientId
    )
    this.verifyProperties(
      'uomId',
      uomId
    )
    this.ingredientId = ingredientId
    this.uomId = uomId
    this.comment = comment
  }

  setIngredientId (id: number): number {
    this.preventModifications()
    this.verifyProperties(
      'ingredientId',
      id
    )
    this.ingredientId = id
    return this.ingredientId
  }

  setUomId (id: number): number {
    this.preventModifications()
    this.verifyProperties(
      'uomId',
      id
    )
    this.uomId = id
    return this.uomId
  }

  setComment (comment: string): string {
    this.preventModifications()
    this.verifyProperties(
      'comment',
      comment
    )
    this.comment = comment
    return this.comment
  }

  get getIngredientId (): number {
    return this.ingredientId
  }

  get getUomId (): number {
    return this.uomId
  }

  get getComment (): string | null {
    return this.comment
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProps, value: any): void {
    verifications[propName](value)
  }
}

export default IngredientInStock
