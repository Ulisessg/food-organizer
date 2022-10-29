/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import ingredientValidations from 'models/ingredientValidations'

describe(
  'models/ingredientValidations',
  () => {
    const creationDate = dayjs().toISOString()
    const id = 1
    test(
      'name invalid type',
      () => {
        const nName: string = null as unknown as string
        try {
          ingredientValidations(
            'name',
            nName,
            creationDate,
            id
          )
          throw new Error('name is allowing invalid "name" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'name',
            nName,
            'only string allowed'
          ))
        }
      }
    )
    test(
      'preferredPurchasePlaceId invalid type',
      () => {
        const nId: number = 'Cien' as unknown as number
        try {
          ingredientValidations(
            'preferredPurchasePlaceId',
            nId,
            creationDate,
            id
          )
          throw new Error('preferredPurchasePlaceId is allowing invalid "preferredPurchasePlaceId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'preferredPurchasePlaceId',
            nId,
            'only integer number allowed'
          ))
        }
      }
    )
    test(
      'uomtId invalid type',
      () => {
        const nId: number = 'Treinta' as unknown as number
        try {
          ingredientValidations(
            'uomtId',
            nId,
            creationDate,
            id
          )
          throw new Error('uomtId is allowing invalid "uomtId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'uomtId',
            nId,
            'only integer number allowed'
          ))
        }
      }
    )
    test(
      'image invalid type',
      () => {
        const nImg: string = {} as unknown as string
        try {
          ingredientValidations(
            'image',
            nImg,
            creationDate,
            id
          )
          throw new Error('image is allowing invalid "image" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'image',
            nImg,
            'only string or null allowed'
          ))
        }
      }
    )

    test(
      'comment invalid type',
      () => {
        const invalidComment: string = {} as unknown as string
        try {
          ingredientValidations(
            'comment',
            invalidComment,
            creationDate,
            id
          )
          throw new Error('comment is allowing invalid type')
        } catch (error) {
          const err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'comment',
            invalidComment,
            'only string allowed'
          ))
        }
      }
    )
    // Setters invalids
    test(
      'name invalid',
      () => {
        const nName: string = 'Papas!'
        try {
          ingredientValidations(
            'name',
            nName,
            creationDate,
            id
          )
          throw new Error('name is allowing invalid "name" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'name',
            nName,
            'only letters and spaces allowed'
          ))
        }
      }
    )
    test(
      'image invalid',
      () => {
        const nImage: string = 'fakeulr!'
        try {
          ingredientValidations(
            'image',
            nImage,
            creationDate,
            id
          )
          throw new Error('image is allowing invalid "Image" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'image',
            nImage,
            'only url allowed'
          ))
        }
      }
    )
  }
)
