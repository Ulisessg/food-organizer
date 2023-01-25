/* eslint-disable func-style */
import React, { type FC } from 'react'
import CardStyles from './Card.styles'

const Card: FC<Props> = ({ children }) => <CardStyles>
  {children}
</CardStyles>

interface Props {
  children?: React.ReactNode
}

export default Card
