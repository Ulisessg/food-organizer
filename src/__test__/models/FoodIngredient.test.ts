/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import FoodIngredient from 'models/FoodIngredient'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/FoodIngredient',
  () => {
    test(
      'FoodIngredient has required methods',
      () => {
        const fi = instance()
        expect(fi.getFoodId).toBeDefined()
        expect(fi.getIngredientId).toBeDefined()
        expect(fi.setFoodId).toBeDefined()
        expect(fi.setIngredientId).toBeDefined()
      }
    )

    // Setters

    let err: Error | null = null

    /* Prevent modifications */

    test(
      'setFoodId preventModifications',
      () => {
        const fi = instance(false)
        try {
          fi.setFoodId(2)
          throw new Error('setFoodId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setIngredientId preventModifications',
      () => {
        const fi = instance(false)
        try {
          fi.setIngredientId(2)
          throw new Error('setIngredientId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    /* Invalid type */

    test(
      'setFoodId invalid type',
      () => {
        const fi = instance()
        const nId: number = {} as unknown as number
        try {
          fi.setFoodId(nId)
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

    test(
      'setIngredientId invalid type',
      () => {
        const fi = instance()
        const nId: number = {} as unknown as number
        try {
          fi.setIngredientId(nId)
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
      'setFoodId success',
      () => {
        const fi = instance()
        expect(fi.setFoodId(4)).toStrictEqual(4)
        expect(fi.getFoodId).toStrictEqual(4)
      }
    )

    test(
      'setIngredientId success',
      () => {
        const fi = instance()
        expect(fi.setIngredientId(4)).toStrictEqual(4)
        expect(fi.getIngredientId).toStrictEqual(4)
      }
    )

    // Getters
    test(
      'getFoodId',
      () => {
        const fi = instance()
        expect(fi.getFoodId).toStrictEqual(1)
      }
    )
    test(
      'getIngredientId',
      () => {
        const fi = instance()
        expect(fi.getIngredientId).toStrictEqual(1)
      }
    )
  }
)

function instance (allowModifications: boolean = true): FoodIngredient {
  if (allowModifications) {
    return new FoodIngredient(
      true,
      1,
      1,
      1
    )
  }
  return new FoodIngredient(
    false,
    1,
    1,
    1
  )
}
