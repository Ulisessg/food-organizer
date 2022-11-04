// Generic for validate 'price' tables
import {
  invalidDateMessage,
  invalidPropertyErrorMessage,
  invalidPropertyTypeErrorMessage
} from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import idValidation from './idValidation'
import { tableProps } from './tableValidations'

export const priceValidations = (price: priceParam): void => {
  idValidation({
    id: price.id,
    idName: price.idName
  })
  if (!dayjs(price.priceDate).isValid()) {
    throw new Error(invalidPropertyErrorMessage(
      'priceDate',
      price.priceDate,
      invalidDateMessage
    ))
  }

  if (typeof price.value !== 'number') {
    throw new Error(invalidPropertyTypeErrorMessage(
      'value',
      price.value,
      'only numbers allowed'
    ))
  }
}

// Current 'price' tables
type priceTables = 'dailyMenuPrice' | 'weeklyMenuPrice' | 'ingredientPrice' | 'foodPrice' | 'none'

type priceParam = tableProps & {
  priceDate: string
  value: number
  idName: priceTables
  id: number
}

export default priceValidations
