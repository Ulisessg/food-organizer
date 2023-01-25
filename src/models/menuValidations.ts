import tableValidations, { type tableProps } from './tableValidations'
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

const menuValidations = (menu: menuParam): void => {
  tableValidations({
    creationDate: menu.creationDate
  })
  validations.comment(menu.comment)
}

export default menuValidations

type verifyProps = 'comment'
type menuParam = tableProps & {
  [j in verifyProps]: any
}
type verifyObj = {
  [k in verifyProps]: (p: any) => void
}
