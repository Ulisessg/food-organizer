/* eslint-disable max-lines-per-function */
import { EditButtonsStyles, Td } from './DisplayUnitsOfMeasure.styles'
import React, { FC, useState } from 'react'
import { Button } from 'd-system'

const Rows: FC<Props> = ({
  uomAbbreviation,
  uomName, uomtName,
  rowSpan
}: Props) => {
  const [
    edit,
    setEdit
  ] = useState<boolean>(false)
  const handleEdit = (): void => setEdit(!edit)

  if (typeof rowSpan === 'number') {
    return <tr>
      <Td rowSpan={rowSpan}>{uomtName}</Td>
      <Td>{uomName}</Td>
      <Td>{uomAbbreviation}</Td>
      <Td>
      <EditButtonsStyles>
          {edit && <>
            <Button colorMessage="continue" size="100%" text="Actualizar" type="button" />
            <Button
              colorMessage="cancel"
              size="100%"
              text="Cancelar"
              type="button"
              onClick={handleEdit} />
          </>}
          {!edit && <Button
            colorMessage="info"
            size="100%"
            text="Editar"
            type="button"
            onClick={handleEdit} />}
      </EditButtonsStyles>
      </Td>
    </tr>
  }
  return <tr>
    <Td>{uomName}</Td>
    <Td>{uomAbbreviation}</Td>
    <Td>
    <EditButtonsStyles>
      {edit && <>
        <Button colorMessage="continue" size="100%" text="Actualizar" type="button" />
        <Button
          colorMessage="cancel"
          size="100%"
          text="Cancelar"
          type="button"
          onClick={handleEdit} />
      </>}
      {!edit && <Button
        colorMessage="info"
        size="100%"
        text="Editar"
        type="button"
        onClick={handleEdit}
        />}
    </EditButtonsStyles>
  </Td>
</tr>
}

export default Rows

interface Props {
  rowSpan?: number
  uomtName: string
  uomName: string
  uomAbbreviation: string
}
