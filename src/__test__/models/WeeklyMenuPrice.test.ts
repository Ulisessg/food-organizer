/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import WeeklyMenuPrice from 'models/WeeklyMenuPrice'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/WeeklyMenuPrice',
  () => {
    test(
      'WeeklyMenuPrice has required methods',
      () => {
        const fp = instance()
        expect(fp.getWeeklyMenuId).toBeDefined()
        expect(fp.setWeeklyMenuId).toBeDefined()
      }
    )

    // Setters
    let err: Error | null = null

    /* Prevent modifications */
    test(
      'setWeeklyMenuId preventModifications',
      () => {
        const fp = instance(false)
        try {
          fp.setWeeklyMenuId(55)
          throw new Error('setWeeklyMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    /* Invalid type */

    test(
      'setWeeklyMenuId invalid type',
      () => {
        const fp = instance()
        const nId: number = {} as unknown as number
        try {
          fp.setWeeklyMenuId(nId)
          throw new Error('setWeeklyMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'weeklyMenuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    /* Success */
    test(
      'setWeeklyMenuId success',
      () => {
        const fp = instance()
        expect(fp.setWeeklyMenuId(4)).toStrictEqual(4)
        expect(fp.getWeeklyMenuId).toStrictEqual(4)
      }
    )
    // Getters
    test(
      'getWeeklyMenuId',
      () => {
        const fp = instance()
        expect(fp.getWeeklyMenuId).toStrictEqual(1)
      }
    )
  }
)
function instance (allowModifications: boolean = true): WeeklyMenuPrice {
  if (allowModifications) {
    return new WeeklyMenuPrice(
      true,
      1,
      1,
      100
    )
  }
  return new WeeklyMenuPrice(
    false,
    1,
    1,
    100
  )
}
