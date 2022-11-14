import styled from 'styled-components'

const IndexContainer = styled.div`
  width: 100%;
  width: 90vw;
`

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 320px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }
`

export const Title = styled.h1`
  margin: 30px 0px;
  text-align: center;
`

export default IndexContainer
