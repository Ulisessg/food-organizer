/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import verifications, { verifyProps } from './foodVerifications'
import { TId } from 'models/commonTables'
import Table from 'models/Table'

class Food extends Table {
  private name: string
  private usedCounter: number
  private preparationTime: number
  private score: number
  private foodTypeId: number
  private image: string | null
  // eslint-disable-next-line max-params
  public constructor (
    allowModifications: boolean,
    id: TId,
    name: string,
    usedCounter: number,
    preparationTime: number,
    score: number,
    foodTypeId: number,
    image: string | null
  ) {
    super(
      allowModifications,
      id,
      'foods'
    )
    this.verifyProperties(
      'foodTypeId',
      foodTypeId
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
      'preparationTime',
      preparationTime
    )
    this.verifyProperties(
      'score',
      score
    )
    this.verifyProperties(
      'usedCounter',
      usedCounter
    )
    this.name = name
    this.usedCounter = usedCounter
    this.preparationTime = preparationTime
    this.score = score
    this.foodTypeId = foodTypeId
    this.image = image
  }

  // Setters
  setName (name: string): string {
    this.preventModifications()
    this.verifyProperties(
      'name',
      name
    )
    this.name = name
    return this.name
  }

  setUsedCounter (usedCounter: number): number {
    this.preventModifications()
    this.verifyProperties(
      'usedCounter',
      usedCounter
    )
    this.usedCounter = usedCounter
    return this.usedCounter
  }

  setPreparationTime (preparationTime: number): number {
    this.preventModifications()
    this.verifyProperties(
      'preparationTime',
      preparationTime
    )
    this.preparationTime = preparationTime
    return this.preparationTime
  }

  setScore (score: number): number {
    this.preventModifications()
    this.verifyProperties(
      'score',
      score
    )
    this.score = score
    return this.score
  }

  setFoodTypeId (foodTypeId: number): number {
    this.preventModifications()
    this.verifyProperties(
      'foodTypeId',
      foodTypeId
    )
    this.foodTypeId = foodTypeId
    return this.foodTypeId
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

  // Getters
  get getName (): string {
    return this.name
  }

  get getUsedCounter (): number {
    return this.usedCounter
  }

  get getPreparationTime (): number {
    return this.preparationTime
  }

  get getScore (): number {
    return this.score
  }

  get getFoodTypeId (): number {
    return this.foodTypeId
  }

  get getImage (): string | null {
    return this.image
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProps, value: any): void {
    verifications[propName](value)
  }
}

export default Food
