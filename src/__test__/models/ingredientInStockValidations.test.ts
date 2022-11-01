/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import dayjs from 'dayjs'
import ingredientStockValidations from 'models/ingredientStockValidations'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/ingredientStockValidations',
  () => {
    let err: Error | null = null
    const creationDate: string = dayjs().toISOString()
    const id = 1
    // Invalid types
    test(
      'comment invalid type',
      () => {
        const invalidComment: string = {} as unknown as string
        try {
          ingredientStockValidations({
            comment: invalidComment,
            creationDate,
            ingredientId: id,
            uomId: id

          })
          throw new Error('comment is allowing invalid "comment"')
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
    test(
      'ingredientId invalid type',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          ingredientStockValidations({
            comment: null,
            creationDate,
            ingredientId: invalidId,
            uomId: id
          })
          throw new Error('ingredientId is allowing invalid "id"')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredientId',
            invalidId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'uomId invalid type',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          ingredientStockValidations({
            comment: null,
            creationDate,
            ingredientId: id,
            uomId: invalidId
          })
          throw new Error('uomId is allowing invalid "id"')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'uomId',
            invalidId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
  }
)
