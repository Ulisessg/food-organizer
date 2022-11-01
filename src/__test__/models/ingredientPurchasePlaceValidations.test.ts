/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import dayjs from 'dayjs'
import ingredientsPurchasePlacesValidations from 'models/ingredientPurchasePlaceValidations'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

describe(
  'models/ingredientsPurchasePlacesValidations',
  () => {
    const id = 1
    const creationDate = dayjs().toISOString()
    test(
      'ingredientId invalid type',
      () => {
        const ingredientId = {} as unknown as number
        try {
          ingredientsPurchasePlacesValidations({
            creationDate,
            ingredientId,
            purchasePlaceId: id
          })
          throw new Error('ingredientId is allowing invalid "ingredientId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'ingredientId',
            ingredientId,
            'only integer number allowed'
          ))
        }
      }
    )
    test(
      'setPurchasePlaceId invalid type',
      () => {
        const purchasePlaceId = {} as unknown as number
        try {
          ingredientsPurchasePlacesValidations({
            creationDate,
            ingredientId: id,
            purchasePlaceId
          })
          throw new Error('setPurchasePlaceId is allowing invalid "purchasePlaceId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'purchasePlaceId',
            purchasePlaceId,
            'only integer number allowed'
          ))
        }
      }
    )
  }
)
