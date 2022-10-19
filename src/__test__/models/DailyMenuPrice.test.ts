/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import DailyMenuPrice from 'models/DailyMenuPrice'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/DailyMenuPrice',
  () => {
    test(
      'DailyMenuPrice has required methods',
      () => {
        const fp = instance()
        expect(fp.getMenuId).toBeDefined()
        expect(fp.setMenuId).toBeDefined()
      }
    )

    // Setters
    let err: Error | null = null

    /* Prevent modifications */
    test(
      'setMenuId preventModifications',
      () => {
        const fp = instance(false)
        try {
          fp.setMenuId(55)
          throw new Error('setMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    /* Invalid type */

    test(
      'setMenuId invalid type',
      () => {
        const fp = instance()
        const nId: number = {} as unknown as number
        try {
          fp.setMenuId(nId)
          throw new Error('setMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'menuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    /* Success */
    test(
      'setMenuId success',
      () => {
        const fp = instance()
        expect(fp.setMenuId(4)).toStrictEqual(4)
        expect(fp.getMenuId).toStrictEqual(4)
      }
    )
    // Getters
    test(
      'getMenuId',
      () => {
        const fp = instance()
        expect(fp.getMenuId).toStrictEqual(1)
      }
    )
  }
)
function instance (allowModifications: boolean = true): DailyMenuPrice {
  if (allowModifications) {
    return new DailyMenuPrice(
      true,
      1,
      1,
      100
    )
  }
  return new DailyMenuPrice(
    false,
    1,
    1,
    100
  )
}
