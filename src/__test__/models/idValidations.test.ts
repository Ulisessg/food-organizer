import idValidation from 'models/idValidation'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
describe(
  'models/idValidations',
  () => {
    let err: Error | null = null
    const id = 1
    const idName = 'address'

    test(
      'invalid "idName"',
      () => {
        const invalidIdName: string = null as unknown as string
        try {
          idValidation(
            id,
            invalidIdName
          )
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'idName param',
            invalidIdName,
            'only string allowed'
          ))
        }
        err = null
      }
    )

    test(
      'invalid "id"',
      () => {
        const invalidId: number = [] as unknown as number
        try {
          idValidation(
            invalidId,
            idName
          )
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'address',
            invalidId,
            'only integer number allowed'
          ))
        }
        err = null
      }
    )
  }
)
