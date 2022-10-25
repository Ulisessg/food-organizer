/* eslint-disable max-len */
import { addressRegexp, lettersWithSpaces } from '../utils/RegExps'
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from '../utils/ErrorMessages'
import { TId } from 'models/commonTables'
import Table from './Table'

class PurchasePlaces extends Table {
  private name: string
  private address: TAddress
  // eslint-disable-next-line max-params
  constructor (allowModifications: boolean, id: TId, name: string, address: string | null) {
    super(
      allowModifications,
      id,
      'purchase_places'
    )
    this.verifyProperties(
      'address',
      address
    )
    this.verifyProperties(
      'name',
      name
    )

    this.address = address
    this.name = name
  }

  get getName (): string {
    return this.name
  }

  get getAddress (): TAddress {
    return this.address
  }

  setAddress (address: string): string {
    this.preventModifications()
    this.verifyProperties(
      'address',
      address
    )
    this.address = address
    return this.address
  }

  setName (name: string): string {
    this.preventModifications()
    this.verifyProperties(
      'name',
      name
    )
    this.name = name
    return this.name
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProp, value: any): void {
    verifications[propName](value)
  }
}

const verifications: verifyObj = {
  address: (address: string | null) => {
    if (typeof address !== 'string') {
      if (address !== null) {
        throw new Error(invalidPropertyTypeErrorMessage(
          'address',
          address,
          'only string or undefined allowed'
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

type verifyProp = 'name' | 'address'
type verifyObj = {
  [k in verifyProp]: (value: any) => void
}

type TAddress = string | null

export default PurchasePlaces
