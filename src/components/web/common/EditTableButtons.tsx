/* eslint-disable no-constant-binary-expression */
import React, { type FC, type MouseEvent, useState } from 'react'
import { Button } from 'd-system'
import styled from 'styled-components'

const EditTableButtons: FC<Props> = ({ onUpdate, className, handleEditProp, editProp }) => {
  const [
    edit,
    setEdit
  ] = useState<boolean>(false)
  const handleEdit = (ev: MouseEvent<HTMLButtonElement>): void => {
    if (typeof handleEditProp === 'undefined') {
      setEdit(!edit)
    } else {
      handleEditProp(ev)
    }
  }

  return <EditButtonsContainer data-is-active={editProp ?? edit} className={className}>
   {(editProp ?? edit) && <>
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
          {(!(editProp ?? false) ?? !edit) && <Button
            colorMessage="info"
            size="100%"
            text="Editar"
            type="button"
            onClick={handleEdit} />}
  </EditButtonsContainer>
}

interface Props {
  onUpdate: (ev: MouseEvent<HTMLButtonElement>) => void
  className?: string
  handleEditProp?: (ev: MouseEvent<HTMLButtonElement>) => void
  editProp?: boolean
}

const EditButtonsContainer = styled.div`
display: grid;
grid-auto-flow: column;
grid-gap: 10px;
width: 250px;
`

export default EditTableButtons
