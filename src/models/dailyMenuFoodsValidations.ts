import tableValidations, { tableProps } from './tableValidations'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

export const validations: verifyObj = {
  comment: (comment: string | null) => {
    if (typeof comment !== 'string') {
      if (comment !== null) {
        throw new TypeError(invalidPropertyTypeErrorMessage(
          'comment',
          comment,
          'only string or null allowed'
        ))
      }
    }
  }
}

const dailyMenuFoodsValidations = (dailyMenuFoods: dailyMenuFoodsValidationsParam): void => {
  tableValidations({ creationDate: dailyMenuFoods.creationDate })
  validations.comment(dailyMenuFoods.comment)
}

export default dailyMenuFoodsValidations

type dailyMenuFoodsValidationsParam = tableProps & {
  comment: string | null
}
type verifyProps = 'comment'
type verifyObj = {
  [k in verifyProps]: (value: any) => void
}
