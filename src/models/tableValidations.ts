// Generic for all tables
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { ISO8601Date } from 'utils/RegExps'
import idValidation from './idValidation'

const tableValidations = (table: tableProps): void => {
  if (typeof table.creationDate !== 'string') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'creationDate',
      table.creationDate,
      'only string allowed'
    ))
  }
  if (table.creationDate.match(ISO8601Date) === null) {
    throw new Error(invalidPropertyErrorMessage(
      'creationDate',
      table.creationDate,
      'only ISO8601 date allowed, such as: 2019-01-25T02:00:00.000Z'
    ))
  }

  idValidation({
    id: table.id,
    idName: 'id'
  })
}

export interface tableProps {
  id: number
  creationDate: string
}

export default tableValidations
