import React, { FC, useState } from 'react'
import { Button } from 'd-system'
import styled from 'styled-components'

const EditTableButtons: FC<Props> = ({ onUpdate, className }) => {
  const [
    edit,
    setEdit
  ] = useState<boolean>(false)
  const handleEdit = (): void => setEdit(!edit)

  return <EditButtonsContainer data-is-active={edit} className={className}>
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
  className?: string
}

const EditButtonsContainer = styled.td`
display: grid;
grid-auto-flow: column;
grid-gap: 10px;
width: 250px;
`

export default EditTableButtons
