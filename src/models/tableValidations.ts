// Generic for all tables
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { ISO8601Date } from 'utils/RegExps'
import idValidation from './idValidation'

const tableValidations = (creationDate: string, id: number): void => {
  if (typeof creationDate !== 'string') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'creationDate',
      creationDate,
      'only string allowed'
    ))
  }
  if (creationDate.match(ISO8601Date) === null) {
    throw new Error(invalidPropertyErrorMessage(
      'creationDate',
      creationDate,
      'only ISO8601 date allowed, such as: 2019-01-25T02:00:00.000Z'
    ))
  }

  idValidation(
    id,
    'id'
  )
}

export default tableValidations
