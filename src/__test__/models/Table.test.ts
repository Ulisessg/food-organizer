/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import { invalidPropertyErrorMessage, invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import Table from '../../models/Table/Table'
import dayjs from 'dayjs'

class ExtendedTable extends Table {
  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (prop: any): void {
    throw new Error('Method not implemented.')
  }
}

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
        // Setters
        expect(tab.setId).toBeDefined()
        expect(tab.setTableName).toBeDefined()
        expect(tab.updateCreationDate).toBeDefined()
        // Getters
        expect(tab.getId).toBeDefined()
        expect(tab.getCreationDate).toBeDefined()
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

    // Constructor

    /* Constructor invalid type */

    let err: Error | null = null

    test(
      'Table constructor: invalid "allowModifications"',
      () => {
        const invalidAllowModifications: boolean = 'Invalid allow modifications' as unknown as boolean
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
          const et = new ExtendedTable(
            invalidAllowModifications,
            1,
            'any'
          )
          throw new Error('Constructor is allowing invalid "allowModifications" param')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'allowModifications',
            invalidAllowModifications,
            'only boolean allowed'
          ))
        }
        err = null
      }
    )

    test(
      'Table constructor: Id type error',
      () => {
        const invalidId: number = 'Invalid ID' as unknown as number
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
          const et = new ExtendedTable(
            false,
            invalidId,
            'TableConstructorNoId'
          )
          throw new Error('Constructor is allowing invalid "id" param')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'id',
            invalidId,
            'only number or null allowed'
          ))
        }
        err = null
      }
    )

    test(
      'Table constructor, invalid "tableName" type',
      () => {
        const invalidTableNameType: string = 45 as unknown as string
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const tableWNameError = new ExtendedTable(
            false,
            1,
            invalidTableNameType
          )
          throw new Error('Table constructor is allowing invalid "tableName" param')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'tableName',
            invalidTableNameType,
            'only string allowed'
          ))
        }
        err = null
      }
    )

    /* Constructor invalid format */

    test(
      'Table constructor, invalid "tableName" format',
      () => {
        const invalidTableName: string = '!Invalid Table name'
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const tableWNameError = new ExtendedTable(
            false,
            null,
            invalidTableName
          )
          throw new Error('Table constructor is allowing invalid "tableName" format')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'tableName',
            invalidTableName,
            'only accept letters upper and lower case and underscore, NO spaces'
          ))
        }
        err = null
      }
    )

    test(
      'Table constructor invalid id: non integer',
      () => {
        const invalidId = 2.2
        try {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const tb = new ExtendedTable(
            true,
            invalidId,
            'some'
          )
          throw new Error('Table constructor is allowing non integer "id"')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'id',
            invalidId,
            'only integer number allowed'
          ))
        }
      }
    )

    // Setters

    /* Invalid format */

    test(
      'updateCreationDate invalid format',
      () => {
        const invalidISO8601Date = '2012-03-01T00:00:00Z'
        try {
          const tb = instance()
          tb.updateCreationDate(invalidISO8601Date)
          throw new Error('updateCreationDate is allowing invalid "ISO 8601" date')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'creationDate',
            invalidISO8601Date,
            'only ISO8601 date allowed, such as: 2019-01-25T02:00:00.000Z'
          ))
        }
        err = null
      }
    )

    test(
      'setTableName invalid format',
      () => {
        const tb = instance()
        const invalidTableName = '2012-03-01T00:00:00Z'
        try {
          tb.setTableName(invalidTableName)
          throw new Error('setTableName is allowing invalid "tableName"')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyErrorMessage(
            'tableName',
            invalidTableName,
            'only accept letters upper and lower case and underscore, NO spaces'
          ))
        }
        err = null
      }
    )

    /* Prevent modifications */

    test(
      'updateCreationDate preventModifications',
      () => {
        try {
          const tb = instance(false)
          tb.updateCreationDate(dayjs().toISOString())
          throw new Error('UpdateCreationDate method is not preventing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )
    test(
      'setId preventModifications',
      () => {
        try {
          const tb = instance(false)
          tb.setId(33)
          throw new Error('setId method is not preventing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    test(
      'setTableName preventModifications',
      () => {
        try {
          const tb = instance(false)
          tb.setTableName('Any')
          throw new Error('setTableName method is not preventing modifications')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual('Class modifications not allowed')
        }
        err = null
      }
    )

    /* Invalid type */

    test(
      'setId invalid "Id" type',
      () => {
        const tb = instance()
        const invalidId: number = '1' as unknown as number
        try {
          tb.setId(invalidId)
          throw new Error('setId is allowing invalid "id" type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'id',
            invalidId,
            'only number or null allowed'
          ))
        }
        err = null
      }
    )

    test(
      'setId invalid "Id" type: non integer',
      () => {
        const tb = instance()
        const nId = 1.1
        try {
          tb.setId(nId)
          throw new Error('setId is allowing non integer numbers')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'id',
            nId,
            'only integer number allowed'
          ))
        }
      }
    )
    test(
      'setTableName invalid type',
      () => {
        const tb = instance()
        const invalidTableName: string = {} as unknown as string
        try {
          tb.setTableName(invalidTableName)
          throw new Error('setTableName is allowing invalid type')
        } catch (error) {
          err = error as TypeError
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'tableName',
            invalidTableName,
            'only string allowed'
          ))
        }
        err = null
      }
    )

    test(
      'updateCreationDate invalid type',
      () => {
        const invalidDateType: string = {} as unknown as string
        try {
          const tb = instance()
          tb.updateCreationDate(invalidDateType)
          throw new Error('UpdateCreationDate method is allowing invalid date type')
        } catch (error) {
          err = error as Error
          expect(err.message).toStrictEqual(invalidPropertyTypeErrorMessage(
            'creationDate',
            invalidDateType,
            'only string allowed'
          ))
        }
        err = null
      }
    )

    /* Success */
    test(
      'setId success',
      () => {
        const tb: Table = instance()
        expect(tb.getId).toStrictEqual(1)
        setTimeout(
          () => {
            expect(tb.setId(2)).toStrictEqual(2)
            expect(tb.getId).toStrictEqual(2)
          },
          0
        )
      }
    )

    test(
      'updateCreationDate without params success',
      () => {
        const tb = instance()
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
      'updateCreationDate with params success',
      () => {
        const tb = instance()
        // Timeout to ensure js is using different dates
        setTimeout(
          () => {
            const creationDateParam: string = dayjs().toISOString()
            expect(tb.updateCreationDate(creationDateParam)).toStrictEqual(creationDateParam)
            expect(tb.getCreationDate).toStrictEqual(creationDateParam)
          },
          500
        )
      }
    )

    test(
      'setTableName success',
      () => {
        const tb = instance()
        expect(tb.setTableName('newTable_name')).toStrictEqual('newTable_name')
        expect(tb.getTableName).toStrictEqual('newTable_name')
      }
    )

    // Getters
    test(
      'getId',
      () => {
        const tb = instance()
        expect(tb.getId).toStrictEqual(1)
      }
    )
    test(
      'getAllowModifications',
      () => {
        const tb = instance()
        expect(tb.getAllowModifications).toStrictEqual(true)
      }
    )
    test(
      'getTableName',
      () => {
        const tb = instance()
        expect(tb.getTableName).toStrictEqual('table')
      }
    )

    const returnSqlMethods: string = 'Please override this method :)'

    test(
      'getInsertSqlScript',
      () => {
        const tbInstance = instance()
        expect(tbInstance.getInsertSqlScript).toStrictEqual(returnSqlMethods)
      }
    )
    test(
      'getUpdateSqlScript',
      () => {
        const tbInstance: Table = instance()
        expect(tbInstance.getUpdateSqlScript).toStrictEqual(returnSqlMethods)
      }
    )
    test(
      'getSelectSqlScript',
      () => {
        const tbInstance: Table = instance()
        expect(tbInstance.getSelectSqlScript).toStrictEqual(returnSqlMethods)
      }
    )
    test(
      'getDeleteSqlScript',
      () => {
        const tbInstance: Table = instance()
        expect(tbInstance.getDeleteSqlScript).toStrictEqual(returnSqlMethods)
      }
    )
    test(
      'isValid static method',
      () => {
        expect(ExtendedTable.isValid()).toStrictEqual(true)
      }
    )
  }
)

function instance (allowModifications: boolean = true): ExtendedTable {
  if (allowModifications) {
    return new ExtendedTable(
      true,
      1,
      'table'
    )
  }
  return new ExtendedTable(
    false,
    1,
    'table'
  )
}
