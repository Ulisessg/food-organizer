import React, { type FC } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import pageStyles from 'styles/pages/pageStyles'

const Index: FC = () => (
    <SafeAreaView style={pageStyles.container}>

      <Link href="/config">Ir a configuración</Link>
      <StatusBar style="auto" />
    </SafeAreaView>
)

export default Index
