import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'

const Ingredientes: FC = () => (
  <>
    <Stack.Screen options={{
      headerTitle: 'Administrar ingredientes'
    }} />
    <View>
      <Text>Ingredientes</Text>
    </View>
  </>
)

export default Ingredientes
