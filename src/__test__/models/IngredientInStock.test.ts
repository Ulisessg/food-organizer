/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import IngredientInStock from 'models/IngredientInStock'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/IngredientInStock',
  () => {
    const comInstanceAllowMod = instance()
    const comInstanceNoMod = instance(false)
    let err: Error | null = null
    test(
      'IngredientInStock has required methods',
      () => {
        expect(comInstanceAllowMod.setIngredientId).toBeDefined()
        expect(comInstanceAllowMod.setUomId).toBeDefined()
        expect(comInstanceAllowMod.setComment).toBeDefined()

        expect(comInstanceAllowMod.getIngredientId).toBeDefined()
        expect(comInstanceAllowMod.getUomId).toBeDefined()
        expect(comInstanceAllowMod.getComment).toBeDefined()
      }
    )

    /* Constructor */
    // Constructor invalid types
    test(
      'Constructor invalid ingredientId type',
      () => {
        const invalidIngredientId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const iis = new IngredientInStock(
            true,
            1,
            invalidIngredientId,
            1,
            null
          )
          throw new Error('Constructor is allowing invalid "ingredientId"')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredientId',
            invalidIngredientId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'Constructor invalid uomId type',
      () => {
        const invalidUomId: number = {} as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const iis = new IngredientInStock(
            true,
            1,
            1,
            invalidUomId,
            null
          )
          throw new Error('Constructor is allowing invalid "uomId"')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'uomId',
            invalidUomId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
    test(
      'Constructor invalid comment type',
      () => {
        const invalidComment: string = {} as unknown as string
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const iis = new IngredientInStock(
            true,
            1,
            1,
            1,
            invalidComment
          )
          throw new Error('Constructor is allowing invalid "comment"')
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

    /* Setters */
    // Prevent modifications
    test(
      'setIngredientId preventModifications',
      () => {
        try {
          comInstanceNoMod.setIngredientId(22)
          throw new Error('setIngredientId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )
    test(
      'setUomId preventModifications',
      () => {
        try {
          comInstanceNoMod.setUomId(22)
          throw new Error('setUomId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )
    test(
      'setComment preventModifications',
      () => {
        try {
          comInstanceNoMod.setComment('Expiration date: idk')
          throw new Error('setComment is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    // Invalid types
    test(
      'setComment invalid type',
      () => {
        const invalidComment: string = {} as unknown as string
        try {
          const iis = instance()
          iis.setComment(invalidComment)
          throw new Error('setComment is allowing invalid "comment"')
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
      'setIngredientId invalid type',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          const iis = instance()
          iis.setIngredientId(invalidId)
          throw new Error('setIngredientId is allowing invalid "id"')
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
      'setUomId invalid type',
      () => {
        const invalidId: number = {} as unknown as number
        try {
          const iis = instance()
          iis.setUomId(invalidId)
          throw new Error('setUomId is allowing invalid "id"')
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
    // Success
    test(
      'setIngredientId success',
      () => {
        const iis = instance()
        expect(iis.setIngredientId(44)).toStrictEqual(44)
        expect(iis.getIngredientId).toStrictEqual(44)
      }
    )
    test(
      'setUomId success',
      () => {
        const iis = instance()
        expect(iis.setUomId(44)).toStrictEqual(44)
        expect(iis.getUomId).toStrictEqual(44)
      }
    )
    test(
      'setComment success',
      () => {
        const iis = instance()
        expect(iis.setComment('Never expire')).toStrictEqual('Never expire')
        expect(iis.getComment).toStrictEqual('Never expire')
      }
    )

    /* Getters */
    test(
      'getIngredientId',
      () => {
        expect(comInstanceAllowMod.getIngredientId).toStrictEqual(1)
      }
    )
    test(
      'getUomId',
      () => {
        expect(comInstanceAllowMod.getUomId).toStrictEqual(1)
      }
    )
    test(
      'getComment',
      () => {
        expect(comInstanceAllowMod.getComment).toStrictEqual('Expiration Date: yesterday :(')
      }
    )
  }
)

function instance (allowModifications: boolean = true): IngredientInStock {
  if (allowModifications) {
    return new IngredientInStock(
      true,
      1,
      1,
      1,
      'Expiration Date: yesterday :('
    )
  }
  return new IngredientInStock(
    false,
    1,
    1,
    1,
    'Expiration Date: yesterday :('
  )
}
