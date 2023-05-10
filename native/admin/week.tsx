import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'

const Week: FC = () => (
<>
  <Stack.Screen options={{
    headerTitle: 'Administrar menus semanales'
  }} />
  <View>
    <Text>Week</Text>
  </View>
</>
)

export default Week
