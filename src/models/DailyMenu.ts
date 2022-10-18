import Table from './Table'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class DailyMenu extends Table {
  private vegetableId: number
  private carbohydratesId: number
  private meatId: number
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: number | null,
    vegetableId: number,
    carbohydratesId: number,
    meatId: number
  ) {
    super(
      allowModifications,
      id,
      'daily_menus'
    )
    this.verifyProperties({ carbohydratesId, meatId, vegetableId })
    this.carbohydratesId = carbohydratesId
    this.vegetableId = vegetableId
    this.meatId = meatId
  }

  get getVegetableId (): number {
    return this.vegetableId
  }

  get getCarbohydratesId (): number {
    return this.carbohydratesId
  }

  get getMeatId (): number {
    return this.meatId
  }

  setVegetableId (vegetableId: number): number {
    this.preventModifications()
    this.verifyProperties({
      carbohydratesId: this.carbohydratesId,
      meatId: this.meatId,
      vegetableId
    })
    this.vegetableId = vegetableId
    return this.vegetableId
  }

  setCarbohydratesId (carbohydratesId: number): number {
    this.preventModifications()
    this.verifyProperties({
      carbohydratesId,
      meatId: this.meatId,
      vegetableId: this.vegetableId
    })
    this.carbohydratesId = carbohydratesId
    return this.carbohydratesId
  }

  setMeatId (meatId: number): number {
    this.preventModifications()
    this.verifyProperties({
      carbohydratesId: this.carbohydratesId,
      meatId,
      vegetableId: this.vegetableId
    })
    this.meatId = meatId
    return this.meatId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties ({
    carbohydratesId,
    meatId,
    vegetableId
  }: verifyPropertiesParam): void {
    const propertyRule = 'only number allowed'
    if (typeof carbohydratesId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'carbohydratesId',
        carbohydratesId,
        propertyRule
      ))
    }
    if (typeof meatId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'meatId',
        meatId,
        propertyRule
      ))
    }
    if (typeof vegetableId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'vegetableId',
        vegetableId,
        propertyRule
      ))
    }
  }
}

interface verifyPropertiesParam {
  vegetableId: number
  carbohydratesId: number
  meatId: number
}

export default DailyMenu
