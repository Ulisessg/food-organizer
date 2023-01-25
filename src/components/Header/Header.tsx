import React, { type FC } from 'react'
import { Container } from './Header.styles'
import { Link } from 'd-system'

const Header: FC = () => (
    <Container>
      <Link href="/" text="Inicio" />
    </Container>
)

export default Header
