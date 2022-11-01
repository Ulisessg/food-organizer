/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import unitOfMeasureTypeValidations from 'models/unitOfMeasureTypeValidations'

describe(
  'models/unitOfMeasureTypeValidations',
  () => {
    const creationDate = dayjs().toISOString()

    test(
      'name invalid type',
      () => {
        const nameProp = {} as unknown as string
        try {
          unitOfMeasureTypeValidations({
            creationDate,
            name: nameProp
          })
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
      'invalid name',
      () => {
        const nameProp = 'Distancias_Lineales'
        try {
          unitOfMeasureTypeValidations({
            creationDate,
            name: nameProp
          })
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
