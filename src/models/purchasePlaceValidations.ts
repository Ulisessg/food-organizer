
import { addressRegexp, lettersWithSpaces } from '../utils/RegExps'
import {
  invalidPropertyErrorMessage,
  invalidPropertyTypeErrorMessage
} from '../utils/ErrorMessages'
import tableValidations, { tableProps } from './tableValidations'

const validations: verifyObj = {
  address: (address: string | null) => {
    if (typeof address !== 'string') {
      if (address !== null) {
        throw new Error(invalidPropertyTypeErrorMessage(
          'address',
          address,
          'only string or null allowed'
        ))
      }
    }
    if (typeof address === 'string') {
      const add: string = address
      if (add.match(addressRegexp) === null) {
        throw new Error(invalidPropertyErrorMessage(
          'address',
          address,
          'only letters and spaces allowed'
        ))
      }
    }
  },
  name: (name: string) => {
    if (typeof name !== 'string') {
      throw new Error(invalidPropertyTypeErrorMessage(
        'name',
        name,
        'only string allowed'
      ))
    }
    if (name.match(lettersWithSpaces) === null) {
      throw new Error(invalidPropertyErrorMessage(
        'name',
        name,
        'only letters and spaces allowed'
      ))
    }
  }
}

const PurchasePlaceValidations = (purchasePlace: purchasePlaceParam): void => {
  tableValidations({
    creationDate: purchasePlace.creationDate
  })
  validations.address(purchasePlace.address)
  validations.name(purchasePlace.name)
}

export default PurchasePlaceValidations

type verifyProp = 'name' | 'address'
type purchasePlaceParam = tableProps & {
  name: string
  address: string | null
}
type verifyObj = {
  [k in verifyProp]: (value: any) => void
}
