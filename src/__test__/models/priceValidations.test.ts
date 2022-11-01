/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
import {
  invalidDateMessage,
  invalidPropertyErrorMessage,
  invalidPropertyTypeErrorMessage
} from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import priceValidations from 'models/priceValidations'

describe(
  'models/Price',
  () => {
    const priceDate = dayjs().toISOString()
    const id = 1
    const value = 100
    test(
      'invalid value type',
      () => {
        const invalidValue: number = 'Cow' as unknown as number
        try {
          priceValidations({
            creationDate: priceDate,
            id,
            idName: 'none',
            priceDate,
            value: invalidValue
          })
          throw new Error('Class is allowing invalid values')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'value',
            invalidValue,
            'only numbers allowed'
          ))
        }
      }
    )

    test(
      'priceDate, invalid date',
      () => {
        const invalidPriceDate = 'Invalid Price Date'
        try {
          priceValidations({
            creationDate: priceDate,
            id,
            idName: 'none',
            priceDate: invalidPriceDate,
            value
          })
          throw new Error('Class is allowing invalid dates')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'priceDate',
            invalidPriceDate,
            invalidDateMessage
          ))
        }
      }
    )
  }
)
