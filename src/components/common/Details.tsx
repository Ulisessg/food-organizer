import styled from 'styled-components'

const Details = styled.details`
  border-radius: 8px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.dark1};
  margin: 20px 0px;
  width: 90%;
  form {
    width: auto;
    padding: 20px 10px;
    margin: 20px 0px;
    justify-content: center;
    & > p {
      text-align: center;
    }
    /* Form content */
    & > div {
      align-content: space-between;
      justify-items: center;
      justify-content: center;
      width: 100%;
      height: 80%;
      padding: 20px 0;
    }
    & > label {
      margin: 10px 0px;
    }
    & button {
      margin-top: 30px;
    }
  }
`
export default Details
