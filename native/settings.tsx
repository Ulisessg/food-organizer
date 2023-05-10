import React, { type FC } from 'react'
import {
  SafeAreaView,
  ScrollView
} from 'react-native'
import SettingsList from 'components/native/SettingsList'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
const Config: FC = () => (
  <>
    <Stack.Screen options={{
      headerTitle: 'Configuración'
    }} />
    <SafeAreaView>
      <ScrollView>
        <SettingsList />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  </>
)

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
export default Config
