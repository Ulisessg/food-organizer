import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersAndDegrees, lettersWithSpaces } from 'utils/RegExps'
import idValidation from './idValidation'
import tableValidations from './tableValidations'

const validations: verifyObj = {
  abbreviation: (abbreviation) => {
    if (typeof abbreviation !== 'string') {
      throw new Error(invalidPropertyTypeErrorMessage(
        'abbreviation',
        abbreviation,
        'only string allowed'
      ))
    }
    if (abbreviation.match(lettersAndDegrees) === null) {
      throw new Error(invalidPropertyErrorMessage(
        'abbreviation',
        abbreviation,
        'only letters and degree symbol (°)'
      ))
    }
  },
  name: (name: string) => {
    if (typeof name !== 'string') {
      throw new Error(invalidPropertyTypeErrorMessage(
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
  },
  uomtId: (uomtId: number) => {
    idValidation(
      uomtId,
      'uomtId'
    )
  }
}

const unitOfMeasureValidations = (
  propName: verifyProp,
  propValue: any,
  creationDate: string,
  id: number
// eslint-disable-next-line max-params
): void => {
  tableValidations(
    creationDate,
    id
  )
  validations[propName](propValue)
}

export type verifyProp = 'name' | 'abbreviation' | 'uomtId'
type verifyObj = {
  [k in verifyProp]: (value: any) => void
}

export default unitOfMeasureValidations
