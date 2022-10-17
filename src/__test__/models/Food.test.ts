/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import Food from 'models/Food'

describe(
  'models/Food',
  () => {
    test(
      'Food has required methods',
      () => {
        const food = instance()
        expect(food.getName).toBeDefined()
        expect(food.getUsedCounter).toBeDefined()
        expect(food.getPreparationTime).toBeDefined()
        expect(food.getScore).toBeDefined()
        expect(food.getFoodTypeId).toBeDefined()
        expect(food.getImage).toBeDefined()
        expect(food.setName).toBeDefined()
        expect(food.setUsedCounter).toBeDefined()
        expect(food.setPreparationTime).toBeDefined()
        expect(food.setScore).toBeDefined()
        expect(food.setFoodTypeId).toBeDefined()
        expect(food.setImage).toBeDefined()
      }
    )
    // Getters
    const foodGetters = instance()
    test(
      'getName',
      () => {
        expect(foodGetters.getName).toStrictEqual('Caldo de gallina')
      }
    )
    test(
      'getUsedCounter',
      () => {
        expect(foodGetters.getUsedCounter).toStrictEqual(0)
      }
    )
    test(
      'getPreparationTime',
      () => {
        expect(foodGetters.getPreparationTime).toStrictEqual(44)
      }
    )
    test(
      'getScore',
      () => {
        expect(foodGetters.getScore).toStrictEqual(0)
      }
    )
    test(
      'getFoodTypeId',
      () => {
        expect(foodGetters.getFoodTypeId).toStrictEqual(1)
      }
    )
    test(
      'getImage',
      () => {
        expect(foodGetters.getImage).toStrictEqual('https://jsonplaceholder.typicode.com/todos/1')
      }
    )
    let err: Error | null = null

    /**
     *
     * Prevent modifications
     */
    test(
      'setName preventModifications',
      () => {
        const food = instance(false)
        try {
          food.setName('new name')
          throw new Error('setName is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setUsedCounter preventModifications',
      () => {
        const food = instance(false)
        try {
          food.setUsedCounter(4)
          throw new Error('setUsedCounter is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setPreparationTime preventModifications',
      () => {
        const food = instance(false)
        try {
          food.setPreparationTime(90)
          throw new Error('setPreparationTime is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setScore preventModifications',
      () => {
        const food = instance(false)
        try {
          food.setScore(4)
          throw new Error('setScore is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setScore preventModifications',
      () => {
        const food = instance(false)
        try {
          food.setScore(4)
          throw new Error('setScore is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setFoodTypeId preventModifications',
      () => {
        const food = instance(false)
        try {
          food.setFoodTypeId(4)
          throw new Error('setFoodTypeId is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setImage preventModifications',
      () => {
        const food = instance(false)
        try {
          food.setImage('https://jsonplaceholder.typicode.com/todos/1')
          throw new Error('setImage is allowing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    /**
     * Invalid types
     */

    test(
      'setName invalid type',
      () => {
        const food = instance()
        const name: string = {} as unknown as string
        try {
          food.setName(name)
          throw new Error('setName is allowing invalid type')
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
      'setUsedCounter invalid type',
      () => {
        const food = instance()
        const usedCounter: number = {} as unknown as number
        try {
          food.setUsedCounter(usedCounter)
          throw new Error('setUsedCounter is allowing invalid type')
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
      'setPreparationTime invalid type',
      () => {
        const food = instance()
        const prepTime: number = null as unknown as number
        try {
          food.setPreparationTime(prepTime)
          throw new Error('setPreparationTime is allowing invalid type')
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
      'setScore invalid type',
      () => {
        const food = instance()
        const score: number = null as unknown as number
        try {
          food.setScore(score)
          throw new Error('setScore is allowing invalid type')
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
      'setFoodTypeId invalid type',
      () => {
        const food = instance()
        const foodTypeId: number = null as unknown as number
        try {
          food.setFoodTypeId(foodTypeId)
          throw new Error('setFoodTypeId is allowing invalid type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'foodTypeId',
            foodTypeId,
            'only number allowed'
          ))
        }
        err = null
      }
    )

    test(
      'setImage invalid type',
      () => {
        const food = instance()
        const image: string = {} as unknown as string
        try {
          food.setImage(image)
          throw new Error('setImage is allowing invalid type')
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
          food.setImage(image2)
          throw new Error('setImage is allowing invalid type')
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
      'setImage invalid url',
      () => {
        const food = instance()
        const image: string = '!° Invalid Url'
        try {
          food.setImage(image)
          throw new Error('setImage is allowing invalid url')
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
      'setName invalid name',
      () => {
        const food = instance()
        const name: string = '!° Invalid nam3'
        try {
          food.setName(name)
          throw new Error('setName is allowing invalid name')
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

    /**
     * Success
     */

    test(
      'setUsedCounter success',
      () => {
        const food = instance()
        expect(food.setUsedCounter(8)).toStrictEqual(8)
        expect(food.getUsedCounter).toStrictEqual(8)
      }
    )
    test(
      'setPreparationTime success',
      () => {
        const food = instance()
        expect(food.setPreparationTime(90)).toStrictEqual(90)
        expect(food.getPreparationTime).toStrictEqual(90)
      }
    )
    test(
      'setScore success',
      () => {
        const food = instance()
        expect(food.setScore(4)).toStrictEqual(4)
        expect(food.getScore).toStrictEqual(4)
      }
    )
    test(
      'setFoodTypeId success',
      () => {
        const food = instance()
        expect(food.setFoodTypeId(4)).toStrictEqual(4)
        expect(food.getFoodTypeId).toStrictEqual(4)
      }
    )
    test(
      'setName success',
      () => {
        const food = instance()
        expect(food.setName('Huevo cocido')).toStrictEqual('Huevo cocido')
        expect(food.getName).toStrictEqual('Huevo cocido')
      }
    )
    test(
      'setImage success',
      () => {
        const nUrl = 'https://jsonplaceholder.typicode.com/todos/4'
        const food = instance()
        expect(food.setImage(nUrl)).toStrictEqual(nUrl)
        expect(food.getImage).toStrictEqual(nUrl)
      }
    )
  }
)

function instance (allowModifications: boolean = true): Food {
  if (allowModifications) {
    return new Food(
      true,
      1,
      'Caldo de gallina',
      0,
      44,
      0,
      1,
      // Fake url
      'https://jsonplaceholder.typicode.com/todos/1'
    )
  }
  return new Food(
    false,
    1,
    'Caldo de gallina',
    0,
    44,
    0,
    1,
    // Fake url
    'https://jsonplaceholder.typicode.com/todos/1'
  )
}
