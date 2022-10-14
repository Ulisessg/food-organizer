/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import FoodType from 'models/FoodType'

describe(
  'modles/FoodType',
  () => {
    test(
      'FoodType has required methods',
      () => {
        const ft = new FoodType(
          false,
          1,
          'Carne'
        )
        expect(ft.getName).toBeDefined()
        expect(ft.setName).toBeDefined()
      }
    )
    test(
      'getName',
      () => {
        const ft = instance()
        expect(ft.getName).toStrictEqual('Carne')
      }
    )

    test(
      'Constructor: invalid name',
      () => {
        const nameProp = '!Vegetales'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const ft = new FoodType(
            false,
            1,
            nameProp
          )
          throw new Error('Constructor is allowing invalid "name"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'name',
            nameProp,
            'only letters and spaces allowed'
          ))
        }
      }
    )
    test(
      'Constructor: invalid name type',
      () => {
        const nameProp: string = null as unknown as string
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const ft = new FoodType(
            false,
            1,
            nameProp
          )
          throw new Error('Constructor is allowing invalid "name" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'name',
            nameProp,
            'only string allowed'
          ))
        }
      }
    )

    test(
      'setName success',
      () => {
        const ft = instance()
        expect(ft.getName).toStrictEqual('Carne')
        expect(ft.setName('Proteina')).toStrictEqual('Proteina')
        expect(ft.getName).toStrictEqual('Proteina')
      }
    )

    test(
      'setName preventModifications',
      () => {
        const ft = instance(false)
        try {
          ft.setName('Any')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    test(
      'setName invalid "name"',
      () => {
        const ft = instance()
        const nName: string = '!Vegetales/'
        try {
          ft.setName(nName)
          throw new Error('setName is allowing invalid "name"')
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
      'setName invalid "name" type',
      () => {
        const ft = instance()
        const nName: string = 34 as unknown as string
        try {
          ft.setName(nName)
          throw new Error('setName is allowing invalid "name" type')
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
  }
)

function instance (allowModifications: boolean = true): FoodType {
  if (allowModifications) {
    return new FoodType(
      true,
      1,
      'Carne'
    )
  }
  return new FoodType(
    false,
    1,
    'Carne'
  )
}
