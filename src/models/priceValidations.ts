// Generic for validate 'price' tables
import {
  invalidDateMessage,
  invalidPropertyErrorMessage,
  invalidPropertyTypeErrorMessage
} from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import idValidation from './idValidation'
import { tableProps } from './tableValidations'

export const validations = {
  id: (id: number, idName: priceTables) => {
    idValidation({
      id,
      idName
    })
  },
  price: (value: number) => {
    if (typeof value !== 'number') {
      throw new Error(invalidPropertyTypeErrorMessage(
        'value',
        value,
        'only numbers allowed'
      ))
    }
  },
  priceDate: (date: string) => {
    if (!dayjs(date).isValid()) {
      throw new Error(invalidPropertyErrorMessage(
        'priceDate',
        date,
        invalidDateMessage
      ))
    }
  }
}

export const priceValidations = (price: priceParam): void => {
  validations.id(
    price.id,
    price.idName
  )
  validations.price(price.value)
  validations.priceDate(price.priceDate)
}

// Current 'price' tables
type priceTables = 'menuPrice' | 'weeklyMenuPrice' | 'ingredientPrice' | 'foodPrice' | 'none'

type priceParam = tableProps & {
  priceDate: string
  value: number
  idName: priceTables
  id: number
}

export default priceValidations
