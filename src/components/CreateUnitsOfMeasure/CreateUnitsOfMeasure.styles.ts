import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  width: 90%;
  grid-auto-flow: row;
  justify-items: center;
  `

export const Summary = styled.summary`
  details[open] & summary {
    margin-bottom: 30px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.dark1};;
    padding-bottom: 20px;
    width: 90%;
  }
  &:focus, &:hover {
    cursor: pointer;
  }
`

export const LabelSelect = styled.label`
  & p {
    margin-bottom: 8px;
  }
`

export const Select = styled.select`
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
