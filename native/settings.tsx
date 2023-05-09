import React, { type FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import pageStyles from 'styles/pages/pageStyles'

const Config: FC = () => (
    <SafeAreaView style={pageStyles.container}>
      <Text>Configruración</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
)

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
export default Config
