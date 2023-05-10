import { Button, type ButtonProps } from 'd-system'
import ModalComponent, { type Props, type Styles } from 'react-modal'
import { type FC } from 'react'
import styled from 'styled-components'

ModalComponent.setAppElement('#__next')

const modalStyles: Styles = {
  content: {
    alignContent: 'space-between',
    borderRadius: '30px',
    display: 'grid',
    gridRowGap: '15px',
    inset: '10px',
    justifyContent: 'center',
    justifyItems: 'center',
    overflow: 'auto',
    position: 'fixed'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
}

const Modal: FC<Props> = (props) => <ModalComponent
  {...props}
  style={modalStyles}

>
  {props.children}
</ModalComponent>

export const ModalButtons: FC<ModalButtonsProps> = (props) => <ButtonsContainer>
  <Button
    {...props.continueButtonProps}
    colorMessage="continue"
  />
  <Button
    {...props.cancellButtonProps}
    colorMessage="cancel"
  />
</ButtonsContainer>

const ButtonsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  grid-gap: 10px;
  justify-content: space-evenly;
  margin-top: 30px;
`

export interface ModalButtonsProps {
  continueButtonProps: TButtonProps
  cancellButtonProps: TButtonProps
}

export type TButtonProps = Omit<ButtonProps, 'colorMessage'>

export default Modal
