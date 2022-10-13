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
    this.verifyProperties({ abbreviation, name, uomtId })
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
    this.verifyProperties({ abbreviation: this.abbreviation, name, uomtId: this.uomtId })
    this.name = name
    return this.name
  }

  public setAbbreviation (abbreviation: string): string {
    this.verifyProperties({ abbreviation, name: this.name, uomtId: this.uomtId })
    this.abbreviation = abbreviation
    return this.abbreviation
  }

  public setUomtId (id: number): number {
    this.verifyProperties({ abbreviation: this.abbreviation, name: this.name, uomtId: id })
    this.uomtId = id
    return this.uomtId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties ({ abbreviation, name, uomtId }: verifyPropertiesParam): void {
    if (typeof abbreviation !== 'string') {
      throw new Error(invalidPropertyTypeErrorMessage(
        'abbreviation',
        abbreviation,
        'only string allowed'
      ))
    } else if (abbreviation.match(lettersAndDegrees) === null) {
      throw new Error(invalidPropertyErrorMessage(
        'abbreviation',
        abbreviation,
        'only letters and degree symbol (°)'
      ))
    }

    if (typeof name !== 'string') {
      throw new Error(invalidPropertyTypeErrorMessage(
        'name',
        name,
        'only string allowed'
      ))
    } else if (name.match(lettersWithSpaces) === null) {
      throw new Error(invalidPropertyErrorMessage(
        'name',
        name,
        'only letters and spaces allowed'
      ))
    }

    if (!Number.isInteger(uomtId)) {
      throw new Error(invalidPropertyTypeErrorMessage(
        'uomtId',
        uomtId,
        'only numbers allowed'
      ))
    }
  }
}

interface verifyPropertiesParam {
  name: string
  abbreviation: string
  uomtId: number
}

export default UnitsOfMeasure
