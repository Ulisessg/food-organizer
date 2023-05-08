import React, { type FC } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

const Index: FC = () => (
    <SafeAreaView style={styles.container}>

      <Link href="/config">Ir a configuración</Link>
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

export default Index
