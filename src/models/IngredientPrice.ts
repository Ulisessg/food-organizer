import Price from './Price'
import dayjs from 'dayjs'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class IngredientPrice extends Price {
  private ingredientId: number
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: number | null,
    ingredientId: number,
    value: number
  ) {
    super(
      allowModifications,
      id,
      'foods_prices',
      value,
      dayjs().toISOString()
    )
    verifyProp(ingredientId)
    this.ingredientId = ingredientId
  }

  get getIngredientId (): number {
    return this.ingredientId
  }

  setIngredientId (ingredientId: number): number {
    this.preventModifications()
    verifyProp(ingredientId)
    this.ingredientId = ingredientId
    return this.ingredientId
  }
}

const verifyProp = (ingredientId: number): void => {
  if (typeof ingredientId !== 'number') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'ingredientId',
      ingredientId,
      'only number allowed'
    ))
  }
}

export default IngredientPrice
