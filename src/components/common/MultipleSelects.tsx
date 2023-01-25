import { type ComponentProps, type FC } from 'react'
import { Button } from 'd-system'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  margin-bottom: 20px;
  & label {
    width: 65%;
    margin: 0 !important;
    @media screen and (min-width: 750px) {
      width: 80%;
    }
  }
  & button {
    height: 35px;
    width: 80px;
    margin: 0 !important;
    align-self: end;
  }
`

export const ButtonAddSelect: FC<ButtonAddSelectProps> = (props) => <ButtonAddSelectStyles
    {...props}
    colorMessage="info"
    size="100%"
    type="button"
  />

const ButtonAddSelectStyles = styled(Button)`
  margin-bottom: 30px;
  &:disabled {
    &:active {
      transform: none;
    }
    &:hover {
      box-shadow: none;
    }
    background-color: grey;
  }
`

export const ButtonDeleteSelect: FC<ButtonDeleteSelectProps> = (props) => (
  <Button {...props}
    colorMessage="cancel"
    size="100%"
    type="button"
    text="X"
  />
)

type ButtonDeleteSelectProps = Omit<ComponentProps<typeof Button>,
'colorMessage' | 'size' | 'type' | 'text'> & { 'data-select-id': string }

type ButtonAddSelectProps = Omit<ComponentProps<typeof Button>,
'colorMessage' | 'size' | 'type'> & { disabled: boolean }
