import styled from 'styled-components'

export const Container = styled.header`
  display: grid;
  width: 100vw;
  height: 100px;
  font-size: 22px;
  align-items: center;
  align-content: center;
  background-color: ${({ theme }) => theme.colors.light3};
  box-shadow: 0px 3px 6px 3px ${({ theme }) => theme.colors.shadow};
  & > a {
    margin-left: 30px;
    color: ${({ theme }) => theme.colors.dark1};
  }
`
