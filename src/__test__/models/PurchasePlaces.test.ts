/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from '../../utils/ErrorMessages'
import PurchasePlaces from 'models/PurchasePlaces'

describe(
  'models/PurchasePlaces',
  () => {
    test(
      'PurchasePlaces has required methods',
      () => {
        const pp = instance()
        expect(pp.getAddress).toBeDefined()
        expect(pp.getName).toBeDefined()
        expect(pp.setAddress).toBeDefined()
        expect(pp.setName).toBeDefined()
      }
    )
    test(
      'Constructor invalid name',
      () => {
        const nameProp = 'Mercadito!'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pp = new PurchasePlaces(
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
      'Constructor invalid name type',
      () => {
        const nameProp: string = {} as unknown as string
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pp = new PurchasePlaces(
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
      'Constructor invalid address',
      () => {
        const addressProp = '!Invalid Address'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pp = new PurchasePlaces(
            false,
            1,
            'Mercadito',
            addressProp
          )
          throw new Error('Constructor is allowing invalid "address"')
        } catch (error) {
          const err: Error = error as Error

          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'address',
            addressProp,
            'only letters and spaces allowed'
          ))
        }
      }
    )
    test(
      'Constructor invalid address type',
      () => {
        const addressProp = 44 as unknown as string
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const pp = new PurchasePlaces(
            false,
            1,
            'Mercadito',
            addressProp
          )
          throw new Error('Constructor is allowing invalid "address" type')
        } catch (error) {
          const err: Error = error as Error

          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'address',
            addressProp,
            'only string or undefined allowed'
          ))
        }
      }
    )

    test(
      'getName',
      () => {
        const pp = instance()
        expect(pp.getName).toStrictEqual('Mercadito')
      }
    )
    test(
      'getAddress',
      () => {
        const pp = instance()
        expect(pp.getAddress).toStrictEqual('Address 22')
      }
    )
    test(
      'setAddress success',
      () => {
        const pp = instance()
        expect(pp.getAddress).toStrictEqual('Address 22')
        expect(pp.setAddress('Reforma N° 12')).toStrictEqual('Reforma N° 12')
        expect(pp.getAddress).toStrictEqual('Reforma N° 12')
      }
    )
    test(
      'setName success',
      () => {
        const pp = instance()
        expect(pp.getName).toStrictEqual('Mercadito')
        expect(pp.setName('Tienda de la esquina')).toStrictEqual('Tienda de la esquina')
        expect(pp.getName).toStrictEqual('Tienda de la esquina')
      }
    )
  }
)

const instance = (allowModifications: boolean = true): PurchasePlaces => new PurchasePlaces(
  allowModifications,
  1,
  'Mercadito',
  'Address 22'
)
