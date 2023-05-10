import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import { Stack } from 'expo-router'

const Unidades: FC = () => (
<>
  <Stack.Screen options={{
    headerTitle: 'Administrar unidades de medida'
  }} />
  <View>
    <Text>Unidades</Text>
  </View>
</>
)

export default Unidades
