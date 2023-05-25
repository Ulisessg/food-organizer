import React, { type FC } from 'react'
import NavigationNative from 'components/native/Navigation'
import { Provider as ReduxProvider } from 'react-redux'
import { Stack } from 'expo-router'
import { store } from '../src/redux/store'

const HomeLayout: FC = () => (<ReduxProvider store={store}>
    <Stack />
    <NavigationNative />
  </ReduxProvider>
)

export default HomeLayout
