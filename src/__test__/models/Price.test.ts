/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import Pr from 'models/Price'
import dayjs from 'dayjs'

class Price extends Pr {}

describe(
  'models/Price',
  () => {
    test(
      'Class has required methods and properties',
      () => {
        const pr = new Price(
          false,
          1,
          'price',
          10.00,
          dayjs().toISOString()
        )

        expect(pr.getValue).toBeDefined()
        expect(pr.setValue).toBeDefined()
        expect(pr.getPriceDate).toBeDefined()
        expect(pr.setPriceDate).toBeDefined()
      }
    )

    test(
      'constructor, invalid date',
      () => {
        const priceDateProp = 'Invalid Date'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pr = new Price(
            false,
            1,
            'pr',
            100.00,
            priceDateProp
          )
          throw new Error('Class is allowing invalid dates')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'priceDate',
            priceDateProp,
            'only ISO string format allowed'
          ))
        }
      }
    )
    test(
      'constructor, invalid price type',
      () => {
        const value = 'Cien' as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pr = new Price(
            false,
            1,
            'pr',
            value,
            dayjs().toISOString()
          )
          throw new Error('Class is allowing invalid price')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'value',
            value,
            'only numbers allowed'
          ))
        }
      }
    )

    test(
      'getValue',
      () => {
        const value = 100.00
        const pr = new Price(
          false,
          1,
          'pr',
          value,
          dayjs().toISOString()
        )
        expect(pr.getValue()).toStrictEqual(value)
      }
    )

    test(
      'setValue',
      () => {
        const value = 100.00
        const pr = new Price(
          true,
          1,
          'pr',
          value,
          dayjs().toISOString()
        )
        const nValue = 200.00
        const returnedValue = pr.setValue(nValue)
        expect(returnedValue).toStrictEqual(nValue)
        expect(pr.getValue()).toStrictEqual(nValue)
      }
    )

    test(
      'setValue, invalid value type',
      () => {
        const value = 100.00
        const pr = new Price(
          true,
          1,
          'pr',
          value,
          dayjs().toISOString()
        )
        const nValue = 'Cow' as unknown as number
        try {
          pr.setValue(nValue)
          throw new Error('Class is allowing invalid values')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'value',
            nValue,
            'only numbers allowed'
          ))
        }
      }
    )

    test(
      'getPriceDate',
      () => {
        const date = dayjs().toISOString()
        const pr = new Price(
          false,
          1,
          'pr',
          100.00,
          date
        )
        expect(pr.getPriceDate()).toStrictEqual(date)
      }
    )
    test(
      'setPriceDate',
      () => {
        const date = dayjs().toISOString()
        const pr = new Price(
          true,
          1,
          'pr',
          100.00,
          date
        )
        setTimeout(
          () => {
            const nDate = dayjs().toISOString()
            const returnedValue = pr.setPriceDate(nDate)
            expect(returnedValue).toStrictEqual(nDate)
            expect(pr.getPriceDate()).toStrictEqual(nDate)
          },
          300
        )
      }
    )

    test(
      'setPriceDate, invalid date',
      () => {
        const nPDate = 'Invalid Price Date'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pr = new Price(
            true,
            1,
            'pr',
            100.00,
            dayjs().toISOString()
          )
          pr.setPriceDate(nPDate)
          throw new Error('Class is allowing invalid dates')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'priceDate',
            nPDate,
            'only ISO string format allowed'
          ))
        }
      }
    )
  }
)
