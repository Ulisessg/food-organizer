import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

import idValidation from './idValidation'
import { lettersWithSpaces } from 'utils/RegExps'

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
      try {
        // eslint-disable-next-line no-new
        new URL(image)
      } catch (error) {
        throw new Error(`Invalid "image" property, only url allowed. value: ${image}`)
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
  validations.comment(ingredient.comment)
  validations.image(ingredient.image)
  validations.name(ingredient.name)
  validations.uomId(ingredient.uomId)
}

export default ingredientValidations

export type verifyProps = 'image' | 'name' | 'uomId' | 'comment'
interface ingredientParam {
  image: string | null
  name: string
  uomId: number
  comment: string | null
}
type verifyObj = {
  [k in verifyProps]: (prop: any) => void
}
