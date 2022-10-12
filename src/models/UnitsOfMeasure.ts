/* eslint-disable max-statements */
/* eslint-disable max-len */
/* eslint-disable max-params */
import { lettersAndDegrees, lettersWithSpaces } from '../utils/RegExps'
import Table from './Table'

class UnitsOfMeasure extends Table {
  private name: string
  private abbreviation: string
  private uomtId: number
  public constructor (
    allowModifications: boolean,
    id: number | null,
    name: string,
    abbreviation: string,
    uomtId: number
  ) {
    super(
      allowModifications,
      id,
      'units_of_measure'
    )
    if (typeof name !== 'string') {
      throw new Error(`Invalid "name" type, only strings allowed. Received: ${typeof name}`)
    } else if (name.match(lettersWithSpaces) === null) {
      throw new Error(`Invalid "name", only letters and spaces. Received: ${name}`)
    }

    if (typeof abbreviation !== 'string') {
      throw new Error(`Invalid "abbreviation" type, only strings allowed. Received: ${typeof abbreviation}`)
    } else if (abbreviation.match(lettersAndDegrees) === null) {
      throw new Error(`Invalid "abbreviation", only letters and degree symbol (°). Received: ${abbreviation}`)
    }
    if (!Number.isInteger(uomtId)) throw new Error(`Invalid "uomtId" type, only numbers allowed. Received: ${typeof uomtId}`)
    this.abbreviation = abbreviation
    this.uomtId = uomtId
    this.name = name
  }

  public get getName (): string {
    return this.name
  }

  public get getAbbreviation (): string {
    return this.abbreviation
  }

  public get getUomtId (): number {
    return this.uomtId
  }

  public setName (name: string): string {
    if (typeof name !== 'string') {
      throw new Error(`Invalid "name" type, only string allowed. Received: ${typeof name}`)
    } else if (name.match(lettersWithSpaces) === null) {
      throw new Error(`Invalid "name", only letters and spaces. Received: ${name}`)
    }
    this.name = name
    return this.name
  }

  public setAbbreviation (abbreviation: string): string {
    if (typeof abbreviation !== 'string') {
      throw new Error(`Invalid "abbreviation" type, only string allowed. Received: ${typeof abbreviation}`)
    } else if (abbreviation.match(lettersAndDegrees) === null) {
      throw new Error(`Invalid "name", only letters and degree symbol (°). Received: ${abbreviation}`)
    }
    this.abbreviation = abbreviation
    return this.abbreviation
  }

  public setUomtId (id: number): number {
    if (!Number.isInteger(id)) throw new Error(`Invalid "id" type, only numbers allowed. Received: ${typeof id}`)
    this.uomtId = id
    return this.uomtId
  }
}

export default UnitsOfMeasure
