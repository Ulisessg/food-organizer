/* eslint-disable no-invalid-this */
import Table from './Table'
import { lettersWithSpaces } from '../utils/RegExps'

class UnitsOfMeasureTypes extends Table {
  private name: string

  /**
   * @param {boolean} allowModifications
   * @param {number} id
   * @param {string} name - Unit Of Measure Type Name
   */
  constructor (
    allowModifications: boolean,
    id: number | null,
    name: string
  ) {
    super(
      allowModifications,
      id,
      'units_of_measure_types'
    )
    this.verifyProperties(name)
    this.name = name
  }

  get getName (): string {
    return this.name
  }

  /**
   *
   * @param {string} name
   * @returns {string} name
   */
  setName (name: string): string {
    this.verifyProperties(name)
    this.name = name
    return this.name
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (name: verifyPropertiesParam): void {
    if (typeof name !== 'string') {
      throw new Error('"name" param type invalid, only strings allowed')
    } else if (name.match(lettersWithSpaces) === null) {
      throw new Error('"name" param type invalid, only letters with spaces')
    }
  }
}

type verifyPropertiesParam = string

export default UnitsOfMeasureTypes
