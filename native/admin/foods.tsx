import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'

const Foods: FC = () => (
  <>
    <Stack.Screen options={{
      headerTitle: 'Administrar comidas'
    }} />
    <View>
      <Text>Foods</Text>
    </View>
  </>
)

export default Foods
