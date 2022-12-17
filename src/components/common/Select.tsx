import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Select: FC<Props> = ({
  id,
  labelText,
  children,
  onChange,
  value,
  name,
  required
}) => <LabelSelect htmlFor={id}>
  <p>{labelText}</p>
  <SelectStyles onChange={onChange} id={id} value={value} name={name} required={required}>
  <option value="Selecciona una opcion" disabled>-- Selecciona una opcion --</option>
  {children}
  </SelectStyles>
</LabelSelect>

interface Props {
  id: string
  labelText: string

  /** Options */
  children: ReactNode
  onChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string
  name?: string
  required?: boolean
}

const SelectStyles = styled.select`
  width: 100%;
  height: 35px;
  background-color: white;
  padding: 8px;
  border-radius: 5px;
  text-transform: capitalize;
  border: 1px solid ${({ theme }) => theme.colors.dark2};
  &:hover {
    cursor: pointer;
  }
  &:valid {
    border: 1px solid ${({ theme }) => theme.colors.dark2};
  }
  option {
    padding: 12px;
    &:hover {
      cursor: pointer;
    }
  }
`
const LabelSelect = styled.label`
  & p {
    margin-bottom: 8px;
  }
`

export default Select
