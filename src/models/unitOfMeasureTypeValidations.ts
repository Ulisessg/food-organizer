import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

import { lettersWithSpaces } from 'utils/RegExps'

const unitOfMeasureTypeVerification = (unitOfMeasureType: unitOfMeasureTypeParam): void => {
  if (typeof unitOfMeasureType.name !== 'string') {
    throw new Error(invalidPropertyTypeErrorMessage(
      'name',
      unitOfMeasureType.name,
      'only string allowed'
    ))
  } else if (unitOfMeasureType.name.match(lettersWithSpaces) === null) {
    throw new Error(invalidPropertyErrorMessage(
      'name',
      unitOfMeasureType.name,
      'only letters with spaces allowed'
    ))
  }
}

interface unitOfMeasureTypeParam {
  name: string
}

export default unitOfMeasureTypeVerification
