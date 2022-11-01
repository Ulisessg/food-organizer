/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import tableValidations from 'models/tableValidations'

describe(
  'models/tableValidations',
  () => {
    let err: Error | null = null

    /* Invalid format */

    test(
      'creationDate invalid format',
      () => {
        const invalidISO8601Date = '2012-03-01T00:00:00Z'
        try {
          tableValidations({
            creationDate: invalidISO8601Date
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
      'creationDate invalid type',
      () => {
        const invalidDateType: string = {} as unknown as string
        try {
          tableValidations({
            creationDate: invalidDateType

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
