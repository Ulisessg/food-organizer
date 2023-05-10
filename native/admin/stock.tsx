import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'

const Stock: FC = () => (
  <>
    <Stack.Screen options={{
      headerTitle: 'Administrar ingredientes disponibles'
    }} />
    <View>
      <Text>Stock</Text>
    </View>
  </>
)

export default Stock
