import React, { FC } from 'react'
import styled from 'styled-components'

const Details: FC<DetailsProps> = ({ summary, children }) => <>
  <Container>
    <DetailsStyles>
      <Summary>{summary}</Summary>
      {children}
    </DetailsStyles>
  </Container>
</>

interface DetailsProps {
  summary: string
  children: React.ReactNode
}

const Container = styled.div`
  display: grid;
  width: 90%;
  grid-auto-flow: row;
  justify-items: center;
`
const DetailsStyles = styled.details`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.dark1};
  margin: 20px 0px;
  width: 90%;
  form {
    width: auto;
    padding: 20px 40px;
    margin: 20px 0px;
    & label {
      margin-bottom: 20px;
    }
    & button {
      margin-top: 30px;
    }
  }
`

const Summary = styled.summary`
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

export default Details
