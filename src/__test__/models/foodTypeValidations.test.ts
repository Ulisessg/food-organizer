/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import foodTypeValidations from 'models/foodTypeValidations'

describe(
  'modles/foodTypeValidations',
  () => {
    const creationDate = dayjs().toISOString()
    const id = 1
    test(
      'invalid "name"',
      () => {
        const nName: string = '!Vegetales/'
        try {
          foodTypeValidations(
            nName,
            creationDate,
            id
          )
          throw new Error('name is allowing invalid "name"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'name',
            nName,
            'only letters and spaces allowed'
          ))
        }
      }
    )
    test(
      'invalid "name" type',
      () => {
        const nName: string = 34 as unknown as string
        try {
          foodTypeValidations(
            nName,
            creationDate,
            id
          )
          throw new Error('name is allowing invalid "name" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'name',
            nName,
            'only string allowed'
          ))
        }
      }
    )
  }
)
