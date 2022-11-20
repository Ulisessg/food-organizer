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

export const ButtonAddPP = styled(Button)`
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
