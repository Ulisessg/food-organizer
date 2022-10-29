import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

const idValidation = (id: number, idName: string): void => {
  if (typeof idName !== 'string') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'idName param',
      idName,
      'only string allowed'
    ))
  }

  if (!Number.isInteger(id)) {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      idName,
      id,
      'only integer number allowed'
    ))
  }
}

export default idValidation
