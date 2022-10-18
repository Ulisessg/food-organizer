/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces, urlRegExp } from '../utils/RegExps'
import Table from './Table'

class Ingredients extends Table {
  private name: string
  private preferredPurchasePlaceId: number
  private uomtId: number
  private image: string | null

  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: number | null,
    name: string,
    preferredPurchasePlaceId: number,
    uomtId: number,
    image: string | null
  ) {
    super(
      allowModifications,
      id,
      'ingredients'
    )

    this.verifyProperties(
      'image',
      image
    )
    this.verifyProperties(
      'name',
      name
    )
    this.verifyProperties(
      'preferredPurchasePlaceId',
      preferredPurchasePlaceId
    )
    this.verifyProperties(
      'uomtId',
      uomtId
    )

    this.name = name
    this.preferredPurchasePlaceId = preferredPurchasePlaceId
    this.uomtId = uomtId
    this.image = image
  }

  get getName (): string {
    return this.name
  }

  get getPreferredPurchasePlaceId (): number {
    return this.preferredPurchasePlaceId
  }

  get getUomtId (): number {
    return this.uomtId
  }

  get getImage (): string | null {
    return this.image
  }

  setName (name: string): string {
    this.preventModifications()
    this.verifyProperties(
      'name',
      name
    )
    this.name = name
    return this.name
  }

  setPreferredPurchasePlaceId (id: number): number {
    this.preventModifications()
    this.verifyProperties(
      'preferredPurchasePlaceId',
      id
    )
    this.preferredPurchasePlaceId = id
    return this.preferredPurchasePlaceId
  }

  setUomtId (id: number): number {
    this.preventModifications()
    this.verifyProperties(
      'uomtId',
      id
    )
    this.uomtId = id
    return this.uomtId
  }

  setImage (url: string): string {
    this.preventModifications()
    this.verifyProperties(
      'image',
      url
    )
    this.image = url
    return this.image
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProps, value: any): void {
    verifications[propName](value)
  }
}

const verifications: verifyObj = {
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

type verifyProps = 'image' | 'name' | 'preferredPurchasePlaceId' | 'uomtId'
type verifyObj = {
  [k in verifyProps]: (prop: any) => void
}

export default Ingredients
