/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import DailyMenu from 'models/DailyMenu'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/DailyMenu',
  () => {
    test(
      'DailyMenu has required methods',
      () => {
        const dm = instance()
        expect(dm.getVegetableId).toBeDefined()
        expect(dm.getCarbohydratesId).toBeDefined()
        expect(dm.getMeatId).toBeDefined()
        expect(dm.setVegetableId).toBeDefined()
        expect(dm.setCarbohydratesId).toBeDefined()
        expect(dm.setMeatId).toBeDefined()
      }
    )
    // Setters
    let err: Error | null = null

    /* Prevent modifications */
    test(
      'setVegetablesId preventModifications',
      () => {
        const dm = instance(false)
        try {
          dm.setVegetableId(44)
          throw new Error('setVegetablesId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setCarbohydratesId preventModifications',
      () => {
        const dm = instance(false)
        try {
          dm.setCarbohydratesId(44)
          throw new Error('setCarbohydratesId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setMeatId preventModifications',
      () => {
        const dm = instance(false)
        try {
          dm.setMeatId(44)
          throw new Error('setMeatId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    /* Invalid types */

    test(
      'setVegetablesId invalid type',
      () => {
        const dm = instance()
        const nId: number = null as unknown as number
        try {
          dm.setVegetableId(nId)
          throw new Error('setVegetablesId is allowing invalid id type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'vegetableId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'setCarbohydratesId invalid type',
      () => {
        const dm = instance()
        const nId: number = null as unknown as number
        try {
          dm.setCarbohydratesId(nId)
          throw new Error('setCarbohydratesId is allowing invalid id type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'carbohydratesId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'setMeatId invalid type',
      () => {
        const dm = instance()
        const nId: number = null as unknown as number
        try {
          dm.setMeatId(nId)
          throw new Error('setMeatId is allowing invalid id type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'meatId',
            nId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    /* Success */

    test(
      'setVegetablesId success',
      () => {
        const dm = instance()
        expect(dm.setVegetableId(55)).toStrictEqual(55)
        expect(dm.getVegetableId).toStrictEqual(55)
      }
    )
    test(
      'setCarbohydratesId success',
      () => {
        const dm = instance()
        expect(dm.setCarbohydratesId(55)).toStrictEqual(55)
        expect(dm.getCarbohydratesId).toStrictEqual(55)
      }
    )
    test(
      'setMeatId success',
      () => {
        const dm = instance()
        expect(dm.setMeatId(55)).toStrictEqual(55)
        expect(dm.getMeatId).toStrictEqual(55)
      }
    )

    // Getters
    test(
      'getVegetableId',
      () => {
        const dm = instance()
        expect(dm.getVegetableId).toStrictEqual(1)
      }
    )
    test(
      'getCarbohydratesId',
      () => {
        const dm = instance()
        expect(dm.getCarbohydratesId).toStrictEqual(1)
      }
    )
    test(
      'getMeatId',
      () => {
        const dm = instance()
        expect(dm.getMeatId).toStrictEqual(1)
      }
    )
  }
)

function instance (allowModifications: boolean = true): DailyMenu {
  if (allowModifications) {
    return new DailyMenu(
      true,
      1,
      1,
      1,
      1
    )
  }
  return new DailyMenu(
    false,
    1,
    1,
    1,
    1
  )
}
