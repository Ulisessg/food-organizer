import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces, urlRegExp } from 'utils/RegExps'
import idValidation from './idValidation'
import tableValidations from './tableValidations'

const validations: verifyObj = {
  foodTypeId: (foodTypeId) => {
    idValidation(
      foodTypeId,
      'foodTypeId'
    )
  },
  image: (image: string) => {
    if (typeof image === 'string') {
      if (image.match(urlRegExp) === null) {
        throw new Error(invalidPropertyErrorMessage(
          'image',
          image,
          'only url allowed'
        ))
      }
    } else if (image !== null) {
      throw new Error(invalidPropertyTypeErrorMessage(
        'image',
        image,
        'only url allowed'
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
  preparationTime: (preparationTime: number) => {
    if (typeof preparationTime !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'preparationTime',
        preparationTime,
        'only number allowed'
      ))
    }
  },
  score: (score: number) => {
    if (typeof score !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'score',
        score,
        'only number allowed'
      ))
    }
  },
  usedCounter: (usedCounter: number) => {
    if (typeof usedCounter !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'usedCounter',
        usedCounter,
        'only number allowed'
      ))
    }
  }
}

const foodValidations = (
  propName: verifyProps,
  propValue: number | string | null,
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

export type verifyProps =
'name' | 'usedCounter' | 'preparationTime' | 'foodTypeId' | 'image' | 'score'

type verifyObj = {
  [k in verifyProps]: (p: any) => void
}

export default foodValidations
