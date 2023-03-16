/* eslint-disable max-lines-per-function */
import { Button, Td } from 'd-system'
import React, { type FC, type MouseEvent } from 'react'

export const RowWithSpan: FC<RowWithSpanProps> = ({
  rowSpan,
  uomAbbreviation,
  uomId,
  uomName,
  uomtId, uomtName,
  openModal
}) => <tr
    data-uom-id={uomId}
    data-uomt-id={uomtId}
  >
    <Td
      rowSpan={rowSpan}
    >
      {uomtName}
    </Td>

    <Td>
    {uomName}
  </Td>
  <Td>
    {uomAbbreviation}
  </Td>

  <Td hidden={typeof rowSpan === 'undefined'} rowSpan={rowSpan}>
  <Button colorMessage="info" size="small" text="Editar" type="button" onClick={openModal} />
  </Td>
</tr>

export const RowNoSpan: FC<RowNoSpanProps> = ({
  uomAbbreviation,
  uomName
}) => <>
  <tr>
  <Td>
    {uomName}
  </Td>
  <Td>
    {uomAbbreviation}
  </Td>
</tr>
  </>

interface RowWithSpanProps extends RowCommonProps {
  rowSpan: number
  uomtId: number
  openModal: (ev: MouseEvent<HTMLButtonElement>) => void
}

interface RowNoSpanProps extends RowCommonProps {

}

/** Fileds on units of measure table on database */
export type TDataFields = 'name' | 'abbreviation'

interface RowCommonProps {

  /** "uomtName" used for consistency in "useDisplayUOMRows" hook */
  uomtName: string
  uomName: string
  uomAbbreviation: string
  uomId: number
}
