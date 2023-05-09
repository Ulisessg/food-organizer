import React, { type FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import pageStyles from 'styles/pages/pageStyles'

const Index: FC = () => (
    <SafeAreaView style={pageStyles.container}>
      <Text>Home</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
)

export default Index
