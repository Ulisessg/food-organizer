import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces, urlRegExp } from 'utils/RegExps'

const verifications: verifyObj = {
  comment: (comment: string) => {
    if (typeof comment !== 'string') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'comment',
        comment,
        'only string allowed'
      ))
    }
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
    if (typeof preferredPurchasePlaceId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'preferredPurchasePlaceId',
        preferredPurchasePlaceId,
        'only number allowed'
      ))
    }
  },
  uomtId: (uomtId: number) => {
    if (typeof uomtId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'uomtId',
        uomtId,
        'only number allowed'
      ))
    }
  }
}

export type verifyProps = 'image' | 'name' | 'preferredPurchasePlaceId' | 'uomtId' | 'comment'
type verifyObj = {
  [k in verifyProps]: (prop: any) => void
}

export default verifications
