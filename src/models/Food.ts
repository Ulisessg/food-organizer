/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import { lettersWithSpaces, urlRegExp } from '../utils/RegExps'
import Table from './Table'

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
    id: number | null,
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
    this.verifyProperties({ foodTypeId, image, name, preparationTime, score, usedCounter })
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
    this.verifyProperties({
      foodTypeId: this.foodTypeId,
      image: this.image,
      name,
      preparationTime: this.preparationTime,
      score: this.score,
      usedCounter: this.usedCounter
    })
    this.name = name
    return this.name
  }

  setUsedCounter (usedCounter: number): number {
    this.preventModifications()
    this.verifyProperties({
      foodTypeId: this.foodTypeId,
      image: this.image,
      name: this.name,
      preparationTime: this.preparationTime,
      score: this.score,
      usedCounter
    })
    this.usedCounter = usedCounter
    return this.usedCounter
  }

  setPreparationTime (preparationTime: number): number {
    this.preventModifications()
    this.verifyProperties({
      foodTypeId: this.foodTypeId,
      image: this.image,
      name: this.name,
      preparationTime,
      score: this.score,
      usedCounter: this.usedCounter
    })
    this.preparationTime = preparationTime
    return this.preparationTime
  }

  setScore (score: number): number {
    this.preventModifications()
    this.verifyProperties({
      foodTypeId: this.foodTypeId,
      image: this.image,
      name: this.name,
      preparationTime: this.preparationTime,
      score,
      usedCounter: this.usedCounter
    })
    this.score = score
    return this.score
  }

  setFoodTypeId (foodTypeId: number): number {
    this.preventModifications()
    this.verifyProperties({
      foodTypeId,
      image: this.image,
      name: this.name,
      preparationTime: this.preparationTime,
      score: this.score,
      usedCounter: this.usedCounter
    })
    this.foodTypeId = foodTypeId
    return this.foodTypeId
  }

  setImage (url: string): string {
    this.preventModifications()
    this.verifyProperties({
      foodTypeId: this.foodTypeId,
      image: url,
      name: this.name,
      preparationTime: this.preparationTime,
      score: this.score,
      usedCounter: this.usedCounter
    })
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
  protected verifyProperties ({
    foodTypeId,
    image,
    name,
    preparationTime,
    score,
    usedCounter
  }: verifyPropertiesParam): void {
    if (typeof foodTypeId !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'foodTypeId',
        foodTypeId,
        'only number allowed'
      ))
    }
    if (typeof preparationTime !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'preparationTime',
        preparationTime,
        'only number allowed'
      ))
    }
    if (typeof score !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'score',
        score,
        'only number allowed'
      ))
    }
    if (typeof usedCounter !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'usedCounter',
        usedCounter,
        'only number allowed'
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
      throw new Error(invalidPropertyTypeErrorMessage(
        'image',
        image,
        'only url allowed'
      ))
    }
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
  }
}

interface verifyPropertiesParam {
  name: string
  usedCounter: number
  preparationTime: number
  score: number
  foodTypeId: number
  image: string | null
}

export default Food
