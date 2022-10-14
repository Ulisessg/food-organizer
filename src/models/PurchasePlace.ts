/* eslint-disable max-len */
import { addressRegexp, lettersWithSpaces } from '../utils/RegExps'
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from '../utils/ErrorMessages'
import Table from './Table'

class PurchasePlaces extends Table {
  private name: string
  private address: TAddress
  // eslint-disable-next-line max-params
  constructor (allowModifications: boolean, id: number | null, name: string, address?: string) {
    super(
      allowModifications,
      id,
      'purchase_places'
    )
    this.verifyProperties({ address, name })
    this.address = address
    this.name = name
  }

  get getName (): string {
    return this.name
  }

  setName (name: string): string {
    this.preventModifications()
    this.verifyProperties({ address: this.address, name })
    this.name = name
    return this.name
  }

  get getAddress (): TAddress {
    return this.address
  }

  setAddress (address: string): string {
    this.preventModifications()
    this.verifyProperties({ address, name: this.name })
    this.address = address
    return this.address
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties ({ address, name }: verifyPropertiesParam): void {
    // eslint-disable-next-line max-len
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

    if (typeof address === 'string') {
      const add: string = address
      if (add.match(addressRegexp) === null) {
        throw new Error(invalidPropertyErrorMessage(
          'address',
          address,
          'only letters and spaces allowed'
        ))
      }
    } else if (typeof address !== 'string' || typeof address !== 'undefined') {
      // eslint-disable-next-line max-len
      throw new Error(invalidPropertyTypeErrorMessage(
        'address',
        address,
        'only string or undefined allowed'
      ))
    }
  }
}

interface verifyPropertiesParam {
  name: string
  address: string | undefined
}

type TAddress = string | undefined

export default PurchasePlaces
