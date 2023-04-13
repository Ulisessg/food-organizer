/* eslint-disable max-lines-per-function */
import { Button, Td } from 'd-system'
import React, { type FC, type MouseEvent } from 'react'

export const RowWithSpan: FC<RowWithSpanProps> = ({
  rowSpan,
  uomAbbreviation,
  uomId,
  uomName,
  uomtId, uomtName,
  openModal,
  uomIds,
  elementIndex,
  groupingElementIndex
}) => <tr
    data-uom-id={uomId}
    data-uomt-id={uomtId}
  >
    <Td
      rowSpan={rowSpan}
      data-db-table="units_of_measure_type"
      data-element-id={uomtId}
      data-db-field="name"
      data-grouping-element-index={groupingElementIndex}
    >
      {uomtName}
    </Td>

  <Td
    data-db-table="units_of_measure"
    data-element-id={uomId}
    data-db-field="name"
    data-element-index={elementIndex}
    data-grouping-element-index={groupingElementIndex}
  >
    {uomName}
  </Td>
  <Td
    data-db-table="units_of_measure"
    data-element-id={uomId}
    data-db-field="abbreviation"
    data-grouping-element-index={groupingElementIndex}
    data-element-index={elementIndex}
  >
    {uomAbbreviation}
  </Td>

  <Td
    rowSpan={rowSpan}
    data-buttons-container
    data-uom-ids={uomIds.toString()}
    data-uomt-id={uomtId}
  >
    <Button
      colorMessage="info"
      size="small"
      text="Editar"
      type="button"
      data-grouping-element-index={groupingElementIndex}
      onClick={openModal}
    />
  </Td>
</tr>

export const RowNoSpan: FC<RowNoSpanProps> = ({
  uomAbbreviation,
  uomName,
  uomId,
  elementIndex,
  groupingElementIndex
}) => <>
  <tr>
  <Td
    data-db-table="units_of_measure"
    data-element-id={uomId}
    data-db-field="name"
    data-grouping-element-index={groupingElementIndex}
    data-element-index={elementIndex}
  >
    {uomName}
  </Td>
  <Td
    data-db-table="units_of_measure"
    data-element-id={uomId}
    data-db-field="abbreviation"
    data-grouping-element-index={groupingElementIndex}
    data-element-index={elementIndex}
  >
    {uomAbbreviation}
  </Td>
</tr>
  </>

interface RowWithSpanProps extends RowCommonProps {
  rowSpan: number
  uomtId: number
  uomIds: number[]
  openModal: (ev: MouseEvent<HTMLButtonElement>) => void
}

interface RowNoSpanProps extends RowCommonProps {
}

/** Fileds on units of measure table on database */
export type TDataFields = 'name' | 'abbreviation'

interface RowCommonProps {
  elementIndex: number
  groupingElementIndex: number

  /** "uomtName" used for consistency in "useDisplayUOMRows" hook */
  uomtName: string
  uomName: string
  uomAbbreviation: string
  uomId: number
}
