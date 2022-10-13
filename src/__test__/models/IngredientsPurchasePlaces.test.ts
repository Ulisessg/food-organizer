/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import IngredientsPurchasePlaces from 'models/IngredientsPurchasePlaces'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/IngredientsPurchasePlaces',
  () => {
    test(
      'IngredientsPurchasePlaces has required methods',
      () => {
        const ipp = instance()
        expect(ipp.getIngredientId).toBeDefined()
        expect(ipp.getPurchasePlaceId).toBeDefined()
        expect(ipp.setIngredientId).toBeDefined()
        expect(ipp.setPurchasePlaceId).toBeDefined()
      }
    )
    test(
      'Constructor invalid "ingredientId" type',
      () => {
        const ingredientId: number = 'Uno' as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const ipp = new IngredientsPurchasePlaces(
            false,
            1,
            ingredientId,
            2
          )
          throw new Error('Constructor is allowing invalid "ingredientId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredientId',
            ingredientId,
            'only number allowed'
          ))
        }
      }
    )
    test(
      'Constructor invalid "purchasePlaceId" type',
      () => {
        const purchasePlaceId: number = 'Uno' as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const ipp = new IngredientsPurchasePlaces(
            false,
            1,
            3,
            purchasePlaceId
          )
          throw new Error('Constructor is allowing invalid "purchasePlaceId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'purchasePlaceId',
            purchasePlaceId,
            'only number allowed'
          ))
        }
      }
    )
    test(
      'setIngredientId preventModifications',
      () => {
        const ipp = new IngredientsPurchasePlaces(
          false,
          1,
          11,
          1
        )
        try {
          ipp.setIngredientId(67)
          throw new Error('setIngredientId is allowing modifications')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )
    test(
      'setPurchasePlaceId preventModifications',
      () => {
        const ipp = new IngredientsPurchasePlaces(
          false,
          1,
          11,
          1
        )
        try {
          ipp.setPurchasePlaceId(67)
          throw new Error('setPurchasePlaceId is allowing modifications')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    test(
      'setIngredientId',
      () => {
        const ipp = instance()
        expect(ipp.getIngredientId).toStrictEqual(1)
        expect(ipp.setIngredientId(44)).toStrictEqual(44)
        expect(ipp.getIngredientId).toStrictEqual(44)
      }
    )
    test(
      'setPurchasePlaceId',
      () => {
        const ipp = instance()
        expect(ipp.getPurchasePlaceId).toStrictEqual(1)
        expect(ipp.setPurchasePlaceId(44)).toStrictEqual(44)
        expect(ipp.getPurchasePlaceId).toStrictEqual(44)
      }
    )
    test(
      'setIngredientId invalid type',
      () => {
        const ipp = instance()
        const ingredientId = {} as unknown as number
        try {
          ipp.setIngredientId(ingredientId)
          throw new Error('setIngredientId is allowing invalid "ingredientId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredientId',
            ingredientId,
            'only number allowed'
          ))
        }
      }
    )
    test(
      'setPurchasePlaceId invalid type',
      () => {
        const ipp = instance()
        const purchasePlaceId = {} as unknown as number
        try {
          ipp.setPurchasePlaceId(purchasePlaceId)
          throw new Error('setPurchasePlaceId is allowing invalid "purchasePlaceId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'purchasePlaceId',
            purchasePlaceId,
            'only number allowed'
          ))
        }
      }
    )
  }
)

// eslint-disable-next-line func-style
function instance (): IngredientsPurchasePlaces {
  return new IngredientsPurchasePlaces(
    true,
    1,
    1,
    1
  )
}
