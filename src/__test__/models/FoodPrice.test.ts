/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import FoodPrice from 'models/FoodPrice'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/FoodPrice',
  () => {
    test(
      'FoodPrice has required methods',
      () => {
        const fp = instance()
        expect(fp.getFoodId).toBeDefined()
        expect(fp.setFoodId).toBeDefined()
      }
    )

    // Setters
    let err: Error | null = null

    /* Prevent modifications */
    test(
      'setFoodId preventModifications',
      () => {
        const fp = instance(false)
        try {
          fp.setFoodId(55)
          throw new Error('setFoodId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    /* Invalid type */

    test(
      'setFoodId invalid type',
      () => {
        const fp = instance()
        const nId: number = {} as unknown as number
        try {
          fp.setFoodId(nId)
          throw new Error('setFoodId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'foodId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    /* Success */
    test(
      'setFoodId success',
      () => {
        const fp = instance()
        expect(fp.setFoodId(4)).toStrictEqual(4)
        expect(fp.getFoodId).toStrictEqual(4)
      }
    )
    // Getters
    test(
      'getFoodId',
      () => {
        const fp = instance()
        expect(fp.getFoodId).toStrictEqual(1)
      }
    )
  }
)
function instance (allowModifications: boolean = true): FoodPrice {
  if (allowModifications) {
    return new FoodPrice(
      true,
      1,
      1,
      100
    )
  }
  return new FoodPrice(
    false,
    1,
    1,
    100
  )
}
