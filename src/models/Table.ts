/* eslint-disable max-len */
import dayjs from 'dayjs'

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
    if (tableName.match(/^[A-Za-z]+$/u) === null) {
      throw new Error('"tableName" only accept letters upper and lower case, NO spaces: [A-Za-z]')
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
    console.warn('Please override isValid method')
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
    console.warn(
      'Please override this method :): ',
      this.tableName
    )
    return 'Please override this method :)'
  }

  public get getUpdateSqlScript (): string {
    console.log(
      'Table Name: ',
      this.tableName
    )
    return 'Please override this method :)'
  }

  public get getSelectSqlScript (): string {
    console.log(
      'Table Name: ',
      this.tableName
    )
    return 'Please override this method :)'
  }

  public get getDeleteSqlScript (): string {
    console.log(
      'Table Name: ',
      this.tableName
    )
    return 'Please override this method :)'
  }

  public get getTableName (): string {
    return this.tableName
  }

  private preventModifications (): void {
    if (!this.allowModifications) {
      throw new Error('Class modifications not allowed')
    }
  }
}

export default Table
