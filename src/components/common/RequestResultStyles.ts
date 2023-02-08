import styled from 'styled-components'

const RequestResultStyles = styled.span<{ isError: boolean, hidden: boolean, marginTop?: string }>`
  display: ${({ hidden }) => {
    if (hidden) return 'hidden'
    return 'initial'
  }};
  color: ${({ theme, isError }) => {
    if (isError) return theme.colors.error
    return theme.colors.light2
  }};
  font-size: 20px;
  text-align: center;
  margin-top: ${({ marginTop }) => {
    if (typeof marginTop === 'string') return marginTop
    return '20px'
  }};
`
export default RequestResultStyles
