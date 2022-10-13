/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
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
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            {} as unknown as string,
            '°C',
            1
          )
          throw new Error('Constructor is allowing invalid "name" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "name" type, only string allowed. Received: object')
        }
      }
    )

    test(
      'Constructor: invalid "name"',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            'Grados23',
            '°C',
            1
          )
          throw new Error('Constructor is allowing invalid "name"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "name", only letters and spaces. Received: Grados23')
        }
      }
    )

    test(
      'Constructor: invalid "abbreviation" type',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            'Grados Centgrados',
            33 as unknown as string,
            1
          )
          throw new Error('Constructor is allowing invalid "name" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "abbreviation" type, only string allowed. Received: number')
        }
      }
    )

    test(
      'Constructor: invalid "abbreviation"',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            'Grados Centgrados',
            '!°C',
            1
          )
          throw new Error('Constructor is allowing invalid "abbreviation"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "abbreviation", only letters and degree symbol (°). Received: !°C')
        }
      }
    )

    test(
      'Constructor: invalid "uomtId" type',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = new UnitsOfMeasure(
            true,
            1,
            'Grados Centgrados',
            '°C',
            // eslint-disable-next-line no-undefined
            undefined as unknown as number
          )
          throw new Error('Constructor is allowing invalid "uomtId" type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "uomtId" type, only numbers allowed. Received: undefined')
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
        try {
          uom.setName(null as unknown as string)
          throw new Error('setName is allowing invalid data type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "name" type, only string allowed. Received: object')
        }
      }
    )

    test(
      'setName: invalid "name"',
      () => {
        const uom = instance()
        try {
          uom.setName('Grad0s!')
          throw new Error('setName is allowing invalid "name"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "name", only letters and spaces. Received: Grad0s!')
        }
      }
    )

    test(
      'setAbbreviation: invalid "abbreviation" type',
      () => {
        const uom = instance()
        try {
          uom.setAbbreviation(null as unknown as string)
          throw new Error('setAbbreviation is allowing invalid data type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "abbreviation" type, only string allowed. Received: object')
        }
      }
    )

    test(
      'setAbbreviation: invalid "abbreviation"',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const uom = instance()
          uom.setAbbreviation('!°C')
          throw new Error('Constructor is allowing invalid "abbreviation"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "abbreviation", only letters and degree symbol (°). Received: !°C')
        }
      }
    )

    test(
      'setUomtId: invalid "id" type',
      () => {
        const uom = instance()
        try {
          uom.setUomtId(null as unknown as number)
          throw new Error('setUomtId is allowing invalid data type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Invalid "id" type, only numbers allowed. Received: object')
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
