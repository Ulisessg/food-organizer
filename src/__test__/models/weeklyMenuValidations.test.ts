/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import dayjs from 'dayjs'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import weeklyMenuValidations from 'models/weeklyMenuValidations'

describe(
  'models/weeklyMenuValidations',
  () => {
    let err: Error | null = null
    const creationDate = dayjs().toISOString()
    const id = 1
    test(
      'mondayMenuId invalid type',
      () => {
        const nId: number = null as unknown as number
        try {
          weeklyMenuValidations(
            'mondayMenuId',
            nId,
            creationDate,
            id
          )
          throw new Error('mondayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'mondayMenuId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'tuesdayMenuId invalid type',
      () => {
        const nId: number = {} as unknown as number
        try {
          weeklyMenuValidations(
            'tuesdayMenuId',
            nId,
            creationDate,
            id
          )
          throw new Error('tuesdayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'tuesdayMenuId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'wednesdayMenuId invalid type',
      () => {
        const nId: number = {} as unknown as number
        try {
          weeklyMenuValidations(
            'wednesdayMenuId',
            nId,
            creationDate,
            id
          )
          throw new Error('wednesdayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'wednesdayMenuId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'thursdayMenuId invalid type',
      () => {
        const nId: number = {} as unknown as number
        try {
          weeklyMenuValidations(
            'thursdayMenuId',
            nId,
            creationDate,
            id
          )
          throw new Error('thursdayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'thursdayMenuId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'fridayMenuId invalid type',
      () => {
        const nId: number = {} as unknown as number
        try {
          weeklyMenuValidations(
            'fridayMenuId',
            nId,
            creationDate,
            id
          )
          throw new Error('fridayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'fridayMenuId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'saturdayMenuId invalid type',
      () => {
        const nId: number = {} as unknown as number
        try {
          weeklyMenuValidations(
            'saturdayMenuId',
            nId,
            creationDate,
            id
          )
          throw new Error('saturdayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'saturdayMenuId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'sundayMenuId invalid type',
      () => {
        const nId: number = {} as unknown as number
        try {
          weeklyMenuValidations(
            'sundayMenuId',
            nId,
            creationDate,
            id
          )
          throw new Error('sundayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'sundayMenuId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
  }
)
