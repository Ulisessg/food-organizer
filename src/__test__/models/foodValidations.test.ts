/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import foodValidations from 'models/foodValidations'

describe(
  'models/foodValidations',
  () => {
    let err: Error | null = null
    const id = 1
    const creationDate = dayjs().toISOString()
    test(
      'name invalid type',
      () => {
        const name: string = {} as unknown as string
        try {
          foodValidations(
            'name',
            name,
            creationDate,
            id
          )
          throw new Error('name is allowing invalid type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'name',
            name,
            'only string allowed'
          ))
        }
        err = null
      }
    )

    test(
      'usedCounter invalid type',
      () => {
        const usedCounter: number = {} as unknown as number
        try {
          foodValidations(
            'usedCounter',
            usedCounter,
            creationDate,
            id
          )
          throw new Error('usedCounter is allowing invalid type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'usedCounter',
            usedCounter,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'preparationTime invalid type',
      () => {
        const prepTime: number = null as unknown as number
        try {
          foodValidations(
            'preparationTime',
            prepTime,
            creationDate,
            id
          )
          throw new Error('preparationTime is allowing invalid type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'preparationTime',
            prepTime,
            'only number allowed'
          ))
        }

        err = null
      }
    )

    test(
      'score invalid type',
      () => {
        const score: number = null as unknown as number
        try {
          foodValidations(
            'score',
            score,
            creationDate,
            id
          )
          throw new Error('score is allowing invalid type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'score',
            score,
            'only number allowed'
          ))
        }

        err = null
      }
    )

    test(
      'foodTypeId invalid type',
      () => {
        const foodTypeId: number = null as unknown as number
        try {
          foodValidations(
            'foodTypeId',
            foodTypeId,
            creationDate,
            id
          )
          throw new Error('foodTypeId is allowing invalid type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'foodTypeId',
            foodTypeId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'image invalid type',
      () => {
        const image: string = {} as unknown as string
        try {
          foodValidations(
            'image',
            image,
            creationDate,
            id
          )
          throw new Error('image is allowing invalid type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'image',
            image,
            'only url allowed'
          ))
        }
        const image2: string = 43 as unknown as string
        try {
          foodValidations(
            'image',
            image2,
            creationDate,
            id
          )
          throw new Error('image is allowing invalid type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'image',
            image2,
            'only url allowed'
          ))
        }
        err = null
      }
    )

    /**
     * Invalid properties formats
     */
    test(
      'image invalid url format',
      () => {
        const image: string = '!° Invalid Url'
        try {
          foodValidations(
            'image',
            image,
            creationDate,
            id
          )
          throw new Error('image is allowing invalid url')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'image',
            image,
            'only url allowed'
          ))
        }
        err = null
      }
    )

    test(
      'name invalid name format',
      () => {
        const name: string = '!° Invalid nam3'
        try {
          foodValidations(
            'name',
            name,
            creationDate,
            id
          )
          throw new Error('name is allowing invalid name')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'name',
            name,
            'only letters and spaces allowed'
          ))
        }
        err = null
      }
    )
  }
)
