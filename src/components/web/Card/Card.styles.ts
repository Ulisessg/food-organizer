import styled from 'styled-components'

const CardStyles = styled.section`
  display: grid;
  justify-content:center;
  justify-items: center;
  text-align: center;
  align-items: center;
  align-content: center;
  border: 1.3px solid ${({ theme }) => theme.colors.dark2};
  min-height: 120px;
  font-size: 18px;
  padding: 2px;
  border-radius: 25px;
  box-shadow: 1px 1px 3px 2px ${({ theme }) => theme.colors.shadow};
  margin-bottom: 20px;
`
export default CardStyles
