/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import dailyMenuValidations from 'models/dailyMenuValidations'
import dayjs from 'dayjs'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/dailyMenuValidations',
  () => {
    let err: Error | null = null
    const id = 1
    const creationDate = dayjs().toISOString()
    test(
      'vegetableId invalid type',
      () => {
        const nId: number = null as unknown as number
        try {
          dailyMenuValidations({ carbohydratesId: id, creationDate, id, meatId: id, vegetableId: nId })
          throw new Error('vegetablesId is allowing invalid id type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'vegetableId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'carbohydratesId invalid type',
      () => {
        const nId: number = null as unknown as number
        try {
          dailyMenuValidations({ carbohydratesId: nId, creationDate, id, meatId: id, vegetableId: id })
          throw new Error('carbohydratesId is allowing invalid id type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'carbohydratesId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'meatId invalid type',
      () => {
        const nId: number = null as unknown as number
        try {
          dailyMenuValidations({
            carbohydratesId: id,
            creationDate,
            id,
            meatId: nId,
            vegetableId: id
          })
          throw new Error('meatId is allowing invalid id type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'meatId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
  }
)
