import styled from 'styled-components'

const TableContainer = styled.div`
width: 100%;
overflow-x: scroll;
text-align: left;
box-shadow: 2px 2px 6px 2px ${({ theme }) => theme.colors.shadow};
margin: 50px 0;
border: 2px solid ${({ theme }) => theme.colors.shadow};
border-radius: 20px;
text-transform: capitalize;
`

export default TableContainer
