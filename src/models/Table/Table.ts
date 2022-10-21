/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import dayjs from 'dayjs'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import verifications from './tableVerifications'

abstract class Table {
  private id: number | null
  private creationDate: string
  public readonly allowModifications: boolean
  private tableName: string

  /**
   * @param {boolean} allowModifications allow or not instance modifications
   * @param {number | null} id Row id
   * @param {string} tableName Tame of Table
   *
   */
  // eslint-disable-next-line max-statements
  public constructor (allowModifications: boolean, id: number | null, tableName: string) {
    verifications.allowModifications(allowModifications)
    verifications.id(id)
    verifications.tableName(tableName)
    this.id = id
    this.allowModifications = allowModifications
    this.tableName = tableName
    this.creationDate = dayjs().toISOString()
  }

  /**
   * Verify if provided data is valid for instance class
   * @returns {boolean} boolean
   */
  public static isValid (): boolean {
    return true
  }

  /**
   * Set a new Id
   * @param {number} id
   */
  public setId (id: number): number {
    this.preventModifications()
    verifications.id(id)
    this.id = id
    return this.id
  }

  public updateCreationDate (date: string | null): string {
    this.preventModifications()
    if (date === null) {
      this.creationDate = dayjs().toISOString()
      return this.creationDate
    }
    if (typeof date !== 'string') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        'creationDate',
        date,
        'only string allowed'
      ))
    }
    verifications.creationDate(date)
    this.creationDate = date
    return this.creationDate
  }

  public setTableName (name: string): string {
    this.preventModifications()
    verifications.tableName(name)
    this.tableName = name
    return this.tableName
  }

  public get getId (): number | null {
    return this.id
  }

  public get getCreationDate (): string {
    return this.creationDate
  }

  public get getAllowModifications (): boolean {
    return this.allowModifications
  }

  public get getInsertSqlScript (): string {
    return 'Please override this method :)'
  }

  public get getUpdateSqlScript (): string {
    return 'Please override this method :)'
  }

  public get getSelectSqlScript (): string {
    return 'Please override this method :)'
  }

  public get getDeleteSqlScript (): string {
    return 'Please override this method :)'
  }

  public get getTableName (): string {
    return this.tableName
  }

  protected preventModifications (): void {
    if (!this.allowModifications) {
      throw new Error('Class modifications not allowed')
    }
  }

  protected abstract verifyProperties (propName: any, value: any): void
}

export default Table
