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
          ingredientValidations({
            comment: null,
            creationDate,
            image: null,
            name: nName,
            uomId: id
          })
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
      'uomId invalid type',
      () => {
        const nId: number = 'Treinta' as unknown as number
        try {
          ingredientValidations({
            comment: null,
            creationDate,
            image: null,
            name: 'any',
            uomId: nId
          })
          throw new Error('uomId is allowing invalid "uomId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'uomId',
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
          ingredientValidations({
            comment: null,
            creationDate,
            image: nImg,
            name: 'any',
            uomId: id
          })
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
          ingredientValidations({
            comment: invalidComment,
            creationDate,
            image: null,
            name: 'any',
            uomId: id
          })
          throw new Error('comment is allowing invalid type')
        } catch (error) {
          const err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'comment',
            invalidComment,
            'only string or null allowed'
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
          ingredientValidations({
            comment: null,
            creationDate,
            image: null,
            name: nName,
            uomId: id
          })
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
          ingredientValidations({
            comment: null,
            creationDate,
            image: nImage,
            name: 'any',
            uomId: id
          })
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
