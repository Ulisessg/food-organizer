import tableValidations, { tableProps } from './tableValidations'
import idValidation from './idValidation'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

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
    idValidation({
      id,
      idName: 'ingredientId'
    })
  },
  uomId: (id: number) => {
    idValidation({
      id,
      idName: 'uomId'
    })
  }
}

const ingredientStockVerifications = (ingredientStock: ingredientStockParam): void => {
  tableValidations({
    creationDate: ingredientStock.creationDate
  })
  validations.comment(ingredientStock.comment)
  validations.ingredientId(ingredientStock.ingredientId)
  validations.uomId(ingredientStock.uomId)
}

export default ingredientStockVerifications

type verifyObj = {
  [k in verifyProps]: (value: any) => void
}

type ingredientStockParam = tableProps & {
  ingredientId: number
  uomId: number
  comment: string | null
}

export type verifyProps = 'ingredientId' | 'uomId' | 'comment'
