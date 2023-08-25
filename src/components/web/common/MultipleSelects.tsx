import { type ComponentProps, type FC, useContext } from 'react'
import { Button } from 'd-system'
import { MultipleSelectsContext } from 'context/MultipleSelectsContext'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
  align-content: end;
  align-items: end;
  & label {
    width: 65%;
    margin: 0 !important;
    @media screen and (min-width: 750px) {
      width: 80%;
    }
  }
  & label > select, & label > input {
    margin: 0px;
  }
  & label > p {
    margin-bottom: 8px;
  }

  & button {
    display: flex;
    height: 30px;
    width: 80px;
    margin: 0 !important;
    align-items: center;
    justify-content: center;
  }
`

export const ButtonAddSelect: FC<ButtonAddSelectProps> = (props) => {
  const { addSelect } = useContext(MultipleSelectsContext)
  return <ButtonAddSelectStyles
  {...props}
  colorMessage="info"
  size="100%"
  type="button"
  onClick={(ev) => {
    props.onClick?.(ev)
    addSelect()
  }}
/>
}
const ButtonAddSelectStyles = styled(Button)`
  margin-bottom: 32px;
  margin-top: 16px;
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
