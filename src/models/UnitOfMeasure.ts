/* eslint-disable max-statements */
/* eslint-disable max-len */
/* eslint-disable max-params */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
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
    this.verifyProperties(
      'name',
      name
    )
    this.verifyProperties(
      'abbreviation',
      abbreviation
    )
    this.verifyProperties(
      'uomtId',
      uomtId
    )
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
    this.preventModifications()
    this.verifyProperties(
      'name',
      name
    )
    this.name = name
    return this.name
  }

  public setAbbreviation (abbreviation: string): string {
    this.preventModifications()
    this.verifyProperties(
      'abbreviation',
      abbreviation
    )
    this.abbreviation = abbreviation
    return this.abbreviation
  }

  public setUomtId (id: number): number {
    this.preventModifications()
    this.verifyProperties(
      'uomtId',
      id
    )
    this.uomtId = id
    return this.uomtId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProp, value: any): void {
    verifications[propName](value)
  }
}

const verifications: verifyObj = {
  abbreviation: (abbreviation) => {
    if (typeof abbreviation !== 'string') {
      throw new Error(invalidPropertyTypeErrorMessage(
        'abbreviation',
        abbreviation,
        'only string allowed'
      ))
    }
    if (abbreviation.match(lettersAndDegrees) === null) {
      throw new Error(invalidPropertyErrorMessage(
        'abbreviation',
        abbreviation,
        'only letters and degree symbol (°)'
      ))
    }
  },
  name: (name: string) => {
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
  },
  uomtId: (uomtId: number) => {
    if (!Number.isInteger(uomtId)) {
      throw new Error(invalidPropertyTypeErrorMessage(
        'uomtId',
        uomtId,
        'only numbers allowed'
      ))
    }
  }
}

type verifyProp = 'name' | 'abbreviation' | 'uomtId'
type verifyObj = {
  [k in verifyProp]: (value: any) => void
}

export default UnitsOfMeasure
