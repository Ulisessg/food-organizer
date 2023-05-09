import React, { type FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import pageStyles from 'styles/pages/pageStyles'

const Index: FC = () => (
  <>
    <Stack.Screen options={{
      header: () => null
    }} />
    <SafeAreaView style={pageStyles.container}>
      <Text>Home</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  </>
)

export default Index
