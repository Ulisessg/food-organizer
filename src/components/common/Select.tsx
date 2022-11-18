import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Select: FC<Props> = ({ id, labelText, children }) => <LabelSelect htmlFor={id}>
  <p>{labelText}</p>
  <SelectStyles id={id} defaultValue="Selecciona una opcion">
  <option value="Selecciona una opcion" disabled>-- Selecciona una opcion --</option>
  {children}
  </SelectStyles>
</LabelSelect>

interface Props {
  id: string
  labelText: string

  /** Options */
  children: ReactNode
}

const SelectStyles = styled.select`
  width: 100%;
  height: 35px;
  background-color: white;
  padding: 8px;
  border-radius: 5px;
  text-transform: capitalize;
  border: 1px solid ${({ theme }) => theme.colors.dark2};
  &:valid {
    border: 1px solid ${({ theme }) => theme.colors.dark2};
  }
  option {
    padding: 12px;
  }
`
const LabelSelect = styled.label`
  & p {
    margin-bottom: 8px;
  }
`

export default Select
