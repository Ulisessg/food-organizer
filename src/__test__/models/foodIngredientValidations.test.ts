/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import dayjs from 'dayjs'
import foodIngredientValidations from 'models/foodIngredientValidations'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/foodIngredientValidations',
  () => {
    let err: Error | null = null
    const id = 1
    const creationDate = dayjs().toISOString()
    test(
      'foodId invalid type',
      () => {
        const nId: number = {} as unknown as number
        try {
          foodIngredientValidations({
            creationDate,
            foodId: nId,
            ingredientId: id
          })
          throw new Error('foodId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'foodId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'ingredientId invalid type',
      () => {
        const nId: number = {} as unknown as number
        try {
          foodIngredientValidations({ creationDate, foodId: id, ingredientId: nId })
          throw new Error('ingredientId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredientId',
            nId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
  }
)
