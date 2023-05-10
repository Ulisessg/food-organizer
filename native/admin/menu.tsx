import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'

const Menu: FC = () => (
<>
  <Stack.Screen options={{
    headerTitle: 'Administrar menús'
  }} />
  <View>
    <Text>Menu</Text>
  </View>
</>
)

export default Menu
