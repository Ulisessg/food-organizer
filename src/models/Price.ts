/* eslint-disable max-params */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import Table from './Table'
import dayjs from 'dayjs'

abstract class Price extends Table {
  private value: number
  private priceDate: string

  public constructor (
    allowModifications: boolean,
    id: number | null,
    tableName: string,
    value: number,
    priceDate: string
  ) {
    super(
      allowModifications,
      id,
      tableName
    )
    this.verifyProperties(
      'priceDate',
      priceDate
    )
    this.verifyProperties(
      'value',
      value
    )
    this.value = value
    this.priceDate = priceDate
  }

  setValue (value: number): number {
    this.preventModifications()
    this.verifyProperties(
      'value',
      value
    )
    this.value = value
    return this.value
  }

  getValue (): number {
    return this.value
  }

  getPriceDate (): string {
    return this.priceDate
  }

  setPriceDate (date: string): string {
    this.preventModifications()
    this.verifyProperties(
      'priceDate',
      date
    )
    this.priceDate = date
    return this.priceDate
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProp, value: any): void {
    verifications[propName](value)
  }
}

const verifications: verifyObj = {
  priceDate: (priceDate: string) => {
    if (!dayjs(priceDate).isValid()) {
      throw new Error(invalidPropertyErrorMessage(
        'priceDate',
        priceDate,
        'only ISO string format allowed'
      ))
    }
  },
  value: (value: number) => {
    if (typeof value !== 'number') {
      throw new Error(invalidPropertyTypeErrorMessage(
        'value',
        value,
        'only numbers allowed'
      ))
    }
  }
}

type verifyProp = 'priceDate' | 'value'
type verifyObj = {
  [k in verifyProp]: (value: any) => void
}

export default Price
