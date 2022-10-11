/* eslint-disable max-params */
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
    if (!dayjs(priceDate).isValid()) {
      throw new Error('Invalid date')
    }
    if (typeof value !== 'number') {
      throw new Error(`Invalid value, only decimals allowed, value: ${value as string}`)
    }
    this.value = value
    this.priceDate = priceDate
  }

  setValue (value: number): number {
    this.preventModifications()
    if (typeof value !== 'number') {
      throw new Error(`Invalid value, only decimals allowed, value: ${value as string}`)
    }
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
    if (!dayjs(date).isValid()) {
      throw new Error('Invalid date')
    }
    this.priceDate = date
    return this.priceDate
  }
}

export default Price
