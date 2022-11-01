import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces, urlRegExp } from 'utils/RegExps'
import tableValidations, { tableProps } from './tableValidations'
import idValidation from './idValidation'

const validations: verifyObj = {
  foodTypeId: (foodTypeId) => {
    idValidation({
      id: foodTypeId,
      idName: 'foodTypeId'
    })
  },
  image: (img: string) => {
    if (typeof img === 'string') {
      if (img.match(urlRegExp) === null) {
        throw new Error(invalidPropertyErrorMessage(
          'image',
          img,
          'only url allowed'
        ))
      }
    }
    if (img !== null) {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'image',
        img,
        'only string or null allowed'
      ))
    }
  },
  name: (nameValue: string) => {
    if (typeof nameValue === 'string') {
      const result = nameValue.match(lettersWithSpaces)
      if (result === null) {
        throw new Error(invalidPropertyErrorMessage(
          'name',
          nameValue,
          'only letters and spaces allowed'
        ))
      }
    } else {
      throw new Error(invalidPropertyTypeErrorMessage(
        'name',
        nameValue,
        'only string allowed'
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
  score: (score) => {
    if (typeof score !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'score',
        score,
        'only number allowed'
      ))
    }
  },
  usedCounter: (usedCounter) => {
    if (typeof usedCounter !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'usedCounter',
        usedCounter,
        'only number allowed'
      ))
    }
  }
}

const foodValidations = (food: foodParam): void => {
  tableValidations({
    creationDate: food.creationDate
  })
  validations.foodTypeId(food.foodTypeId)
  validations.image(food.image)
  validations.name(food.name)
  validations.preparationTime(food.preparationTime)
  validations.score(food.score)
  validations.usedCounter(food.usedCounter)
}

export default foodValidations
export type verifyProps =
'name' | 'usedCounter' | 'preparationTime' | 'foodTypeId' | 'image' | 'score'

type foodParam = tableProps & {
  name: string
  usedCounter: number
  preparationTime: number
  foodTypeId: number
  image: string | null
  score: number
}

type verifyObj = {
  [k in verifyProps]: (p: any) => void
}