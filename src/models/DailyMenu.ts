import { TId } from 'models/commonTables'
import Table from './Table'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class DailyMenu extends Table {
  private vegetableId: number
  private carbohydratesId: number
  private meatId: number
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: TId,
    vegetableId: number,
    carbohydratesId: number,
    meatId: number
  ) {
    super(
      allowModifications,
      id,
      'daily_menus'
    )
    this.verifyProperties(
      'carbohydratesId',
      carbohydratesId
    )
    this.verifyProperties(
      'meatId',
      meatId
    )
    this.verifyProperties(
      'vegetableId',
      vegetableId
    )

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
    this.verifyProperties(
      'vegetableId',
      vegetableId
    )
    this.vegetableId = vegetableId
    return this.vegetableId
  }

  setCarbohydratesId (carbohydratesId: number): number {
    this.preventModifications()
    this.verifyProperties(
      'carbohydratesId',
      carbohydratesId
    )
    this.carbohydratesId = carbohydratesId
    return this.carbohydratesId
  }

  setMeatId (meatId: number): number {
    this.preventModifications()
    this.verifyProperties(
      'meatId',
      meatId
    )
    this.meatId = meatId
    return this.meatId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProps, value: any): void {
    verifications[propName](value)
  }
}

const propertyRule = 'only number allowed'
const verifications: verifyObj = {
  carbohydratesId: (carbohydratesId: number) => {
    if (typeof carbohydratesId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'carbohydratesId',
        carbohydratesId,
        propertyRule
      ))
    }
  },
  meatId: (meatId: number) => {
    if (typeof meatId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'meatId',
        meatId,
        propertyRule
      ))
    }
  },
  vegetableId: (vegetableId: number) => {
    if (typeof vegetableId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'vegetableId',
        vegetableId,
        propertyRule
      ))
    }
  }
}

type verifyProps = 'vegetableId' | 'meatId' | 'carbohydratesId'

type verifyObj = {
  [k in verifyProps]: (p: any) => void
}

export default DailyMenu
