import { TId } from 'models/commonTables'
import Table from './Table'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class FoodIngredient extends Table {
  private ingredientId: number
  private foodId: number
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: TId,
    ingredientId: number,
    foodId: number
  ) {
    super(
      allowModifications,
      id,
      'foods_ingredients'
    )
    this.verifyProperties(
      'foodId',
      foodId
    )
    this.verifyProperties(
      'ingredientId',
      ingredientId
    )
    this.foodId = foodId
    this.ingredientId = ingredientId
  }

  get getIngredientId (): number {
    return this.ingredientId
  }

  get getFoodId (): number {
    return this.foodId
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

  setFoodId (id: number): number {
    this.preventModifications()
    this.verifyProperties(
      'foodId',
      id
    )
    this.foodId = id
    return this.foodId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProps, value: any): void {
    verifications[propName](value)
  }
}

const propertyRule: string = 'only number allowed'
const verifications: verifyObj = {
  foodId: (foodId: number): void => {
    if (typeof foodId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'foodId',
        foodId,
        propertyRule
      ))
    }
  },
  ingredientId: (ingredientId: number) => {
    if (typeof ingredientId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'ingredientId',
        ingredientId,
        propertyRule
      ))
    }
  }
}

type verifyProps = 'foodId' | 'ingredientId'

type verifyObj = {
  [k in verifyProps]: (p: any) => void
}

export default FoodIngredient
