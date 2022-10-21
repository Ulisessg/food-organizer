/* eslint-disable max-statements */
/* eslint-disable max-len */
/* eslint-disable max-params */
import verifications, { verifyProp } from 'models/UnitOfMeasure/unitOfMeasureVerifications'
import Table from 'models/Table'

class UnitOfMeasure extends Table {
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

export default UnitOfMeasure
