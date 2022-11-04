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
    const creationDate = dayjs().toISOString()

    test(
      'comment invalid type',
      () => {
        const invalidComment: null = {} as unknown as null
        try {
          dailyMenuValidations({ comment: invalidComment, creationDate })
          throw new Error('comment is allowing invalid id type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'comment',
            invalidComment,
            'only string or null allowed'
          ))
        }
        err = null
      }
    )
  }
)
