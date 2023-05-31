import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

import { lettersWithSpaces } from '../utils/RegExps'

export const foodTypeValidations = (foodType: foodTypeParam): void => {
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

interface foodTypeParam {
  name: string
}

export default foodTypeValidations
