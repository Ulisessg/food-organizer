/** Navigation menu for react native */
import React, { type FC } from 'react'
import CreateIcon from './icons/CreateIcon'
import HomeIcon from './icons/HomeIcon'
import { ModalContextProvider } from 'context/ModalContext'
import SettingsIcon from './icons/SettingsIcon'
import styled from 'styled-components/native'
import { theme } from 'd-system/dist/native'

const NavigationNative: FC = () => <NavigationStyles style={{
  borderTopColor: 'rgba(92, 92, 92, 0.68)',
  borderTopWidth: 1,
  position: 'absolute'
}}>
  <HomeIcon />
  <ModalContextProvider>
    <CreateIcon />
  </ModalContextProvider>
  <SettingsIcon />
</NavigationStyles>

const NavigationStyles = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  left: 0; 
  right: 0; 
  bottom: 0;
  padding: 3px;
  border-top: 1px;
  border-color: ${theme.colors.dark1};
`

export default NavigationNative
