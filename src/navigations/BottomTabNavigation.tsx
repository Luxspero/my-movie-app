import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import { Ionicons } from '@expo/vector-icons'
import Favorite from '../screens/Favorite'
import Search from '../screens/Search'

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation
