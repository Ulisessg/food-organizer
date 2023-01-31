import React, { forwardRef } from 'react'
import { Details as Det } from 'd-system'
import styled from 'styled-components'

// eslint-disable-next-line prefer-arrow-callback
export default forwardRef<'details', DetailsProps>(function Details ({
  children,
  summary
}, ref) {
  return <>
  <Container>
    <DetailsStyles ref={ref as any} summary={summary}>
      {children}
    </DetailsStyles>
  </Container>
</>
})

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

const DetailsStyles = styled(Det)`
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
