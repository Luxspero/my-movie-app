import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './src/navigations/BottomTabNavigation'
import HomeStackNavigation from './src/navigations/HomeStackNavigation'

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  )
}
