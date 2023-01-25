import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces, urlRegExp } from 'utils/RegExps'
import tableValidations, { type tableProps } from './tableValidations'
import idValidation from './idValidation'

export const validations: verifyObj = {
  comment: (comment: string | null) => {
    if (typeof comment !== 'string') {
      if (comment !== null) {
        throw new TypeError(invalidPropertyTypeErrorMessage(
          'comment',
          comment,
          'only string or null allowed'
        ))
      }
    }
  },
  image: (image: string | null) => {
    if (typeof image === 'string') {
      if (image.match(urlRegExp) === null) {
        throw new Error(invalidPropertyErrorMessage(
          'image',
          image,
          'only url allowed'
        ))
      }
    } else if (image !== null) {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'image',
        image,
        'only string or null allowed'
      ))
    }
  },
  name: (name: string) => {
    if (typeof name !== 'string') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
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
  uomId: (uomtId: number) => {
    idValidation({
      id: uomtId,
      idName: 'uomId'
    })
  }
}

const ingredientValidations = (ingredient: ingredientParam): void => {
  tableValidations({
    creationDate: ingredient.creationDate
  })
  validations.comment(ingredient.comment)
  validations.image(ingredient.image)
  validations.name(ingredient.name)
  validations.uomId(ingredient.uomId)
}

export default ingredientValidations

export type verifyProps = 'image' | 'name' | 'uomId' | 'comment'
type ingredientParam = tableProps & {
  image: string | null
  name: string
  uomId: number
  comment: string | null
}
type verifyObj = {
  [k in verifyProps]: (prop: any) => void
}
