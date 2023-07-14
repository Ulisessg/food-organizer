import { Button, type ButtonProps } from 'd-system'
import React, { type FC } from 'react'
import styled from 'styled-components'

const ButtonsUpdate: FC<ButtonsUpdateProps> = (props) => {
  const onClickContinue: typeof props.buttonContinueProps.onClick = (ev) => {
    ev.preventDefault()
    props.buttonContinueProps.onClick?.(ev)
  }
  const onClickRestart: typeof props.buttonRestartProps.onClick = (ev) => {
    ev.preventDefault()
    props.buttonRestartProps.onClick?.(ev)
  }

  return <ButtonsContainer>
<Button
  {...props.buttonContinueProps}
  onClick={onClickContinue}
  colorMessage="continue"
  size="small"
  text="Actualizar"
  type="button"
/>
<Button
  {...props.buttonRestartProps}
  onClick={onClickRestart}
  colorMessage="info"
  size="small"
  text="Deshacer cambios"
  type="button"
/>
</ButtonsContainer>
}

interface ButtonsUpdateProps {
  buttonContinueProps: CustomButtonProps
  buttonRestartProps: CustomButtonProps
}

type CustomButtonProps = Omit<ButtonProps, 'text' | 'size' | 'colorMessage' | 'type'>

export default ButtonsUpdate

const ButtonsContainer = styled.div`
display: flex;
margin-top: 8px;
& :first-child {
  margin-right: 24px;
}
`
