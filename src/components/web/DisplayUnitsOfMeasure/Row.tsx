/* eslint-disable max-lines-per-function */
import React, { type FC, type MouseEvent } from 'react'
import ButtonOpenModal from 'components/web/common/ModalUpdateData/ButtonOpenModal'
import { Td } from 'd-system'

export const RowWithSpan: FC<RowWithSpanProps> = ({
  rowSpan,
  uomAbbreviation,
  uomName,
  uomtName,
  elementIndex,
  groupingElementIndex,
  onClickOpenModal
}) => <tr>
    <Td rowSpan={rowSpan}>
      {uomtName}
    </Td>

  <Td>
    {uomName}
  </Td>
  <Td>
    {uomAbbreviation}
  </Td>

  <Td
    rowSpan={rowSpan}
  >
    <ButtonOpenModal
      size="small"
      text="Editar"
      elementIndex={elementIndex}
      groupingElementIndex={groupingElementIndex}
      onClick={onClickOpenModal}
    />
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
  onClickOpenModal: (ev: MouseEvent<HTMLButtonElement>) => void
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
}
