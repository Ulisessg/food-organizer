
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
  validations.comment(menu.comment)
}

export default menuValidations

type verifyProps = 'comment'
type menuParam = {
  // eslint-disable-next-line no-unused-vars
  [j in verifyProps]: any
}
type verifyObj = {
  // eslint-disable-next-line no-unused-vars
  [k in verifyProps]: (p: any) => void
}
