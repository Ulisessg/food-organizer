/* eslint-disable max-lines-per-function */
import React, { type FC } from 'react'
import EditTableButtons from 'components/common/EditTableButtons'
import { Td } from 'd-system'

const Rows: FC<Props> = ({
  uomAbbreviation,
  uomName, uomtName,
  rowSpan
}: Props) => {
  const onUpdate = (): void => {
    console.log('Update function! :D')
  }
  if (typeof rowSpan === 'number') {
    return <tr>
      <Td rowSpan={rowSpan}>{uomtName}</Td>
      <Td>{uomName}</Td>
      <Td>{uomAbbreviation}</Td>

      <EditTableButtons onUpdate={onUpdate} />
    </tr>
  }
  return <tr>
    <Td>{uomName}</Td>
    <Td>{uomAbbreviation}</Td>
    <EditTableButtons onUpdate={onUpdate} />
</tr>
}

export default Rows

interface Props {
  rowSpan?: number
  uomtName: string
  uomName: string
  uomAbbreviation: string
}
