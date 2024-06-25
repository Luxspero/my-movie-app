import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favorite from '../screens/Favorite'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()
const FavoriteStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="FavoriteStack"
        component={Favorite}
        options={{ title: 'Favorite', headerShown: true }}
      />
      <Stack.Screen
        name="MovieDetailFav"
        component={MovieDetail}
        options={{ title: 'Movie Detail', headerShown: true }}
      />
    </Stack.Navigator>
  )
}

export default FavoriteStackNavigation
