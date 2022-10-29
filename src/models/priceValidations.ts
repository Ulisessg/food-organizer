// Generic for validate 'price' tables
import {
  invalidDateMessage,
  invalidPropertyErrorMessage,
  invalidPropertyTypeErrorMessage
} from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import idValidation from './idValidation'

const priceValidations = (
  priceDate: string,
  value: number,
  id: number,
  idName: priceTables
// eslint-disable-next-line max-params
): void => {
  idValidation(
    id,
    idName
  )
  if (!dayjs(priceDate).isValid()) {
    throw new Error(invalidPropertyErrorMessage(
      'priceDate',
      priceDate,
      invalidDateMessage
    ))
  }

  if (typeof value !== 'number') {
    throw new Error(invalidPropertyTypeErrorMessage(
      'value',
      value,
      'only numbers allowed'
    ))
  }
}

// Current 'price' tables
type priceTables = 'dailyMenuPrice' | 'weeklyMenuPrice' | 'ingredientPrice' | 'foodPrice' | 'none'

export default priceValidations
