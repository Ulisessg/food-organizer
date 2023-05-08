/** Router */
import 'expo-router/entry'
import { ExpoRoot } from 'expo-router'
import React from 'react'
import { registerRootComponent } from 'expo'

// Must be exported or Fast Refresh won't update the context
export const App = () => {
  const ctx = require.context('./app')
  // eslint-disable-next-line react/jsx-filename-extension
  return <ExpoRoot context={ctx} />
}

registerRootComponent(App)
