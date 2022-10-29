import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces } from '../utils/RegExps'
import tableValidations from './tableValidations'

const foodTypeValidations = (name: string, creationDate: string, id: number): void => {
  tableValidations(
    creationDate,
    id
  )
  if (typeof name !== 'string') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'name',
      name,
      'only string allowed'
    ))
  }
  if (name.match(lettersWithSpaces) === null) {
    throw new Error(invalidPropertyErrorMessage(
      'name',
      name,
      'only letters and spaces allowed'
    ))
  }
}

export default foodTypeValidations
