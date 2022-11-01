/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import tableValidations from 'models/tableValidations'

describe(
  'models/tableValidations',
  () => {
    let err: Error | null = null
    const creationDate = dayjs().toISOString()
    const id = 1

    /* Invalid format */

    test(
      'creationDate invalid format',
      () => {
        const invalidISO8601Date = '2012-03-01T00:00:00Z'
        try {
          tableValidations({
            creationDate: invalidISO8601Date,
            id
          })
          throw new Error('creationDate is allowing invalid "ISO 8601" date')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'creationDate',
            invalidISO8601Date,
            'only ISO8601 date allowed, such as: 2019-01-25T02:00:00.000Z'
          ))
        }
        err = null
      }
    )

    /* Invalid type */

    test(
      'id invalid "Id" type',
      () => {
        const invalidId: number = '1' as unknown as number
        try {
          tableValidations({
            creationDate,
            id: invalidId
          })
          throw new Error('id is allowing invalid "id" type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'id',
            invalidId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'id invalid "Id" type: non integer',
      () => {
        const nId = 1.1
        try {
          tableValidations({
            creationDate,
            id: nId
          })
          throw new Error('id is allowing non integer numbers')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'id',
            nId,
            'only integer number allowed'
          ))
        }
      }
    )

    test(
      'creationDate invalid type',
      () => {
        const invalidDateType: string = {} as unknown as string
        try {
          tableValidations({
            creationDate: invalidDateType,
            id
          })
          throw new Error('creationDate method is allowing invalid date type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'creationDate',
            invalidDateType,
            'only string allowed'
          ))
        }
        err = null
      }
    )
  }
)
