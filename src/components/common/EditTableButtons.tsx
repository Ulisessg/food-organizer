import React, { FC, useState } from 'react'
import { Button } from 'd-system'
import styled from 'styled-components'

const EditTableButtons: FC<Props> = ({ onUpdate }) => {
  const [
    edit,
    setEdit
  ] = useState<boolean>(false)
  const handleEdit = (): void => setEdit(!edit)

  return <EditButtonsContainer>
   {edit && <>
            <Button
              colorMessage="continue"
              size="100%"
              text="Actualizar"
              type="button"
              onClick={onUpdate}
            />
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
  </EditButtonsContainer>
}

interface Props {
  onUpdate: () => void
}

const EditButtonsContainer = styled.td`
display: grid;
grid-auto-flow: column;
grid-gap: 3px;
width: 220px;
justify-items: center;
align-items: center;
align-content: center;
align-self: center;
`

export default EditTableButtons
