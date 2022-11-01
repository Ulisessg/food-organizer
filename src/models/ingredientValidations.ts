import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces, urlRegExp } from 'utils/RegExps'
import tableValidations, { tableProps } from './tableValidations'
import idValidation from './idValidation'

const validations: verifyObj = {
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
  preferredPurchasePlaceId: (preferredPurchasePlaceId: number) => {
    idValidation({
      id: preferredPurchasePlaceId,
      idName: 'preferredPurchasePlaceId'
    })
  },
  uomtId: (uomtId: number) => {
    idValidation({
      id: uomtId,
      idName: 'uomtId'
    })
  }
}

const ingredientValidations = (ingredient: ingredientParam): void => {
  tableValidations({
    creationDate: ingredient.creationDate,
    id: ingredient.id
  })
  validations.comment(ingredient.comment)
  validations.image(ingredient.image)
  validations.name(ingredient.name)
  validations.preferredPurchasePlaceId(ingredient.preferredPurchasePlaceId)
  validations.uomtId(ingredient.uomtId)
}

export default ingredientValidations

export type verifyProps = 'image' | 'name' | 'preferredPurchasePlaceId' | 'uomtId' | 'comment'
type ingredientParam = tableProps & {
  image: string | null
  name: string
  preferredPurchasePlaceId: number
  uomtId: number
  comment: string | null
}
type verifyObj = {
  [k in verifyProps]: (prop: any) => void
}
