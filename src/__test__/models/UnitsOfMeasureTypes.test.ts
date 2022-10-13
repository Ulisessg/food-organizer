/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import UnitsOfMeasureTypes from 'models/UnitsOfMeasureTypes'

describe(
  'models/UnitsOfMeasureTypes',
  () => {
    test(
      'Class UnitsOfMeasureTypes has required methods',
      () => {
        const uomt = new UnitsOfMeasureTypes(
          true,
          1,
          'Liquidos'
        )
        expect(uomt.getName).toBeDefined()
        expect(uomt.setName).toBeDefined()
      }
    )
    test(
      'UnitsOfMeasureTypes constructor: name',
      () => {
        const uomt = new UnitsOfMeasureTypes(
          true,
          1,
          'Corriente electrica'
        )
        expect(uomt.getName).toStrictEqual('Corriente electrica')
      }
    )

    test(
      'UnitsOfMeasureTypes constructor: name invalid',
      () => {
        const nameProp = 'Liquidos1'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uomt = new UnitsOfMeasureTypes(
            true,
            1,
            nameProp
          )
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'name',
            nameProp,
            'only letters with spaces allowed'
          ))
        }
      }
    )
    test(
      'UnitsOfMeasureTypes constructor: name invalid type',
      () => {
        const nameProp = null as unknown as string
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uomt = new UnitsOfMeasureTypes(
            true,
            1,
            nameProp
          )
          throw new Error('Constructor is allowing invalid "name" param')
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
      'setName preventModifications',
      () => {
        const uomt = new UnitsOfMeasureTypes(
          false,
          1,
          'Liquidos'
        )
        try {
          uomt.setName('Temperaturas')
          throw new Error('setName is allowing modifications')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    test(
      'setName success',
      () => {
        const uomt = new UnitsOfMeasureTypes(
          true,
          1,
          'Liquidos'
        )
        expect(uomt.getName).toStrictEqual('Liquidos')

        const result = uomt.setName('Temperaturas')
        expect(result).toStrictEqual('Temperaturas')
        expect(uomt.getName).toStrictEqual('Temperaturas')
      }
    )
    test(
      'setName name type error',
      () => {
        const nameProp = {} as unknown as string
        try {
          const uomt = new UnitsOfMeasureTypes(
            true,
            1,
            'Liquidos'
          )
          uomt.setName(nameProp)
          throw new Error('setName method is allowing non string types')
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
      'setName invalid name',
      () => {
        const nameProp = 'Distancias_Lineales'
        try {
          const uomt = new UnitsOfMeasureTypes(
            true,
            1,
            'Liquidos'
          )
          uomt.setName(nameProp)
          throw new Error('setName method is allowing invalid names')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'name',
            nameProp,
            'only letters with spaces allowed'
          ))
        }
      }
    )
  }
)
