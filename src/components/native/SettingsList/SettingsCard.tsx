import React, { type FC, type ReactNode } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'
import styled from 'styled-components/native'
import { theme } from 'd-system/dist/native'

const SettingsCard: FC<SettingsCardProps> = ({ children, title, href }) => <Link
  href={href}
  asChild
>
  <TouchableOpacity>
    <SettingsCardContainer>
      <CardContent>
        <IconContainer>
          {children}
        </IconContainer>
        <CardTitle>
          {title}
        </CardTitle>
      </CardContent>
      <View style={{ flex: 1 }}></View>
    </SettingsCardContainer>
  </TouchableOpacity>
</Link>

const SettingsCardContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${theme.spacing * 3}px;
  border-bottom-width: 1px;
  border-color: black;
`
const CardContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const IconContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 500px;
  padding: ${theme.spacing * 3}px;
  margin-right: 40px;
  background-color: ${theme.colors.dark2};
  padding: 25px;
`

const CardTitle = styled.Text`
  font-size: 20px;
`

interface SettingsCardProps {
  children: ReactNode
  title: string
  href: string
}

export default SettingsCard
