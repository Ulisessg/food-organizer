import { type FC, useContext } from 'react'
import { Button } from 'd-system'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'
import styled from 'styled-components'

const ButtonCloseModal: FC = () => {
  const modalContext = useContext(ModalUpdateDataContext)
  return <ButtonCloseModalContainer>
  <Button
    colorMessage="cancel"
    size="100%"
    text="X"
    title="Cancelar"
    onClick={modalContext.closeModal}
  />
</ButtonCloseModalContainer>
}

export default ButtonCloseModal

const ButtonCloseModalContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  padding-left: 40px;
  & button {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
