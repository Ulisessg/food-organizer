import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import tableValidations, { type tableProps } from './tableValidations'
import { lettersWithSpaces } from 'utils/RegExps'

const unitOfMeasureTypeVerification = (unitOfMeasureType: unitOfMeasureTypeParam): void => {
  tableValidations({
    creationDate: unitOfMeasureType.creationDate
  })
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

type unitOfMeasureTypeParam = tableProps & {
  name: string
}

export default unitOfMeasureTypeVerification
