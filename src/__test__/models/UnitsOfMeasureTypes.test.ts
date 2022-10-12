/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
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
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uomt = new UnitsOfMeasureTypes(
            true,
            1,
            'Liquidos1'
          )
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(`
Invalid name, only allowed letters and spaces.
name: Liquidos1
name type: string
`)
        }
      }
    )
    test(
      'UnitsOfMeasureTypes constructor: name invalid type',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uomt = new UnitsOfMeasureTypes(
            true,
            1,
            null as unknown as string
          )
          throw new Error('Constructor is allowing invalid "name" param')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(`
Invalid name, only allowed letters and spaces.
name: null
name type: object
`)
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
        try {
          const uomt = new UnitsOfMeasureTypes(
            true,
            1,
            'Liquidos'
          )
          uomt.setName({} as unknown as string)
          throw new Error('setName method is allowing non string types')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('"name" param type invalid, only strings allowed')
        }
      }
    )
    test(
      'setName invalid name',
      () => {
        try {
          const uomt = new UnitsOfMeasureTypes(
            true,
            1,
            'Liquidos'
          )
          uomt.setName('Distancias_Lineales')
          throw new Error('setName method is allowing invalid names')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('"name" param type invalid, only letters with spaces')
        }
      }
    )
  }
)
