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
    this.verifyProperties({
      priceDate,
      value
    })
    this.value = value
    this.priceDate = priceDate
  }

  setValue (value: number): number {
    this.preventModifications()
    this.verifyProperties({ priceDate: this.priceDate, value })
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
    this.verifyProperties({ priceDate: date, value: this.value })
    this.priceDate = date
    return this.priceDate
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties ({ priceDate, value }: verifyPropertiesParam): void {
    if (!dayjs(priceDate).isValid()) {
      throw new Error(invalidPropertyErrorMessage(
        'priceDate',
        priceDate,
        'only ISO string format allowed'
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
}

interface verifyPropertiesParam { priceDate: string, value: number }

export default Price
