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
            ingredient_qty: id

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
        const invalidQty: number = {} as unknown as number
        try {
          ingredientStockValidations({
            comment: null,
            creationDate,
            ingredientId: invalidQty,
            ingredient_qty: id
          })
          throw new Error('ingredientId is allowing invalid "qty"')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredientId',
            invalidQty,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'ingredient_qty invalid type',
      () => {
        const invalidQty: number = {} as unknown as number
        try {
          ingredientStockValidations({
            comment: null,
            creationDate,
            ingredientId: id,
            ingredient_qty: invalidQty
          })
          throw new Error('ingredient_qty is allowing invalid "qty"')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredient_qty',
            invalidQty,
            'only number allowed'
          ))
        }
        err = null
      }
    )
  }
)
