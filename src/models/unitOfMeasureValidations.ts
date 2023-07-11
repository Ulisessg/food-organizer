import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersAndDegrees, lettersWithSpaces } from 'utils/RegExps'

import idValidation from './idValidation'

export const validations: verifyObj = {
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
    idValidation({
      id: uomtId,
      idName: 'uomtId'
    })
  }
}

const unitOfMeasureValidations = (unitOfMeasure: unitOfMeasureParam): void => {
  validations.abbreviation(unitOfMeasure.abbreviation)
  validations.name(unitOfMeasure.name)
  validations.uomtId(unitOfMeasure.uomtId)
}

export default unitOfMeasureValidations

export type verifyProp = 'name' | 'abbreviation' | 'uomtId'
interface unitOfMeasureParam {
  name: string
  abbreviation: string
  uomtId: number
}
type verifyObj = {
  // eslint-disable-next-line no-unused-vars
  [k in verifyProp]: (value: any) => void
}
