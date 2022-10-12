/* eslint-disable no-invalid-this */
import Table from './Table'
import { lettersWithSpaces } from '../utils/RegExps'

class UnitsOfMeasureTypes extends Table {
  private name: string

  /**
   *
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
    if (typeof name !== 'string' || name.match(lettersWithSpaces) === null) {
      throw new Error(`
Invalid name, only allowed letters and spaces.
name: ${name}
name type: ${typeof name}
`)
    }
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
    if (typeof name !== 'string') {
      throw new Error('"name" param type invalid, only strings allowed')
    } else if (name.match(lettersWithSpaces) === null) {
      throw new Error('"name" param type invalid, only letters with spaces')
    }
    this.name = name
    return this.name
  }
}

export default UnitsOfMeasureTypes
