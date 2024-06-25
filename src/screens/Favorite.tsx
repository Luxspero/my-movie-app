import { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieItem from '../components/MovieItem'

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

  useEffect(() => {
    getFavoriteMovies()
  }, [favoriteMovies])

  const getFavoriteMovies = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteMovies')
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites)
        setFavoriteMovies(parsedFavorites)
      }
    } catch (error) {
      console.error('Error retrieving favorite movies:', error)
    }
  }
  return (
    <View>
      <FlatList
        style={{
          marginTop: 20,
          paddingLeft: 10,
        }}
        columnWrapperStyle={{ justifyContent: 'space-evenly', padding: 10 }}
        numColumns={2}
        data={favoriteMovies}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            coverType={'poster'}
            size={{ width: 100, height: 160 }}
            target={'MovieDetailFav'}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Favorite
