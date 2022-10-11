/* eslint-disable max-lines-per-function */
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
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pr = new Price(
            false,
            1,
            'pr',
            100.00,
            'Invalid Date'
          )
          throw new Error('Class is allowing invalid dates')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid date')
        }
      }
    )
    test(
      'constructor, invalid price',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pr = new Price(
            false,
            1,
            'pr',
            'Cien' as unknown as number,
            dayjs().toISOString()
          )
          throw new Error('Class is allowing invalid dates')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid value, only decimals allowed, value: Cien')
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
          false,
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
          false,
          1,
          'pr',
          value,
          dayjs().toISOString()
        )
        try {
          pr.setValue('Cow' as unknown as number)
          throw new Error('Class is allowing invalid values')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid value, only decimals allowed, value: Cow')
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
          false,
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
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pr = new Price(
            false,
            1,
            'pr',
            100.00,
            dayjs().toISOString()
          )
          pr.setPriceDate('invalid date')
          throw new Error('Class is allowing invalid dates')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid date')
        }
      }
    )
  }
)
