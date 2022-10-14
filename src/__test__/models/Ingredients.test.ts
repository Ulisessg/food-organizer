/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import Ingredients from 'models/Ingredients'

describe(
  'models/Ingredients',
  () => {
    test(
      'Ingredients has required methods',
      () => {
        const ing = instance()
        expect(ing.getName).toBeDefined()
        expect(ing.setName).toBeDefined()
        expect(ing.getPreferredPurchasePlaceId).toBeDefined()
        expect(ing.setPreferredPurchasePlaceId).toBeDefined()
        expect(ing.getUomtId).toBeDefined()
        expect(ing.setUomtId).toBeDefined()
        expect(ing.getImage).toBeDefined()
        expect(ing.setImage).toBeDefined()
      }
    )

    // Getters
    test(
      'getName',
      () => {
        const ing = instance()
        expect(ing.getName).toStrictEqual('Jitomate')
      }
    )
    test(
      'getPreferredPurchasePlaceId',
      () => {
        const ing = instance()
        expect(ing.getPreferredPurchasePlaceId).toStrictEqual(1)
      }
    )
    test(
      'getUomtId',
      () => {
        const ing = instance()
        expect(ing.getUomtId).toStrictEqual(1)
      }
    )
    test(
      'getImage',
      () => {
        const ing = instance()
        expect(ing.getImage).toStrictEqual('https://jsonplaceholder.typicode.com/')
      }
    )

    // Setters preventModifications
    test(
      'setName preventModifications',
      () => {
        const ing = instance(false)
        try {
          ing.setName('Cebolla')
          throw new Error('setName is allowing modifications')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )
    test(
      'setPreferredPurchasePlaceId preventModifications',
      () => {
        const ing = instance(false)
        try {
          ing.setPreferredPurchasePlaceId(66)
          throw new Error('setName is allowing modifications')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )
    test(
      'setUomtId preventModifications',
      () => {
        const ing = instance(false)
        try {
          ing.setUomtId(66)
          throw new Error('setName is allowing modifications')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )
    test(
      'setImage preventModifications',
      () => {
        const ing = instance(false)
        try {
          ing.setImage('xmlhttp')
          throw new Error('setImage is allowing modifications')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    // Setters success

    test(
      'setName success',
      () => {
        const ing = instance()
        expect(ing.setName('Cilantro')).toStrictEqual('Cilantro')
        expect(ing.getName).toStrictEqual('Cilantro')
      }
    )
    test(
      'setPreferredPurchasePlaceId success',
      () => {
        const ing = instance()
        expect(ing.setPreferredPurchasePlaceId(70)).toStrictEqual(70)
        expect(ing.getPreferredPurchasePlaceId).toStrictEqual(70)
      }
    )
    test(
      'setUomtId success',
      () => {
        const ing = instance()
        expect(ing.setUomtId(80)).toStrictEqual(80)
        expect(ing.getUomtId).toStrictEqual(80)
      }
    )
    test(
      'setImage success',
      () => {
        const ing = instance()
        expect(ing.setImage('https://jsonplaceholder.typicode.com/post')).toStrictEqual('https://jsonplaceholder.typicode.com/post')
        expect(ing.getImage).toStrictEqual('https://jsonplaceholder.typicode.com/post')
      }
    )
    // Setters invalid type
    test(
      'setName invalid type',
      () => {
        const ing = instance()
        const nName: string = null as unknown as string
        try {
          ing.setName(nName)
          throw new Error('setName is allowing invalid name type')
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
      'setPreferredPurchasePlaceId invalid type',
      () => {
        const ing = instance()
        const nId: number = 'Cien' as unknown as number
        try {
          ing.setPreferredPurchasePlaceId(nId)
          throw new Error('setPreferredPurchasePlaceId is allowing invalid "preferredPurchasePlaceId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'preferredPurchasePlaceId',
            nId,
            'only number allowed'
          ))
        }
      }
    )
    test(
      'setUomtId invalid type',
      () => {
        const ing = instance()
        const nId: number = 'Treinta' as unknown as number
        try {
          ing.setUomtId(nId)
          throw new Error('setUomtId is allowing invalid "uomtId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'uomtId',
            nId,
            'only number allowed'
          ))
        }
      }
    )
    test(
      'setImage invalid type',
      () => {
        const ing = instance()
        const nImg: string = {} as unknown as string
        try {
          ing.setImage(nImg)
          throw new Error('setImage is allowing invalid "image" type')
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
    // Setters invalids
    test(
      'setName invalid',
      () => {
        const ing = instance()
        const nName: string = 'Papas!'
        try {
          ing.setName(nName)
          throw new Error('setName is allowing invalid "name" type')
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
      'setImage invalid',
      () => {
        const ing = instance()
        const nImage: string = 'fakeulr!'
        try {
          ing.setImage(nImage)
          throw new Error('setImage is allowing invalid "Image" type')
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

// eslint-disable-next-line func-style
function instance (allowModifications: boolean = true): Ingredients {
  if (allowModifications) {
    return new Ingredients(
      true,
      1,
      'Jitomate',
      1,
      1,
      'https://jsonplaceholder.typicode.com/'
    )
  }
  return new Ingredients(
    false,
    1,
    'Jitomate',
    1,
    1,
    'https://jsonplaceholder.typicode.com/'
  )
}
