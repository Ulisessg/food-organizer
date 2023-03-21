/* eslint-disable max-params */
import { type TGetKeysFromArrayOfStrings } from 'Types'

/**
 * @param dbTableFields it must be referenced as const (getDataFromTable(
 * ... *,*
 *[
 *  'a',
 *  'b',
 *  'c'
 *] as const
 *))
 *
 */
export const getDataFromTable: TGetDataFromTable = (
  htmlTable,
  dbTable,
  elementId,
  dbTableFields
) => {
  const fieldsData = new Map()

  dbTableFields.forEach((field) => {
    const tableCellQuery =
      `td[data-db-table="${dbTable}"][data-element-id="${elementId}"][data-db-field="${field}"]`
    const tableCell = htmlTable.querySelector(tableCellQuery) as HTMLTableCellElement
    if (tableCell === null) {
      throw new Error(`No table cells founded with query: ${tableCellQuery}`)
    }
    fieldsData.set(
      field,
      tableCell.textContent as string
    )
  })
  return Object.fromEntries(fieldsData)
}

type TGetDataFromTable = <T extends readonly string[]>(
  htmlTable: HTMLTableElement,
  dbTable: string,
  elementId: string,
  dbTableFields: T,
) => Record<TGetKeysFromArrayOfStrings<T>, string>
