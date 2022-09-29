export default class Table {
  private readonly id: TId
  constructor (id: TId = null) {
    this.id = id
  }

  getId (): TId {
    return this.id
  }

  setId (): void {
    console.warn(
      'Implements an id set function',
      { id: this.getId() }
    )
  }

  isValid (): boolean {
    console.warn(
      'Implements validations function',
      { id: this.getId() }
    )
    return true
  }

  getInsertSqlScript (): string {
    console.warn(
      'Implements sql script',
      { id: this.getId() }
    )
    return ''
  }

  getUpdateSqlScript (): string {
    console.warn(
      'Implements sql script',
      { id: this.getId() }
    )
    return ''
  }

  getSelectSqlScript (): string {
    console.warn(
      'Implements sql script',
      { id: this.getId() }
    )
    return ''
  }

  getDeleteSqlScript (): string {
    console.warn(
      'Implements sql script',
      { id: this.getId() }
    )
    return ''
  }
}

type TId = number | null
