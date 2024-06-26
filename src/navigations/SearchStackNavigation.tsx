import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import Search from '../screens/Search'

const Stack = createNativeStackNavigator()
const SearchStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SearchStack"
        component={Search}
        options={{ title: 'Search', headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetailSearch"
        component={MovieDetail}
        options={{ title: 'Movie Detail', headerShown: true }}
      />
    </Stack.Navigator>
  )
}

export default SearchStackNavigation
