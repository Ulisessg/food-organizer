import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces } from 'utils/RegExps'
import tableValidations from './tableValidations'

const unitOfMeasureTypeVerification = (name: string, creationDate: string, id: number): void => {
  tableValidations(
    creationDate,
    id
  )
  if (typeof name !== 'string') {
    throw new Error(invalidPropertyTypeErrorMessage(
      'name',
      name,
      'only string allowed'
    ))
  } else if (name.match(lettersWithSpaces) === null) {
    throw new Error(invalidPropertyErrorMessage(
      'name',
      name,
      'only letters with spaces allowed'
    ))
  }
}

export default unitOfMeasureTypeVerification
