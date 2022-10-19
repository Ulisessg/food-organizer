/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import WeeklyMenu from 'models/WeeklyMenu'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/WeeklyMenu',
  () => {
    test(
      'WeeklyMenu has required methods',
      () => {
        const wm = instance()
        expect(wm.getMondayMenuId).toBeDefined()
        expect(wm.getTuesdayMenuId).toBeDefined()
        expect(wm.getWednesdayMenuId).toBeDefined()
        expect(wm.getThursdayMenuId).toBeDefined()
        expect(wm.getFridayMenuId).toBeDefined()
        expect(wm.getSaturdayMenuId).toBeDefined()
        expect(wm.getSundayMenuId).toBeDefined()

        expect(wm.setMondayMenuId).toBeDefined()
        expect(wm.setTuesdayMenuId).toBeDefined()
        expect(wm.setWednesdayMenuId).toBeDefined()
        expect(wm.setThursdayMenuId).toBeDefined()
        expect(wm.setFridayMenuId).toBeDefined()
        expect(wm.setSaturdayMenuId).toBeDefined()
        expect(wm.setSundayMenuId).toBeDefined()
      }
    )

    let err: Error | null = null
    // Constructor invalid properties
    test(
      'Constructor invalid mondayMenuId',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const wm = new WeeklyMenu(
            true,
            1,
            invalidId,
            1,
            1,
            1,
            1,
            1,
            1
          )
          throw new Error('Constructor is allowing invalid mondayMenuId')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'mondayMenuId',
            invalidId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'Constructor invalid tuesdayMenuId',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const wm = new WeeklyMenu(
            true,
            1,
            1,
            invalidId,
            1,
            1,
            1,
            1,
            1
          )

          throw new Error('Constructor is allowing invalid tuesdayMenuId')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'tuesdayMenuId',
            invalidId,
            'only number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'Constructor invalid wednesdayMenuId',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const wm = new WeeklyMenu(
            true,
            1,
            1,
            1,
            invalidId,
            1,
            1,
            1,
            1
          )

          throw new Error('Constructor is allowing invalid wednesdayMenuId')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'wednesdayMenuId',
            invalidId,
            'only number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'Constructor invalid thursdayMenuId',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const wm = new WeeklyMenu(
            true,
            1,
            1,
            1,
            1,
            invalidId,
            1,
            1,
            1
          )

          throw new Error('Constructor is allowing invalid thursdayMenuId')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'thursdayMenuId',
            invalidId,
            'only number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'Constructor invalid fridayMenuId',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const wm = new WeeklyMenu(
            true,
            1,
            1,
            1,
            1,
            1,
            invalidId,
            1,
            1
          )

          throw new Error('Constructor is allowing invalid fridayMenuId')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'fridayMenuId',
            invalidId,
            'only number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'Constructor invalid saturdayMenuId',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const wm = new WeeklyMenu(
            true,
            1,
            1,
            1,
            1,
            1,
            1,
            invalidId,
            1
          )

          throw new Error('Constructor is allowing invalid saturdayMenuId')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'saturdayMenuId',
            invalidId,
            'only number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'Constructor invalid sundayMenuId',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const wm = new WeeklyMenu(
            true,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            invalidId
          )

          throw new Error('Constructor is allowing invalid sundayMenuId')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'sundayMenuId',
            invalidId,
            'only number allowed'
          ))
        }
        err = null
      }
    )
    // Setters

    /* Prevent modifications */
    test(
      'setMondayMenuId prevent modifications',
      () => {
        const wm = instance(false)
        try {
          wm.setMondayMenuId(55)
          throw new Error('setMondayMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setTuesdayMenuId prevent modifications',
      () => {
        const wm = instance(false)
        try {
          wm.setTuesdayMenuId(55)
          throw new Error('setTuesdayMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setWednesdayMenuId prevent modifications',
      () => {
        const wm = instance(false)
        try {
          wm.setWednesdayMenuId(55)
          throw new Error('setWednesdayMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setThursdayMenuId prevent modifications',
      () => {
        const wm = instance(false)
        try {
          wm.setThursdayMenuId(55)
          throw new Error('setThursdayMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setFridayMenuId prevent modifications',
      () => {
        const wm = instance(false)
        try {
          wm.setFridayMenuId(55)
          throw new Error('setFridayMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setSaturdayMenuId prevent modifications',
      () => {
        const wm = instance(false)
        try {
          wm.setSaturdayMenuId(55)
          throw new Error('setSaturdayMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setSundayMenuId prevent modifications',
      () => {
        const wm = instance(false)
        try {
          wm.setSundayMenuId(55)
          throw new Error('setSundayMenuId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    /* Invalid type */
    test(
      'setMondayMenuId invalid type',
      () => {
        const wm = instance()
        const nId: number = null as unknown as number
        try {
          wm.setMondayMenuId(nId)
          throw new Error('setMondayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'mondayMenuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'setTuesdayMenuId invalid type',
      () => {
        const wm = instance()
        const nId: number = {} as unknown as number
        try {
          wm.setTuesdayMenuId(nId)
          throw new Error('setTuesdayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'tuesdayMenuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'setWednesdayMenuId invalid type',
      () => {
        const wm = instance()
        const nId: number = {} as unknown as number
        try {
          wm.setWednesdayMenuId(nId)
          throw new Error('setWednesdayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'wednesdayMenuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'setThursdayMenuId invalid type',
      () => {
        const wm = instance()
        const nId: number = {} as unknown as number
        try {
          wm.setThursdayMenuId(nId)
          throw new Error('setThursdayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'thursdayMenuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'setFridayMenuId invalid type',
      () => {
        const wm = instance()
        const nId: number = {} as unknown as number
        try {
          wm.setFridayMenuId(nId)
          throw new Error('setFridayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'fridayMenuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'setSaturdayMenuId invalid type',
      () => {
        const wm = instance()
        const nId: number = {} as unknown as number
        try {
          wm.setSaturdayMenuId(nId)
          throw new Error('setSaturdayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'saturdayMenuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'setSundayMenuId invalid type',
      () => {
        const wm = instance()
        const nId: number = {} as unknown as number
        try {
          wm.setSundayMenuId(nId)
          throw new Error('setSundayMenuId is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'sundayMenuId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    /* Success */

    test(
      'setMondayMenuId success',
      () => {
        const wm = instance()
        expect(wm.setMondayMenuId(3)).toStrictEqual(3)
        expect(wm.getMondayMenuId).toStrictEqual(3)
      }
    )
    test(
      'setTuesdayMenuId success',
      () => {
        const wm = instance()
        expect(wm.setTuesdayMenuId(3)).toStrictEqual(3)
        expect(wm.getTuesdayMenuId).toStrictEqual(3)
      }
    )
    test(
      'setWednesdayMenuId success',
      () => {
        const wm = instance()
        expect(wm.setWednesdayMenuId(3)).toStrictEqual(3)
        expect(wm.getWednesdayMenuId).toStrictEqual(3)
      }
    )
    test(
      'setThursdayMenuId success',
      () => {
        const wm = instance()
        expect(wm.setThursdayMenuId(3)).toStrictEqual(3)
        expect(wm.getThursdayMenuId).toStrictEqual(3)
      }
    )
    test(
      'setFridayMenuId success',
      () => {
        const wm = instance()
        expect(wm.setFridayMenuId(3)).toStrictEqual(3)
        expect(wm.getFridayMenuId).toStrictEqual(3)
      }
    )
    test(
      'setSaturdayMenuId success',
      () => {
        const wm = instance()
        expect(wm.setSaturdayMenuId(3)).toStrictEqual(3)
        expect(wm.getSaturdayMenuId).toStrictEqual(3)
      }
    )
    test(
      'setSundayMenuId success',
      () => {
        const wm = instance()
        expect(wm.setSundayMenuId(3)).toStrictEqual(3)
        expect(wm.getSundayMenuId).toStrictEqual(3)
      }
    )

    // Getters
    test(
      'getMondayMenuId',
      () => {
        const wm = instance()
        expect(wm.getMondayMenuId).toStrictEqual(1)
      }
    )
    test(
      'getTuesdayMenuId',
      () => {
        const wm = instance()
        expect(wm.getTuesdayMenuId).toStrictEqual(1)
      }
    )
    test(
      'getWednesdayMenuId',
      () => {
        const wm = instance()
        expect(wm.getWednesdayMenuId).toStrictEqual(1)
      }
    )
    test(
      'getThursdayMenuId',
      () => {
        const wm = instance()
        expect(wm.getThursdayMenuId).toStrictEqual(1)
      }
    )
    test(
      'getFridayMenuId',
      () => {
        const wm = instance()
        expect(wm.getFridayMenuId).toStrictEqual(1)
      }
    )
    test(
      'getSaturdayMenuId',
      () => {
        const wm = instance()
        expect(wm.getSaturdayMenuId).toStrictEqual(1)
      }
    )
    test(
      'getSundayMenuId',
      () => {
        const wm = instance()
        expect(wm.getSundayMenuId).toStrictEqual(1)
      }
    )
  }
)

function instance (allowModifications: boolean = true): WeeklyMenu {
  if (allowModifications) {
    return new WeeklyMenu(
      true,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    )
  }
  return new WeeklyMenu(
    false,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  )
}
