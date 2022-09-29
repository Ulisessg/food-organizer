import Table from '../../models/Table'

describe(
  'models/Table',
  () => {
    test(
      'Definition',
      () => {
        const tableWithId = new Table()
        expect(tableWithId.getId()).toStrictEqual(null)
        expect(tableWithId.setId).toBeDefined()
        expect(tableWithId.isValid()).toStrictEqual(true)
        expect(tableWithId.getInsertSqlScript()).toStrictEqual('')
        expect(tableWithId.getUpdateSqlScript()).toStrictEqual('')
        expect(tableWithId.getSelectSqlScript()).toStrictEqual('')
        expect(tableWithId.getDeleteSqlScript()).toStrictEqual('')
      }
    )
  }
)
