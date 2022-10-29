/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import dayjs from 'dayjs'
import unitOfMeasureValidations from 'models/unitOfMeasureValidations'

describe(
  'models/unitsOfMeasureValidations',
  () => {
    const creationDate = dayjs().toISOString()
    const id = 1
    test(
      'invalid "name" type',
      () => {
        const invalidName = null as unknown as string
        try {
          unitOfMeasureValidations(
            'name',
            invalidName,
            creationDate,
            id
          )
          throw new Error('name is allowing invalid data type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'name',
            invalidName,
            'only string allowed'
          ))
        }
      }
    )

    test(
      'invalid "name" format',
      () => {
        const invalidName = 'Grad0s!'
        try {
          unitOfMeasureValidations(
            'name',
            invalidName,
            creationDate,
            id
          )
          throw new Error('name is allowing invalid "name"')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'name',
            invalidName,
            'only letters and spaces allowed'
          ))
        }
      }
    )

    test(
      'invalid "abbreviation" type',
      () => {
        const abbreviationProp = null as unknown as string
        try {
          unitOfMeasureValidations(
            'abbreviation',
            abbreviationProp,
            creationDate,
            id
          )
          throw new Error('abbreviation is allowing invalid data type')
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
      'invalid "abbreviation"',
      () => {
        const abbreviationProp = '!°C'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

          unitOfMeasureValidations(
            'abbreviation',
            abbreviationProp,
            creationDate,
            id
          )
          throw new Error('abbreviation is allowing invalid format')
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
      'invalid "uomtId" type',
      () => {
        const uomtId = null as unknown as number
        try {
          unitOfMeasureValidations(
            'uomtId',
            uomtId,
            creationDate,
            id
          )
          throw new Error('uomtId is allowing invalid data type')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'uomtId',
            uomtId,
            'only integer number allowed'
          ))
        }
      }
    )
  }
)
