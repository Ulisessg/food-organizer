import React, { type FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const Config: FC = () => (
    <SafeAreaView style={styles.container}>
      <Text>Configruración</Text>

      <Link href="/">Ir a inicio</Link>
      <StatusBar style="auto" />
    </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
})

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
export default Config
