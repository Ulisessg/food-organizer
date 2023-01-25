import tableValidations, { type tableProps } from './tableValidations'
import idValidation from './idValidation'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

export const validations: verifyObj = {
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
  ingredient_qty: (qty: number) => {
    if (typeof qty !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'ingredient_qty',
        qty,
        'only number allowed'
      ))
    }
  }
}

const ingredientStockVerifications = (ingredientStock: ingredientStockParam): void => {
  tableValidations({
    creationDate: ingredientStock.creationDate
  })
  validations.comment(ingredientStock.comment)
  validations.ingredientId(ingredientStock.ingredientId)
  validations.ingredient_qty(ingredientStock.ingredient_qty)
}

export default ingredientStockVerifications

type verifyObj = {
  [k in verifyProps]: (value: any) => void
}

type ingredientStockParam = tableProps & {
  ingredientId: number
  ingredient_qty: number
  comment: string | null
}

export type verifyProps = 'ingredientId' | 'ingredient_qty' | 'comment'
