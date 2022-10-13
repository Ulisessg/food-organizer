/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import UnitsOfMeasure from 'models/UnitsOfMeasure'

describe(
  'models/UnitsOfMeasure',
  () => {
    test(
      'Class UnitsOfMeasure has required methods',
      () => {
        const uom = instance()
        expect(uom.getName).toBeDefined()
        expect(uom.setName).toBeDefined()
        expect(uom.getAbbreviation).toBeDefined()
        expect(uom.setAbbreviation).toBeDefined()
        expect(uom.getUomtId).toBeDefined()
        expect(uom.setUomtId).toBeDefined()
      }
    )
    test(
      'Constructor: invalid "name" type',
      () => {
        const nameProp = {} as unknown as string
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            nameProp,
            '°C',
            1
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
      'Constructor: invalid "name"',
      () => {
        const nameProp = 'Grados23'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            nameProp,
            '°C',
            1
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
      'Constructor: invalid "abbreviation" type',
      () => {
        const abbreviationProp = 33 as unknown as string
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            'Grados Centgrados',
            abbreviationProp,
            1
          )
          throw new Error('Constructor is allowing invalid "name" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'abbreviation',
            abbreviationProp,
            'only string allowed'
          ))
        }
      }
    )

    test(
      'Constructor: invalid "abbreviation"',
      () => {
        const abbreviationProp = '!°C'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            'Grados Centgrados',
            abbreviationProp,
            1
          )
          throw new Error('Constructor is allowing invalid "abbreviation"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'abbreviation',
            abbreviationProp,
            'only letters and degree symbol (°)'
          ))
        }
      }
    )

    test(
      'Constructor: invalid "uomtId" type',
      () => {
        // eslint-disable-next-line no-undefined
        const uomtId = undefined as unknown as number
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            'Grados Centgrados',
            '°C',
            uomtId
          )
          throw new Error('Constructor is allowing invalid "uomtId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'uomtId',
            uomtId,
            'only numbers allowed'
          ))
        }
      }
    )

    test(
      'getName',
      () => {
        const uom = instance()
        expect(uom.getName).toStrictEqual('Grados Centigrados')
      }
    )
    test(
      'getAbbreviation',
      () => {
        const uom = instance()
        expect(uom.getAbbreviation).toStrictEqual('°C')
      }
    )
    test(
      'getUomtId',
      () => {
        const uom = instance()
        expect(uom.getUomtId).toStrictEqual(1)
      }
    )

    test(
      'setName',
      () => {
        const uom = instance()
        expect(uom.setName('Grados Fahrenheit')).toStrictEqual('Grados Fahrenheit')
        expect(uom.getName).toStrictEqual('Grados Fahrenheit')
      }
    )
    test(
      'setName invalid "name" type',
      () => {
        const uom = instance()
        const nameProp = null as unknown as string
        try {
          uom.setName(nameProp)
          throw new Error('setName is allowing invalid data type')
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
      'setName: invalid "name"',
      () => {
        const uom = instance()
        const nameProp = 'Grad0s!'
        try {
          uom.setName(nameProp)
          throw new Error('setName is allowing invalid "name"')
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
      'setAbbreviation: invalid "abbreviation" type',
      () => {
        const uom = instance()
        const abbreviationProp = null as unknown as string
        try {
          uom.setAbbreviation(abbreviationProp)
          throw new Error('setAbbreviation is allowing invalid data type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'abbreviation',
            abbreviationProp,
            'only string allowed'
          ))
        }
      }
    )

    test(
      'setAbbreviation: invalid "abbreviation"',
      () => {
        const abbreviationProp = '!°C'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = instance()
          uom.setAbbreviation(abbreviationProp)
          throw new Error('Constructor is allowing invalid "abbreviation"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'abbreviation',
            abbreviationProp,
            'only letters and degree symbol (°)'
          ))
        }
      }
    )

    test(
      'setUomtId: invalid "id" type',
      () => {
        const uom = instance()
        const uomtId = null as unknown as number
        try {
          uom.setUomtId(uomtId)
          throw new Error('setUomtId is allowing invalid data type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'uomtId',
            uomtId,
            'only numbers allowed'
          ))
        }
      }
    )
  }
)

const instance = (): UnitsOfMeasure => new UnitsOfMeasure(
  false,
  1,
  'Grados Centigrados',
  '°C',
  1
)
