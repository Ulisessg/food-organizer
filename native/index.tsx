import { type AppDispatch, type RootState } from 'redux/store'
import React, { type FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { getDbThunk } from '../src/redux/slices/dbSlice/thunks'
import pageStyles from 'styles/pages/pageStyles'

const Index: FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const dbState = useSelector((state: RootState) => state.db)
  console.log(dbState)

  useEffect(
    () => {
      dispatch(getDbThunk)
    },
    []
  )
  return (
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
}

export default Index
