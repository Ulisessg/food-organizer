import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import tableValidations, { tableProps } from './tableValidations'
import { lettersWithSpaces } from '../utils/RegExps'

const foodTypeValidations = (foodType: foodTypeParam): void => {
  tableValidations({
    creationDate: foodType.creationDate
  })
  if (typeof foodType.name !== 'string') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'name',
      foodType.name,
      'only string allowed'
    ))
  }
  if (foodType.name.match(lettersWithSpaces) === null) {
    throw new Error(invalidPropertyErrorMessage(
      'name',
      foodType.name,
      'only letters and spaces allowed'
    ))
  }
}

type foodTypeParam = tableProps & {
  name: string
}

export default foodTypeValidations
