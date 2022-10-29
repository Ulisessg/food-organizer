import idValidation from './idValidation'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import tableValidations from './tableValidations'

const validations: verifyObj = {
  comment: (comment: string) => {
    if (typeof comment !== 'string') {
      if (comment !== null) {
        throw new TypeError(invalidPropertyTypeErrorMessage(
          'comment',
          comment,
          'only string or null allowed'
        ))
      }
    }
  },
  ingredientId: (id: number) => {
    idValidation(
      id,
      'ingredientId'
    )
  },
  uomId: (id: number) => {
    idValidation(
      id,
      'uomId'
    )
  }
}

const ingredientStockVerifications = (
  propName: verifyProps,
  propValue: any,
  creationDate: string,
  id: number
// eslint-disable-next-line max-params
): void => {
  tableValidations(
    creationDate,
    id
  )
  validations[propName](propValue)
}

type verifyObj = {
  [k in verifyProps]: (value: any) => void
}

export type verifyProps = 'ingredientId' | 'uomId' | 'comment'

export default ingredientStockVerifications
