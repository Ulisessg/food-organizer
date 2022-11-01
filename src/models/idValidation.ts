import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

const idValidation = (idParam: idValidationParam): void => {
  if (typeof idParam.idName !== 'string') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      'idName param',
      idParam.idName,
      'only string allowed'
    ))
  }

  if (!Number.isInteger(idParam.id)) {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      idParam.idName,
      idParam.id,
      'only integer number allowed'
    ))
  }
}

interface idValidationParam {
  id: number
  idName: string
}

export default idValidation
