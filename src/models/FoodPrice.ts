import Price from './Price'
import dayjs from 'dayjs'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class FoodPrice extends Price {
  private foodId: number
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: number | null,
    foodId: number,
    value: number
  ) {
    super(
      allowModifications,
      id,
      'foods_prices',
      value,
      dayjs().toISOString()
    )
    verifyProp(foodId)
    this.foodId = foodId
  }

  get getFoodId (): number {
    return this.foodId
  }

  setFoodId (foodId: number): number {
    this.preventModifications()
    verifyProp(foodId)
    this.foodId = foodId
    return this.foodId
  }
}

const verifyProp = (foodId: number): void => {
  if (typeof foodId !== 'number') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'foodId',
      foodId,
      'only number allowed'
    ))
  }
}

export default FoodPrice
