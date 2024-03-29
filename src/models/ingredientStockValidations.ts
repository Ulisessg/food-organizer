
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
  validations.comment(ingredientStock.comment)
  validations.ingredientId(ingredientStock.ingredientId)
  validations.ingredient_qty(ingredientStock.ingredient_qty)
}

export default ingredientStockVerifications

type verifyObj = {
  // eslint-disable-next-line no-unused-vars
  [k in verifyProps]: (value: any) => void
}

interface ingredientStockParam {
  ingredientId: number
  ingredient_qty: number
  comment: string | null
}

export type verifyProps = 'ingredientId' | 'ingredient_qty' | 'comment'
