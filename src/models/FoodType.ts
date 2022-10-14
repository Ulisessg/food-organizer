import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import Table from './Table'
import { lettersWithSpaces } from '../utils/RegExps'

class FoodType extends Table {
  private name: string
  constructor (allowModifications: boolean, id: number | null, name: string) {
    super(
      allowModifications,
      id,
      'food_type'
    )
    this.verifyProperties(name)
    this.name = name
  }

  get getName (): string {
    return this.name
  }

  setName (name: string): string {
    this.preventModifications()
    this.verifyProperties(name)
    this.name = name
    return this.name
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (name: verifyPropertiesParam): void {
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
  }
}

type verifyPropertiesParam = string

export default FoodType
