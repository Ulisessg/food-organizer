/* eslint-disable max-len */
import React, { FC } from 'react'
import styled from 'styled-components'

const ErrorMessage: FC<Props> =
({ message, action }: Props) => <>
<ErrorMessageStyles>

<p>{message},&nbsp;<span className="error_action">{action}</span></p>

</ErrorMessageStyles>

</>

const ErrorMessageStyles = styled.div`
  display: flex;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.error};
  text-transform: uppercase;
  text-align: left;
  justify-items: center;
  .error_action {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.light2};
  }
`
export default ErrorMessage

interface Props {
  message: string
  action: string
}
