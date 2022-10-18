/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import dayjs from 'dayjs'
import { lettersAndUnderscore } from '../utils/RegExps'

abstract class Table {
  private id: number | null
  private creationDate: string
  public readonly allowModifications: boolean
  private readonly tableName: string

  /**
   * @param {boolean} allowModifications allow or not instance modifications
   * @param {number | null} id Row id
   * @param {string} tableName Tame of Table
   *
   */
  public constructor (allowModifications: boolean, id: number | null, tableName: string) {
    // Constructor verifications
    if (
      typeof allowModifications !== 'boolean' ||
      !(!Number.isInteger(id) || id !== null) ||
      typeof tableName !== 'string'
    ) {
      throw new TypeError(`
"allowModifications", "id" and "tableName" params must required as "boolean", "number" and "string" type resp.

"allowModifications" type: ${typeof allowModifications}
"id" type: ${typeof id}
"tableName" type: ${typeof tableName}
`)
    }

    // Avoid sql injection
    if (tableName.match(lettersAndUnderscore) === null) {
      throw new Error('"tableName" only accept letters upper and lower case and underscore, NO spaces: /^[\\p{L}_]+$/u')
    }

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
  public setId (id: number): void {
    this.preventModifications()

    if (!Number.isInteger(id)) {
      throw new TypeError(`id param must be integer: id=${typeof id}`)
    }

    this.id = id
  }

  public get getId (): number | null {
    return this.id
  }

  public get getCreationDate (): string {
    return this.creationDate
  }

  public updateCreationDate (date: string | null): string {
    this.preventModifications()
    if (dayjs(date).isValid()) {
      this.creationDate = date as string
    } else if (date === null) {
      this.creationDate = dayjs().toISOString()
    } else {
      throw new Error(`Unknown date. Date: "${date}" date type: ${typeof date}`)
    }

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
