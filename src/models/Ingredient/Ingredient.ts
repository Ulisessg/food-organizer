/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import verifications, { verifyProps } from './ingredientVerifications'
import { TId } from 'models/commonTables'
import Table from '../Table'

class Ingredient extends Table {
  private name: string
  private preferredPurchasePlaceId: number
  private uomtId: number
  private image: string | null
  private comment: string | null

  // eslint-disable-next-line max-params
  constructor (
    allowModifications: boolean,
    id: TId,
    name: string,
    preferredPurchasePlaceId: number,
    uomtId: number,
    image: string | null,
    comments: string | null
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
    this.verifyProperties(
      'comment',
      comments
    )

    this.name = name
    this.preferredPurchasePlaceId = preferredPurchasePlaceId
    this.uomtId = uomtId
    this.image = image
    this.comment = comments
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

  get getComment (): string | null {
    return this.comment
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

  setComment (comment: string): string {
    this.preventModifications()
    this.verifyProperties(
      'comment',
      comment
    )
    this.comment = comment
    return this.comment
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProps, value: any): void {
    verifications[propName](value)
  }
}

export default Ingredient
