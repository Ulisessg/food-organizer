import Price from './Price'
import dayjs from 'dayjs'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class DailyMenuPrice extends Price {
  private menuId: number
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: number | null,
    menuId: number,
    value: number
  ) {
    super(
      allowModifications,
      id,
      'foods_prices',
      value,
      dayjs().toISOString()
    )
    verifyProp(menuId)
    this.menuId = menuId
  }

  get getMenuId (): number {
    return this.menuId
  }

  setMenuId (menuId: number): number {
    this.preventModifications()
    verifyProp(menuId)
    this.menuId = menuId
    return this.menuId
  }
}

const verifyProp = (menuId: number): void => {
  if (typeof menuId !== 'number') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'menuId',
      menuId,
      'only number allowed'
    ))
  }
}

export default DailyMenuPrice
