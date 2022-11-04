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

const dailyMenuValidations = (dailyMenu: dailyMenuParam): void => {
  tableValidations({
    creationDate: dailyMenu.creationDate
  })
  validations.comment(dailyMenu.comment)
}

export default dailyMenuValidations

type verifyProps = 'comment'
type dailyMenuParam = tableProps & {
  [j in verifyProps]: any
}
type verifyObj = {
  [k in verifyProps]: (p: any) => void
}
