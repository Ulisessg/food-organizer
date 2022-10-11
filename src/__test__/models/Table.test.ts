/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import Table from '../../models/Table'
import dayjs from 'dayjs'

class ExtendedTable extends Table {}

describe(
  'models/Table',
  // eslint-disable-next-line max-lines-per-function
  () => {
    test(
      'Class Table has required methods and properties',
      () => {
        const id = 1
        const tab = new ExtendedTable(
          false,
          id,
          'Test'
        )
        expect(tab.getId).toBeDefined()
        expect(tab.setId).toBeDefined()
        expect(tab.getCreationDate).toBeDefined()
        expect(tab.updateCreationDate).toBeDefined()
        expect(tab.getAllowModifications).toBeDefined()
        expect(tab.getInsertSqlScript).toBeDefined()
        expect(tab.getUpdateSqlScript).toBeDefined()
        expect(tab.getSelectSqlScript).toBeDefined()
        expect(tab.getDeleteSqlScript).toBeDefined()
        expect(tab.getTableName).toBeDefined()

        // Static Methods
        expect(Table.isValid).toBeDefined()
      }
    )
    test(
      'Class Table constructor with Id',
      () => {
      // With id
        const id = 1
        const tableWithIdAndNoModifications = new ExtendedTable(
          false,
          id,
          'TableConstructorWithId'
        )
        expect(tableWithIdAndNoModifications.getId).toStrictEqual(id)
        expect(tableWithIdAndNoModifications.getAllowModifications).toStrictEqual(false)

        const tableWithIdAndModifications = new ExtendedTable(
          true,
          id,
          'TableConstructorWithId'
        )
        expect(tableWithIdAndModifications.getId).toStrictEqual(id)
        expect(tableWithIdAndModifications.getAllowModifications).toStrictEqual(true)
      }
    )

    test(
      'Table constructor Without Id',
      () => {
        // Without id
        const tableNoIdNoMod = new ExtendedTable(
          false,
          null,
          'TableConstructorNoId'
        )
        expect(tableNoIdNoMod.getId).toStrictEqual(null)
        expect(tableNoIdNoMod.getAllowModifications).toStrictEqual(false)

        const tableNoIdMod = new ExtendedTable(
          true,
          null,
          'TableConstructorNoId'
        )
        expect(tableNoIdMod.getId).toStrictEqual(null)
        expect(tableNoIdMod.getAllowModifications).toStrictEqual(true)
      }
    )

    test(
      'Table constructor: Id type error',
      () => {
        // eslint-disable-next-line init-declarations
        let tableIdError
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
          tableIdError = new ExtendedTable(
            false,
            'Invalid ID' as unknown as number,
            'TableConstructorNoId'
          )
        } catch (error) {
          expect(tableIdError).toThrowError(TypeError(`
"allowModifications" and "tableName" params must required as "boolean" and "string" type resp.
          
"allowModifications" type: boolean
"id" type: string
"tableName" type: string
`))
          tableIdError = null
        }
      }
    )

    test(
      'Table constructor, table name correct',
      () => {
        const tableNameCorrect = new ExtendedTable(
          false,
          null,
          'Score'
        )
        expect(tableNameCorrect.getTableName).toStrictEqual('Score')
      }
    )

    test(
      'Table constructor, table name error',
      () => {
        let tableWNameError = null
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          tableWNameError = new ExtendedTable(
            false,
            null,
            'Table1'
          )
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('"tableName" only accept letters upper and lower case and underscore, NO spaces: /^[\\p{L}_]+$/u')
        }
      }
    )

    test(
      'Table constructor, table name data type error',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const tableWNameError = new ExtendedTable(
            false,
            null,
            45 as unknown as string
          )
          throw new Error('Table constructor is allowing non number data in "id" param')
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toStrictEqual(`
"allowModifications", "id" and "tableName" params must required as "boolean", "number" and "string" type resp.

"allowModifications" type: boolean
"id" type: object
"tableName" type: number
`)
          }
        }
      }
    )

    test(
      'Allow Modifications in class',
      () => {
        const id = 1
        const tb = new ExtendedTable(
          true,
          id,
          'AllowModifications'
        )
        // Timeout to ensure js is using different dates
        setTimeout(
          () => {
            const newId = 2
            const initialCreationDate = tb.getCreationDate
            tb.setId(newId)
            tb.updateCreationDate(null)

            expect(tb.getId).toStrictEqual(newId)
            expect(tb.getCreationDate).not.toBe(initialCreationDate)
          },
          500
        )
      }
    )

    test(
      'No allow modifications in class',
      () => {
        const id = 1
        const tabNoAllowMods = new ExtendedTable(
          false,
          id,
          'NoModifications'
        )
        try {
          const newId = 2
          tabNoAllowMods.setId(newId)
          throw new Error('Class modified or priv method \'preventModifications\' is not working.')
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toStrictEqual('Class modifications not allowed')
          } else {
            throw new Error('Unknown Error instance')
          }
        }
      }
    )

    test(
      'setId method',
      () => {
        const tb: Table = new ExtendedTable(
          true,
          1,
          'setId'
        )
        const prevCreationDate: string = tb.getCreationDate
        expect(tb.getId).toStrictEqual(1)
        setTimeout(
          () => {
            tb.setId(2)
            expect(tb.getId).toStrictEqual(2)
            expect(tb.getCreationDate).not.toStrictEqual(prevCreationDate)
          },
          0
        )
      }
    )

    test(
      'setId validations',
      () => {
        const tb = new ExtendedTable(
          true,
          null,
          'SetIdValidations'
        )
        // Id as no number type
        try {
          tb.setId('1' as unknown as number)
        } catch (error) {
          const err: TypeError = error as TypeError
          expect(err.message).toStrictEqual('id param must be integer: id=string')
        }
      }
    )

    test(
      'Update Creation Date method: modifications not allowed',
      () => {
        const id = 1
        const tb = new ExtendedTable(
          false,
          id,
          'UpateDate'
        )
        try {
          tb.updateCreationDate(dayjs().toISOString())
          throw new Error('UpdateCreationDate method is not preventing modifications')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )

    test(
      'Update Creation Date method: invalid date param',
      () => {
        const id = 1
        const tb = new ExtendedTable(
          true,
          id,
          'UpateDate'
        )
        try {
          tb.updateCreationDate('Invalid Date')
          throw new Error('UpdateCreationDate method is allowing invalid dates')
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Unknown date. Date: "Invalid Date" date type: string')
        }
      }
    )

    test(
      'Update Creation Date method without params',
      () => {
        const id = 1
        const tb = new ExtendedTable(
          true,
          id,
          'UpateDate'
        )
        // Timeout to ensure js is using different dates
        setTimeout(
          () => {
            const initialCreationDate = tb.getCreationDate
            const createdDate = tb.updateCreationDate(null)
            expect(tb.getCreationDate).not.toStrictEqual(initialCreationDate)
            expect(tb.getCreationDate).toStrictEqual(createdDate)
          },
          500
        )
      }
    )

    test(
      'Update Creation Date method with params',
      () => {
        const id = 1
        const tb = new ExtendedTable(
          true,
          id,
          'UpdateDate'
        )
        // Timeout to ensure js is using different dates
        setTimeout(
          () => {
            const creationDateParam: string = dayjs().toISOString()
            tb.updateCreationDate(creationDateParam)
            expect(tb.getCreationDate).toStrictEqual(creationDateParam)
          },
          500
        )
      }
    )

    test(
      'Update Creation Date return',
      () => {
        const id = 1
        const tb = new ExtendedTable(
          true,
          id,
          'UpdateDate'
        )
        // Timeout to ensure js is using different dates
        const creationDateParam: string = dayjs().toISOString()
        setTimeout(
          () => {
            const methodReturn = tb.updateCreationDate(creationDateParam)
            expect(methodReturn).toStrictEqual(creationDateParam)
          },
          500
        )
      }
    )

    const returnSqlMethods: string = 'Please override this method :)'

    test(
      'getInsertSqlScript',
      () => {
        const tbInstance: Table = new ExtendedTable(
          true,
          5,
          'getInsertSqlScript'
        )
        expect(tbInstance.getInsertSqlScript).toStrictEqual(returnSqlMethods)
      }
    )
    test(
      'getUpdateSqlScript',
      () => {
        const tbInstance: Table = new ExtendedTable(
          false,
          1,
          'getUpdateSqlScript'
        )
        expect(tbInstance.getUpdateSqlScript).toStrictEqual(returnSqlMethods)
      }
    )
    test(
      'getSelectSqlScript',
      () => {
        const tbInstance: Table = new ExtendedTable(
          false,
          6,
          'getSelectSqlScript'
        )
        expect(tbInstance.getSelectSqlScript).toStrictEqual(returnSqlMethods)
      }
    )
    test(
      'getDeleteSqlScript',
      () => {
        const tbInstance: Table = new ExtendedTable(
          false,
          6,
          'getDeleteSqlScript'
        )
        expect(tbInstance.getDeleteSqlScript).toStrictEqual(returnSqlMethods)
      }
    )
    test(
      'isValid static method',
      () => {
        expect(ExtendedTable.isValid()).toStrictEqual(true)
      }
    )

    test(
      'updateCreationDate method: prevent modifications',
      () => {
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const tbInstance: Table = new ExtendedTable(
            false,
            5,
            'preventModifications'
          )
        } catch (error) {
          const err: Error = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
      }
    )
  }
)
