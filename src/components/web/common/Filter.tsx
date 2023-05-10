import React, { type FC } from 'react'
import { Button } from 'd-system'
import styled from 'styled-components'

const Filter: FC<FilterProps> = ({ value, updateFilter, propName }) => {
  const deleteFilter = (): void => {
    updateFilter(
      'remove',
      value,
      propName
    )
  }
  return <FilterStyles>
  <p>{value}</p>
  <ButtonContainer>
    <Button
      colorMessage="cancel"
      size="100%"
      text="X"
      type="button"
      onClick={deleteFilter}
    />
  </ButtonContainer>
</FilterStyles>
}

interface FilterProps {
  value: string
  updateFilter: (
    action: 'add' | 'remove',
    filter: string,
    propertyName: string) => void
  propName: string
}

const FilterStyles = styled.div`
  display: grid;
  align-items: center;
  align-content: center;
  width: 100%;
  border: 1px solid black;
  margin-bottom: 10px;
  height: 35px;
  padding: 10px;
  border-radius: 100px;
  grid-template-columns: 30fr 30px;
  @media screen and (min-width: 780px) {
    grid-template-columns: 10fr 1fr;
  }
`
const ButtonContainer = styled.div`
  padding: 40px 0px;
  & button {
    margin: 0px !important;
  }
`

export default Filter
