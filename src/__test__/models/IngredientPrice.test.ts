/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import IngredientPrice from 'models/IngredientPrice'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/IngredientPrice',
  () => {
    test(
      'IngredientPrice has required methods',
      () => {
        const fp = instance()
        expect(fp.getIngredientId).toBeDefined()
        expect(fp.setIngredientId).toBeDefined()
      }
    )

    // Setters
    let err: Error | null = null

    /* Prevent modifications */
    test(
      'setIngredientId preventModifications',
      () => {
        const fp = instance(false)
        try {
          fp.setIngredientId(55)
          throw new Error('setIngredientId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    /* Invalid type */

    test(
      'setIngredientId invalid type',
      () => {
        const fp = instance()
        const nId: number = {} as unknown as number
        try {
          fp.setIngredientId(nId)
          throw new Error('setIngredientId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredientId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    /* Success */
    test(
      'setIngredientId success',
      () => {
        const fp = instance()
        expect(fp.setIngredientId(4)).toStrictEqual(4)
        expect(fp.getIngredientId).toStrictEqual(4)
      }
    )
    // Getters
    test(
      'getIngredientId',
      () => {
        const fp = instance()
        expect(fp.getIngredientId).toStrictEqual(1)
      }
    )
  }
)
function instance (allowModifications: boolean = true): IngredientPrice {
  if (allowModifications) {
    return new IngredientPrice(
      true,
      1,
      1,
      100
    )
  }
  return new IngredientPrice(
    false,
    1,
    1,
    100
  )
}
