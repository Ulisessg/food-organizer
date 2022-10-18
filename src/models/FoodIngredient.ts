import Table from './Table'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class FoodIngredient extends Table {
  private ingredientId: number
  private foodId: number
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: number | null,
    ingredientId: number,
    foodId: number
  ) {
    super(
      allowModifications,
      id,
      'foods_ingredients'
    )
    this.verifyProperties({ foodId, ingredientId })
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
    this.verifyProperties({ foodId: this.foodId, ingredientId: id })
    this.ingredientId = id
    return this.ingredientId
  }

  setFoodId (id: number): number {
    this.preventModifications()
    this.verifyProperties({ foodId: id, ingredientId: this.ingredientId })
    this.foodId = id
    return this.foodId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties ({ foodId, ingredientId }: verifyPropertiesParam): void {
    const propertyRule: string = 'only number allowed'
    if (typeof foodId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'foodId',
        foodId,
        propertyRule
      ))
    }
    if (typeof ingredientId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'ingredientId',
        ingredientId,
        propertyRule
      ))
    }
  }
}

interface verifyPropertiesParam {
  foodId: number
  ingredientId: number
}

export default FoodIngredient
