import React, { type FC } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import pageStyles from 'native/pageStyles'

const Config: FC = () => (
    <SafeAreaView style={pageStyles.container}>
      <Text>Configruración</Text>

      <Link href="/">Ir a inicio</Link>
      <StatusBar style="auto" />
    </SafeAreaView>
)

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
export default Config
