import Price from './Price'
import { TId } from 'models/commonTables'
import dayjs from 'dayjs'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class WeeklyMenuPrice extends Price {
  private weeklyMenuId: number
  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: TId,
    weeklyMenuId: number,
    value: number
  ) {
    super(
      allowModifications,
      id,
      'foods_prices',
      value,
      dayjs().toISOString()
    )
    verifyProp(weeklyMenuId)
    this.weeklyMenuId = weeklyMenuId
  }

  get getWeeklyMenuId (): number {
    return this.weeklyMenuId
  }

  setWeeklyMenuId (weeklyMenuId: number): number {
    this.preventModifications()
    verifyProp(weeklyMenuId)
    this.weeklyMenuId = weeklyMenuId
    return this.weeklyMenuId
  }
}

const verifyProp = (weeklyMenuId: number): void => {
  if (typeof weeklyMenuId !== 'number') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'weeklyMenuId',
      weeklyMenuId,
      'only number allowed'
    ))
  }
}

export default WeeklyMenuPrice
