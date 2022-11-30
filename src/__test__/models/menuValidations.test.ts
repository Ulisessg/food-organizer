/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import dayjs from 'dayjs'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import menuValidations from 'models/menuValidations'

describe(
  'models/menuValidations',
  () => {
    let err: Error | null = null
    const creationDate = dayjs().toISOString()

    test(
      'comment invalid type',
      () => {
        const invalidComment: null = {} as unknown as null
        try {
          menuValidations({ comment: invalidComment, creationDate })
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
