import Table from '../../models/Table'

describe(
  'models/Table',
  () => {
    test(
      'Definition',
      () => {
        const tableWithId = new Table(1)
        expect(typeof tableWithId.getId()).toStrictEqual('number')
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
