/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from '../../utils/ErrorMessages'
import dayjs from 'dayjs'
import purchasePlaceValidations from 'models/purchasePlaceValidations'

describe(
  'models/purchasePlaceValidations',
  () => {
    const id = 1
    const creationDate = dayjs().toISOString()
    test(
      'invalid name format',
      () => {
        const nameProp = 'Mercadito!'
        try {
          purchasePlaceValidations(
            'name',
            nameProp,
            creationDate,
            id
          )
          throw new Error('validations is allowing invalid "name"')
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
      'invalid name type',
      () => {
        const nameProp: string = {} as unknown as string
        try {
          purchasePlaceValidations(
            'name',
            nameProp,
            creationDate,
            id
          )
          throw new Error('verifications is allowing invalid "name" type')
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
      'invalid address',
      () => {
        const addressProp: string = '!Invalid Address'
        try {
          purchasePlaceValidations(
            'address',
            addressProp,
            creationDate,
            id
          )
          throw new Error('validations is allowing invalid "address"')
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
      'invalid address type',
      () => {
        const addressProp = 44 as unknown as string
        try {
          purchasePlaceValidations(
            'address',
            addressProp,
            creationDate,
            id
          )
          throw new Error('validations is allowing invalid "address" type')
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
  }
)
