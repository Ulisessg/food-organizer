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

    this.verifyProperties({ image, name, preferredPurchasePlaceId, uomtId })

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
    this.verifyProperties({
      image: this.image,
      name,
      preferredPurchasePlaceId: this.preferredPurchasePlaceId,
      uomtId: this.uomtId
    })
    this.name = name
    return this.name
  }

  setPreferredPurchasePlaceId (id: number): number {
    this.preventModifications()
    this.verifyProperties({
      image: this.image,
      name: this.name,
      preferredPurchasePlaceId: id,
      uomtId: this.uomtId
    })
    this.preferredPurchasePlaceId = id
    return this.preferredPurchasePlaceId
  }

  setUomtId (id: number): number {
    this.preventModifications()
    this.verifyProperties({
      image: this.image,
      name: this.name,
      preferredPurchasePlaceId: this.preferredPurchasePlaceId,
      uomtId: id
    })
    this.uomtId = id
    return this.uomtId
  }

  setImage (url: string): string {
    this.preventModifications()
    this.verifyProperties({
      image: url,
      name: this.name,
      preferredPurchasePlaceId: this.preferredPurchasePlaceId,
      uomtId: this.uomtId
    })
    this.image = url
    return this.image
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties ({
    name,
    preferredPurchasePlaceId,
    uomtId,
    image
  }: verifyPropertiesParam): void {
    // Types validation
    if (typeof name !== 'string') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'name',
        name,
        'only string allowed'
      ))
    }
    if (typeof preferredPurchasePlaceId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'preferredPurchasePlaceId',
        preferredPurchasePlaceId,
        'only number allowed'
      ))
    }
    if (typeof uomtId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'uomtId',
        uomtId,
        'only number allowed'
      ))
    }
    // String validations
    if (name.match(lettersWithSpaces) === null) {
      throw new Error(invalidPropertyErrorMessage(
        'name',
        name,
        'only letters and spaces allowed'
      ))
    }
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
  }
}

interface verifyPropertiesParam {
  image: string | null
  name: string
  preferredPurchasePlaceId: number
  uomtId: number
}

export default Ingredients
